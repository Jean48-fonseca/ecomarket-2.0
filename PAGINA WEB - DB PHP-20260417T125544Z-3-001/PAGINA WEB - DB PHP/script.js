// ==========================================================
// 1. VARIABLES GLOBALES Y BASE DE DATOS
// ==========================================================
let PRODUCTOS = []; // Aquí guardaremos los productos
let SEDES = [];

// El carrito ahora se carga con localStorage
let carrito = JSON.parse(localStorage.getItem('carritoEcoMarket')) || [];

const COSTO_ENVIO_DOMICILIO = 7.00; 

// ==========================================================
// 2. FUNCIONES DE UTILIDAD (Carrito y LocalStorage)
// ==========================================================

const guardarCarrito = () => {
    localStorage.setItem('carritoEcoMarket', JSON.stringify(carrito));
    actualizarContadorCarrito();
};

const actualizarContadorCarrito = () => {
    const contador = document.getElementById('contador-carrito');
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    if (contador) {
        contador.textContent = totalItems;
    }
    if (document.getElementById('contenedor-carrito-articulos')) {
        const btnCheckout = document.getElementById('btn-ir-checkout');
        if (btnCheckout) {
            btnCheckout.disabled = carrito.length === 0;
        }
    }
};

const obtenerProductoPorId = (id) => {
    // Convertimos el ID que llega (que siempre es string desde el HTML) a un número entero
    // para que la comparación estricta (===) funcione correctamente.
    return PRODUCTOS.find(p => p.id === parseInt(id));
};
// ==========================================================
// 3. LÓGICA DE PRODUCTOS (Filtros y Renderizado)
// ==========================================================

const aplicarFiltrosYOrdenar = () => {
    let productosFiltrados = [...PRODUCTOS]; 
    const busquedaTexto = document.getElementById('busqueda-general')?.value.toLowerCase() || '';

    if (busquedaTexto) {
        productosFiltrados = productosFiltrados.filter(producto =>
            producto.nombre.toLowerCase().includes(busquedaTexto) ||
            producto.descripcion.toLowerCase().includes(busquedaTexto) ||
            producto.categoria.toLowerCase().includes(busquedaTexto)
        );
    }

    const categoriasSeleccionadas = Array.from(document.querySelectorAll('.filtro-categoria:checked')).map(cb => cb.value);

    if (categoriasSeleccionadas.length > 0) {
        productosFiltrados = productosFiltrados.filter(producto => {
            return categoriasSeleccionadas.includes(producto.categoria);
        });
    }

    renderizarProductos(productosFiltrados);
    const conteoProductos = document.getElementById('conteo-productos');
    if (conteoProductos) {
        conteoProductos.textContent = `Mostrando ${productosFiltrados.length} productos.`;
    }

    const noResultados = document.getElementById('no-resultados');
    if (noResultados) {
        if (productosFiltrados.length === 0) {
            noResultados.classList.remove('d-none');
        } else {
            noResultados.classList.add('d-none');
        }
    }
};


const renderizarProductos = (productos) => {
    const contenedor = document.getElementById('productos-container');
    if (!contenedor) return;

    contenedor.innerHTML = ''; 
    
    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'col';
        tarjeta.innerHTML = `
            <div class="card card-custom h-100 shadow-sm">
                <a href="detalle_producto.html?id=${producto.id}">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                </a>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold text-success">${producto.nombre}</h5>
                    <p class="card-text text-muted small">${producto.categoria}</p>
                    <p class="fs-4 fw-bold text-dark mt-auto">S/${producto.precio.toFixed(2)}</p>
                    <button class="btn btn-success btn-sm btn-anadir-carrito" data-id="${producto.id}">
                        🛒 Añadir al Carrito
                    </button>
                </div>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });

    document.querySelectorAll('.btn-anadir-carrito').forEach(button => {
        button.addEventListener('click', (event) => {
            const idProducto = event.target.dataset.id;
            anadirAlCarrito(idProducto, 1);
        });
    });
};

// ==========================================================
// 4. LÓGICA DE CARRITO (Añadir, Eliminar, Renderizar)
// ==========================================================

const anadirAlCarrito = (idProducto, cantidad) => {
    const productoExistente = carrito.find(item => item.id === idProducto);
    const productoOriginal = obtenerProductoPorId(idProducto);

    if (!productoOriginal) {
        console.error('Error: Producto no encontrado');
        return;
    }

    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({ id: idProducto, cantidad: cantidad });
    }

    guardarCarrito();
    if (document.getElementById('contenedor-carrito-articulos')) {
        renderizarCarrito();
    }
};

const eliminarDelCarrito = (idProducto) => {
    carrito = carrito.filter(item => item.id !== idProducto);
    guardarCarrito();
    renderizarCarrito();
};

const cambiarCantidad = (idProducto, nuevaCantidad) => {
    const item = carrito.find(item => item.id === idProducto);
    const productoOriginal = obtenerProductoPorId(idProducto);

    if (item && productoOriginal) {
        if (nuevaCantidad <= 0) {
            eliminarDelCarrito(idProducto);
            return;
        } else {
            item.cantidad = nuevaCantidad;
        }
        guardarCarrito();
        renderizarCarrito();
    }
};

const calcularTotalCarrito = () => {
    let subtotal = 0;
    carrito.forEach(item => {
        const producto = obtenerProductoPorId(item.id);
        if (producto) {
            subtotal += producto.precio * item.cantidad;
        }
    });
    return subtotal;
};

const renderizarCarrito = () => {
    const contenedor = document.getElementById('contenedor-carrito-articulos');
    const subtotalElement = document.getElementById('carrito-subtotal');
    const totalElement = document.getElementById('carrito-total-final');
    
    if (!contenedor) return;

    contenedor.innerHTML = '';
    
    const subtotal = calcularTotalCarrito();

    if (carrito.length === 0) {
        contenedor.innerHTML = '<div class="alert alert-info text-center">Tu carrito está vacío. ¡Añade algunos productos!</div>';
        document.getElementById('btn-ir-checkout').classList.add('disabled');
    } else {
        carrito.forEach(item => {
            const producto = obtenerProductoPorId(item.id);
            if (!producto) return;

            const elemento = document.createElement('div');
            elemento.className = 'd-flex align-items-center border-bottom py-3';
            elemento.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 0.5rem;" class="me-3">
                <div class="flex-grow-1">
                    <h6 class="mb-0 fw-bold">${producto.nombre}</h6>
                    <p class="mb-0 text-muted small">S/${producto.precio.toFixed(2)} / unidad</p>
                </div>
                <div class="d-flex align-items-center">
                    <input type="number" class="form-control form-control-sm text-center cantidad-input me-3" 
                           value="${item.cantidad}" min="1" style="width: 70px;" 
                           data-id="${item.id}">
                    <span class="fw-bold me-3 total-item">S/${(producto.precio * item.cantidad).toFixed(2)}</span>
                    <button class="btn btn-outline-danger btn-sm btn-eliminar-carrito" data-id="${item.id}">
                        &times;
                    </button>
                </div>
            `;
            contenedor.appendChild(elemento);
        });

        document.querySelectorAll('.cantidad-input').forEach(input => {
            input.addEventListener('change', (event) => {
                const idProducto = event.target.dataset.id;
                const nuevaCantidad = parseInt(event.target.value);
                cambiarCantidad(idProducto, nuevaCantidad);
            });
        });

        document.querySelectorAll('.btn-eliminar-carrito').forEach(button => {
            button.addEventListener('click', (event) => {
                const idProducto = event.target.dataset.id;
                eliminarDelCarrito(idProducto);
            });
        });

        document.getElementById('btn-ir-checkout').classList.remove('disabled');
    }
    
    if (subtotalElement) {
        subtotalElement.textContent = `S/${subtotal.toFixed(2)}`;
    }
    if (totalElement) {
        totalElement.textContent = `S/${subtotal.toFixed(2)}`;
    }
};

// ==========================================================
// 5. LÓGICA DE DETALLE DE PRODUCTO (detalle_producto.html)
// ==========================================================

const cargarDetalleProducto = () => {
    const params = new URLSearchParams(window.location.search);
    const idProducto = params.get('id');
    const producto = obtenerProductoPorId(idProducto);

    if (!producto) {
        document.querySelector('main.container').innerHTML = '<div class="alert alert-danger text-center mt-5">Producto no encontrado.</div>';
        return;
    }

    document.title = `${producto.nombre} | EcoMarket`;
    document.getElementById('detalle-imagen').src = producto.imagen;
    document.getElementById('detalle-imagen').alt = producto.nombre;
    document.getElementById('detalle-nombre').textContent = producto.nombre;
    document.getElementById('detalle-categoria').textContent = producto.categoria;
    document.getElementById('detalle-descripcion').textContent = producto.descripcion;
    document.getElementById('detalle-precio').textContent = `S/${producto.precio.toFixed(2)}`;
    
    const cantidadInput = document.getElementById('cantidad-input');
    const btnAnadir = document.getElementById('btn-anadir-detalle');
    
    if (btnAnadir) {
        btnAnadir.addEventListener('click', () => {
            const cantidad = parseInt(cantidadInput.value);
            if (cantidad > 0) {
                 anadirAlCarrito(idProducto, cantidad);
                const mensajeExito = document.getElementById('mensaje-carrito-agregado');
                if (mensajeExito) {
                    mensajeExito.classList.remove('d-none');
                    setTimeout(() => {
                        mensajeExito.classList.add('d-none');
                    }, 3000);
                }
            }
        });
    }
};


// ==========================================================
// 6. LÓGICA DE CHECKOUT (checkout.html) - VERSIÓN MEJORADA
// ==========================================================

const inicializarCheckout = () => { 
    let costoEnvio = 0;
    let datosEntregaConfirmados = false;
    let datosPagoConfirmados = false;

    const form = document.getElementById('form-checkout');
    if (!form) return;

    // Stepper
    const stepperItems = document.querySelectorAll('.step-item');
    const pasoInformacion = document.getElementById('paso-informacion');
    const pasoEntrega = document.getElementById('paso-entrega');
    const pasoPago = document.getElementById('paso-pago');
    
    // Botones de continuación
    const btnContinuarEntrega = document.getElementById('btn-continuar-entrega');
    const btnContinuarPago = document.getElementById('btn-continuar-pago');

    // Campos de Información
    const inputNombre = document.getElementById('nombre');
    const inputApellido = document.getElementById('apellido');
    const inputEmail = document.getElementById('email'); // CORRECCIÓN: Faltaba esta línea
    const inputTelefono = document.getElementById('telefono');

    // Opciones de Entrega
    const radioDomicilio = document.getElementById('entrega-domicilio');
    const radioSede = document.getElementById('entrega-sede');
    const contDireccion = document.getElementById('contenedor-direccion');
    const contSede = document.getElementById('contenedor-sede');
    const btnConfirmarDir = document.getElementById('btn-confirmar-direccion');
    const selectSede = document.getElementById('select-sede');
    const infoDomicilio = document.getElementById('info-domicilio-confirmada');
    const infoSede = document.getElementById('info-sede-confirmada');

    // Opciones de Pago
    const radioTarjeta = document.getElementById('pago-tarjeta');
    const radioEfectivo = document.getElementById('pago-efectivo');
    const contPagoTarjeta = document.getElementById('contenedor-pago-tarjeta');
    const infoTarjeta = document.getElementById('info-tarjeta-confirmada');

    // Modal de Tarjeta
    const modalTarjeta = new bootstrap.Modal(document.getElementById('modal-tarjeta'));
    const formTarjeta = document.getElementById('form-tarjeta');
    const inputNumTarjeta = document.getElementById('numero-tarjeta');
    const inputNomTarjeta = document.getElementById('nombre-tarjeta');
    const inputExpTarjeta = document.getElementById('expiracion-tarjeta');
    const inputCvvTarjeta = document.getElementById('cvv-tarjeta');

    // Resumen de Orden
    const resumenSubtotal = document.getElementById('resumen-subtotal');
    const resumenEnvio = document.getElementById('resumen-envio');
    const resumenTotal = document.getElementById('resumen-total');
    const resumenProductos = document.getElementById('contenedor-resumen-productos');
    const resumenTotalItems = document.getElementById('checkout-total-items');

    
    const actualizarResumen = () => {
        const subtotal = calcularTotalCarrito();
        const total = subtotal + costoEnvio;
        resumenSubtotal.textContent = `S/${subtotal.toFixed(2)}`;
        resumenEnvio.textContent = `S/${costoEnvio.toFixed(2)}`;
        resumenTotal.textContent = `S/${total.toFixed(2)}`;
        resumenTotalItems.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        resumenProductos.innerHTML = '';
        if (carrito.length === 0) {
            resumenProductos.innerHTML = `<li class="list-group-item text-danger">Tu carrito está vacío.</li>`;
            setTimeout(() => window.location.href = 'productos.html', 2000);
            return;
        }
        carrito.forEach(item => {
            const producto = obtenerProductoPorId(item.id);
            if (producto) {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between lh-sm';
                li.innerHTML = `<div><h6 class="my-0">${producto.nombre}</h6><small class="text-muted">Cantidad: ${item.cantidad}</small></div><span class="text-muted">S/${(producto.precio * item.cantidad).toFixed(2)}</span>`;
                resumenProductos.appendChild(li);
            }
        });
    };

    // ---- LÓGICA DE VALIDACIÓN Y FORMATEO EN TIEMPO REAL ----
    const soloLetras = (e) => e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
    const soloNumeros = (e) => e.target.value = e.target.value.replace(/\D/g, '');

    inputNombre.addEventListener('input', soloLetras);
    inputApellido.addEventListener('input', soloLetras);
    inputNomTarjeta.addEventListener('input', soloLetras);
    inputCvvTarjeta.addEventListener('input', (e) => {
        soloNumeros(e);
        if (e.target.value.length > 4) e.target.value = e.target.value.slice(0, 4);
    });

    inputTelefono.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, '').substring(0, 9);
        e.target.value = valor;
    });

    inputNumTarjeta.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, '').substring(0, 16);
        let formateado = valor.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = formateado;
    });

    inputExpTarjeta.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (valor.length > 2) {
            valor = valor.slice(0, 2) + '/' + valor.slice(2);
        }
        e.target.value = valor;
    });

    // --- LÓGICA DEL STEPPER ---
    const actualizarStepper = (pasoActual) => {
        stepperItems.forEach((item, index) => {
            const pasoItem = index + 1;
            item.classList.remove('active', 'completed');
            if (pasoItem < pasoActual) {
                item.classList.add('completed');
            } else if (pasoItem === pasoActual) {
                item.classList.add('active');
            }
        });
    };

    btnContinuarEntrega.addEventListener('click', () => {
        if (inputNombre.value && inputApellido.value && inputEmail.checkValidity() && inputTelefono.value.replace(/\D/g, '').length === 9) {
            pasoInformacion.classList.add('d-none');
            pasoEntrega.classList.remove('disabled');
            actualizarStepper(2);
        } else {
            Swal.fire('Falta Información', 'Por favor, completa tus datos personales correctamente.', 'warning');
        }
    });

    btnContinuarPago.addEventListener('click', () => {
        if (datosEntregaConfirmados) {
            pasoEntrega.classList.add('d-none');
            pasoPago.classList.remove('disabled');
            actualizarStepper(3);
        } else {
            Swal.fire('Falta Confirmación', 'Por favor, selecciona y confirma tu método de entrega.', 'warning');
        }
    });

    // ---- LÓGICA DE ENTREGA ----
    const manejarSeleccionEntrega = (e) => {
        const tipo = e.target.value;
        datosEntregaConfirmados = false;
        
        contDireccion.classList.add('d-none');
        contSede.classList.add('d-none');
        infoDomicilio.classList.add('d-none');
        infoSede.classList.add('d-none');
        radioEfectivo.disabled = true;

        if (tipo === 'domicilio') {
            contDireccion.classList.remove('d-none');
            costoEnvio = COSTO_ENVIO_DOMICILIO;
            if (radioEfectivo.checked) radioTarjeta.checked = true;
        } else if (tipo === 'recoger-sede') {
            contSede.classList.remove('d-none');
            costoEnvio = 0;
            radioEfectivo.disabled = false;
            if(selectSede.value) {
                infoSede.textContent = `Recogerás tu pedido en: ${selectSede.options[selectSede.selectedIndex].text}`;
                infoSede.classList.remove('d-none');
                datosEntregaConfirmados = true;
            }
        }
        actualizarResumen();
    };

    radioDomicilio.addEventListener('change', manejarSeleccionEntrega);
    radioSede.addEventListener('change', manejarSeleccionEntrega);
    
    btnConfirmarDir.addEventListener('click', () => {
        const direccion = document.getElementById('direccion').value;
        const distrito = document.getElementById('distrito').value;
        if (direccion && distrito) {
            infoDomicilio.textContent = `Se enviará a: ${direccion}, ${distrito}.`;
            infoDomicilio.classList.remove('d-none');
            contDireccion.classList.add('d-none');
            datosEntregaConfirmados = true;
        } else {
            Swal.fire('Error', 'Debes completar la dirección y el distrito.', 'error');
        }
    });

    selectSede.addEventListener('change', () => {
        if (selectSede.value) {
            infoSede.textContent = `Recogerás tu pedido en: ${selectSede.options[selectSede.selectedIndex].text}`;
            infoSede.classList.remove('d-none');
            datosEntregaConfirmados = true;
        }
    });

    // ---- LÓGICA DE PAGO ----
    const manejarSeleccionPago = (e) => {
        const tipo = e.target.value;
        datosPagoConfirmados = false;
        contPagoTarjeta.classList.add('d-none');
        infoTarjeta.classList.add('d-none');
        
        if (tipo === 'tarjeta') {
            contPagoTarjeta.classList.remove('d-none');
        } else if (tipo === 'efectivo') {
            datosPagoConfirmados = true;
        }
    };
    
    radioTarjeta.addEventListener('change', manejarSeleccionPago);
    radioEfectivo.addEventListener('change', manejarSeleccionPago);

    formTarjeta.addEventListener('submit', (e) => {
        e.preventDefault();
        const num = inputNumTarjeta.value;
        const nom = inputNomTarjeta.value;
        if (num && nom && inputExpTarjeta.value && inputCvvTarjeta.value) {
            const ultimosDigitos = num.slice(-5).replace(" ","");
            infoTarjeta.innerHTML = `<i class="bi bi-shield-check-fill"></i> Tarjeta terminada en <strong>${ultimosDigitos}</strong>.`;
            infoTarjeta.classList.remove('d-none');
            datosPagoConfirmados = true;
            modalTarjeta.hide();
            document.querySelector('#contenedor-pago-tarjeta button').textContent = 'Cambiar Tarjeta';
        } else {
            Swal.fire('Error', 'Por favor, completa todos los datos de la tarjeta.', 'error');
        }
    });

    // ---- LÓGICA DE SUBMIT FINAL ----
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!inputNombre.value || !inputApellido.value || !document.getElementById('email').value || inputTelefono.value.replace(/\D/g, '').length !== 9) {
            return Swal.fire('Falta Información', 'Por favor, completa tus datos personales.', 'warning');
        }
        if (!radioDomicilio.checked && !radioSede.checked) {
            return Swal.fire('Falta Información', 'Por favor, selecciona un método de entrega.', 'warning');
        }
        if (!datosEntregaConfirmados) {
            return Swal.fire('Falta Confirmación', 'Por favor, confirma los detalles de tu entrega.', 'warning');
        }
        if (!radioTarjeta.checked && !radioEfectivo.checked) {
            return Swal.fire('Falta Información', 'Por favor, selecciona un método de pago.', 'warning');
        }
        if (!datosPagoConfirmados) {
            return Swal.fire('Falta Confirmación', 'Por favor, confirma los detalles de tu pago.', 'warning');
        }

        Swal.fire({
            title: '¡Orden Confirmada!',
            text: 'Tu pedido ha sido procesado correctamente. Recibirás una confirmación por correo.',
            icon: 'success',
            confirmButtonText: 'Ir a la Página Principal',
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = [];
                guardarCarrito();
                window.location.href = 'index.html';
            }
        });
    });

    // ---- INICIALIZACIÓN ----
    selectSede.innerHTML = '<option value="" disabled selected>Elige una sede...</option>';
    SEDES.forEach(sede => {
        const option = document.createElement('option');
        option.value = sede.id;
        option.textContent = sede.nombre;
        selectSede.appendChild(option);
    });
    actualizarResumen();
    actualizarStepper(1);
};

// ==========================================================
// 7. LÓGICA DE CONTACTO (contacto.html)
// ==========================================================
const inicializarFormularioContacto = () => {
    const form = document.getElementById('form-contacto');
    if (!form) return;

    const mensajeExito = document.getElementById('mensaje-exito');
    const inputNombre = document.getElementById('input-nombre');
    const inputEmail = document.getElementById('input-email');
    const inputTelefono = document.getElementById('input-telefono');
    const inputAsunto = document.getElementById('input-asunto');
    const inputMensaje = document.getElementById('input-mensaje');

    const validarCampo = (campo, condicion, mensajeError) => {
        const feedback = campo.nextElementSibling;
        if (condicion) {
            campo.classList.remove('is-invalid');
            campo.classList.add('is-valid');
            return true;
        } else {
            campo.classList.remove('is-valid');
            campo.classList.add('is-invalid');
            if (feedback) feedback.textContent = mensajeError;
            return false;
        }
    };

    inputTelefono.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, '').substring(0, 9);
        let formateado = valor.replace(/(\d{3})(?=\d)/g, '$1 ').trim();
        e.target.value = formateado;
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        mensajeExito.classList.add('d-none');
        
        const nombreValido = validarCampo(inputNombre, /^[a-zA-ZÀ-ÿ\s]{3,}$/.test(inputNombre.value), 'Solo se permiten letras y debe tener al menos 3 caracteres.');
        const emailValido = validarCampo(inputEmail, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail.value), 'Ingrese un correo electrónico válido (debe contener "@").');
        const telefonoValido = validarCampo(inputTelefono, inputTelefono.value.replace(/\s/g, '').length === 9, 'Ingrese 9 dígitos. Formato: XXX XXX XXX.');
        const asuntoValido = validarCampo(inputAsunto, inputAsunto.value.trim() !== '', 'Este campo es obligatorio.');
        const mensajeValido = validarCampo(inputMensaje, inputMensaje.value.trim().length >= 10, 'El mensaje debe tener al menos 10 caracteres.');

        if (nombreValido && emailValido && telefonoValido && asuntoValido && mensajeValido) {
            mensajeExito.classList.remove('d-none');
            form.reset();
            form.querySelectorAll('.is-valid, .is-invalid').forEach(el => el.classList.remove('is-valid', 'is-invalid'));
            form.scrollIntoView({ behavior: 'smooth' });
        }
    });
};

// ==========================================================
// 8. INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================================

// ESTA SERÁ LA FUNCIÓN QUE CONFIGURA LOS EVENTOS UNA VEZ QUE LOS DATOS ESTÁN LISTOS
function configurarPagina() {
    console.log('EcoMarket - Configurando página con datos listos.');
    
    actualizarContadorCarrito();

    // PÁGINA DE PRODUCTOS (CATÁLOGO)
    if (document.getElementById('productos-container')) {
        aplicarFiltrosYOrdenar(); // ¡Ahora esta función ya tiene los PRODUCTOS!
        
        const filterControls = document.querySelectorAll('.filtro-check');
        filterControls.forEach(control => control.addEventListener('change', aplicarFiltrosYOrdenar));
        document.getElementById('busqueda-general')?.addEventListener('input', aplicarFiltrosYOrdenar);
        
        document.getElementById('btn-limpiar-filtros')?.addEventListener('click', () => {
            document.querySelectorAll('.filtro-check').forEach(c => c.checked = false);
            document.getElementById('busqueda-general').value = '';
            aplicarFiltrosYOrdenar();
        });
    }
    
    // PÁGINA DE DETALLE DE PRODUCTO
    if (document.getElementById('detalle-nombre')) {
        cargarDetalleProducto();
    }
    
    // PÁGINA DE CARRITO
    if (document.getElementById('contenedor-carrito-articulos')) {
        renderizarCarrito();
    }

    // PÁGINA DE CHECKOUT
    if (document.getElementById('form-checkout')) {
        inicializarCheckout();
    }
    
    // LÓGICA DE NAVEGACIÓN (Botón del Carrito en el Header)
    const btnCarrito = document.getElementById('btn-carrito');
    if (btnCarrito) {
        btnCarrito.addEventListener('click', () => {
            window.location.href = 'carrito.html';
        });
    }

    // LÓGICA DE CONTACTO
    if (document.getElementById('form-contacto')) {
        inicializarFormularioContacto(); // ¡Esta línea activa todo!
    }
}


// NUEVA FUNCIÓN ASÍNCRONA PARA CARGAR DATOS ANTES DE TODO
async function inicializarApp() {
    try {
        console.log('Iniciando carga de datos...');
        // Hacemos las dos peticiones al servidor al mismo tiempo para más eficiencia
        const [respuestaProductos, respuestaSedes] = await Promise.all([
            fetch('get_productos.php'),
            fetch('get_sedes.php')
        ]);

        // Verificamos que ambas respuestas sean correctas
        if (!respuestaProductos.ok || !respuestaSedes.ok) {
            throw new Error('Error al obtener los datos del servidor.');
        }

        // Convertimos las respuestas a JSON y las guardamos en nuestras variables globales
        PRODUCTOS = await respuestaProductos.json();
        SEDES = await respuestaSedes.json();
        
        console.log('¡Datos cargados con éxito!', { productos: PRODUCTOS.length, sedes: SEDES.length });

        // AHORA que YA TENEMOS los datos, configuramos el resto de la página
        configurarPagina();

    } catch (error) {
        console.error('Error fatal al inicializar la aplicación:', error);
        // Mostramos un mensaje de error claro en la página de productos
        const contenedor = document.getElementById('productos-container');
        if (contenedor) {
            contenedor.innerHTML = `<div class="col-12"><div class="alert alert-danger"><strong>Error de conexión.</strong> No se pudieron cargar los productos. Por favor, recarga la página.</div></div>`;
        }
    }
}

document.addEventListener('DOMContentLoaded', inicializarApp);