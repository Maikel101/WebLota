
let currentSlide = 0;
const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');

if (!sliderContainer || slides.length === 0) {
    console.error('Slider container or slides not found.');
} else {
    const totalSlides = slides.length;

    //Duplicar el primer y último slide para transición infinita
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    sliderContainer.appendChild(firstClone);
    sliderContainer.insertBefore(lastClone, slides[0]);

    //Ajustar contenedor inicial para mostrar correctamente el primer slide
    sliderContainer.style.transform = `translateX(-100%)`;

    //Mover el slider con animación suave
    function moveSlide(direction) {
        const totalRealSlides = totalSlides;
        currentSlide += direction;

        sliderContainer.style.transition = 'transform 0.5s ease-in-out';
        sliderContainer.style.transform = `translateX(-${(currentSlide + 1) * 100}%)`;

        //Ajustar el índice al llegar a los clones
        setTimeout(() => {
            if (currentSlide === -1) {
                sliderContainer.style.transition = 'none';
                currentSlide = totalRealSlides - 1;
                sliderContainer.style.transform = `translateX(-${(currentSlide + 1) * 100}%)`;
            }
            if (currentSlide === totalRealSlides) {
                sliderContainer.style.transition = 'none';
                currentSlide = 0;
                sliderContainer.style.transform = `translateX(-${(currentSlide + 1) * 100}%)`;
            }
        }, 500);
    }

    //Configurar transición automática cada 5 segundos
    let autoSlideInterval = setInterval(() => {
        moveSlide(1);
    }, 3000);

    //Reiniciar el intervalo automático cuando el usuario interactúa
    document.querySelector('.prev').addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => moveSlide(1), 5000);
    });

    document.querySelector('.next').addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => moveSlide(1), 5000);
    });

    //Inicializar posición
    document.addEventListener('DOMContentLoaded', () => {
        sliderContainer.style.transform = 'translateX(-100%)';
    });
}

function showNotification(message) {
    toastr.options = {
        "closeButton": true,                        //Habilita un botón para cerrar
        "progressBar": true,                        //Muestra una barra de progreso
        "positionClass": "toast-bottom-center",     //Centra el mensaje
        "timeOut": "3000",                          //Duración de 5 segundos
        "extendedTimeOut": "1000"                   //Tiempo extra
    };
    //Mostrar el mensaje con toastr
    toastr.success(message);
}

function actualizarCarrito() {
    //Hacemos una petición al controlador para obtener el número de productos en el carrito
    fetch('/Carrito/Agregar', {
        method: 'POST',
        body: JSON.stringify({ productoId: productoId, cantidad: cantidad }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('carrito-count').innerText = data.carritoCount;
            }
        })
        .catch(error => {
            console.error('Error al actualizar el carrito:', error);
        });
}

// ==========================
// BANNER DE COOKIES
// ==========================
document.addEventListener("DOMContentLoaded", function () {
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptButton = document.getElementById("accept-cookies");

    // Verificar si ya se mostró el banner en esta sesión (si "cookiesAccepted" no está en sessionStorage)
    if (!sessionStorage.getItem("cookiesAccepted")) {
        cookieBanner.style.display = "block"; // Mostrar el banner si no se mostró antes en esta sesión
    }

    // Cuando el usuario hace clic en "Aceptar"
    acceptButton.addEventListener("click", function () {
        cookieBanner.style.display = "none"; // Ocultar el banner
        sessionStorage.setItem("cookiesAccepted", "true"); // Guardar en sessionStorage que el banner fue aceptado
    });
});


// ==========================
// TOOLTIP INDEX
// ==========================

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));
document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar todos los elementos con el tooltip
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');

    tooltips.forEach(function (tooltip) {
        // Elegir una posición aleatoria de un array
        const positions = ['top', 'bottom', 'left', 'right'];
        const randomPosition = positions[Math.floor(Math.random() * positions.length)];

        // Establecer la posición aleatoria en el tooltip
        tooltip.setAttribute('data-bs-placement', randomPosition);

        // Inicializar el tooltip
        new bootstrap.Tooltip(tooltip);
    });
});

















