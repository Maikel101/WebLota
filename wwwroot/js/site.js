
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

//function actualizarCarrito() {
//    fetch('/Carrito/GetCarritoCount')
//        .then(response => response.text())
//            .then(data => {
//                document.getElementById('carrito-count').innerText = data;
//            });
//}
//actualizarCarrito();

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

        // Script para gestionar las cookies
        //function aceptarCookies() {
        //    document.getElementById("cookie-banner").style.display = "none";
        //localStorage.setItem("cookies_aceptadas", "true");
        //}

        //// Ocultar si ya fueron aceptadas antes
        //window.onload = function() {
        //    if (localStorage.getItem("cookies_aceptadas")) {
        //    document.getElementById("cookie-banner").style.display = "none";
        //    }
//};

window.onload = function () {
    // Mostrar el banner de cookies siempre
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptButton = document.getElementById("accept-cookies");

    // Cuando el usuario acepta las cookies
    acceptButton.addEventListener("click", function () {
        cookieBanner.style.display = "none";
    });

    // Asegurarse de que se muestre cada vez que se recarga la página
    cookieBanner.style.display = "block";  // siempre mostrarlo al cargar la página
};
   
