


// Un elemento ‘percentage scroller’
const percentageScroller = () => {
    const bar = document.querySelector('#progress-bar');
    const bodyHeight = document.body.scrollHeight - window.innerHeight;

    window.addEventListener('scroll', () => {
        const scrolledPercentage = (window.scrollY / bodyHeight) * 100;
        bar.style.width = scrolledPercentage + '%';
    });
};

document.addEventListener('scroll', percentageScroller);





/* Crear un botón ‘Return to the top’ al fondo que espera 200 milisegundos y 
vuelve al principio de la página con una animación suave */
const returnToTopButton = document.querySelector('.returnToTop')

const returnToTop = () => {
    if (window.scrollY > 0) {
        window.scrollTo({ 
            top: 0 
        });
    }
};

const showTopButton = () => {
    const scrolledPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

    if (scrolledPercentage > 20) {
        returnToTopButton.style.opacity = '1';
        returnToTopButton.style.visibility = 'visible';
    } else {
        returnToTopButton.style.opacity = '0';
        returnToTopButton.style.visibility = 'hidden';
    }

    returnToTopButton.addEventListener('click', () => {
        returnToTopButton.style.opacity = '0';
        setTimeout(returnToTop, 200);
    });
};

window.addEventListener('scroll', showTopButton);





/* Implementar validación en el formulario. El nombre tiene que tener entre 2 y 100 letras, 
la dirección de correo electrónico tiene que ser válida (https://www.emailregex.com/) y 
tienen que hacer el checkbox. Si un campo no es válido, cambiar el color de su border a rojo */






/* Recoger los datos del formulario y mandarselos a un servidor JSON de testing 
como este https://jsonplaceholder.typicode.com/guide/ con fetch() */






/* Crear un popup (/modal) de ‘Subscribe to our newsletter’ que aparece 
después de 5 segundos, o cuando el usuario baja 25% de la página */





/* Añadir un selector de moneda (EUR, USD, GBP), obtener los tipos de 
cambio de esta API https://github.com/fawazahmed0/currency-api#readme 
(https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json) */