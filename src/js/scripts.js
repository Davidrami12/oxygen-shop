// El menú de la vista mobile que aparece solo cuando haces clic en el botón hamburguesa
 



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
const returnToTop = () => {
    if (window.scrollY > 0) {
        window.scrollTo({ 
            top: 0 
        });
    }
};

const showTopButton = () => {
    const returnToTopButton = document.querySelector('.returnToTop')
    const scrolledPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

    if (scrolledPercentage > 20) {
        returnToTopButton.style.opacity = '1';
        returnToTopButton.style.visibility = 'visible';
    } else {
        returnToTopButton.style.opacity = '0';
        returnToTopButton.style.visibility = 'hidden';
    }

    returnToTopButton.addEventListener('click', () => {
        setTimeout(returnToTop, 200);
    });
};

document.addEventListener('scroll', showTopButton);





/* Implementar validación en el formulario. El nombre tiene que tener entre 2 y 100 letras, 
la dirección de correo electrónico tiene que ser válida (https://www.emailregex.com/) y 
tienen que hacer el checkbox. Si un campo no es válido, cambiar el color de su border a rojo */
const formValidation = (e) => {
    e.preventDefault();

    let nameRegex = /^[A-Za-z]{2,100}$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    let nameValue = document.querySelector('.name').value
    let emailValue = document.querySelector('.email').value
    let nameTextError = document.querySelector('.name-validation')
    let emailTextError = document.querySelector('.email-validation')
    let checkboxTextError = document.querySelector('.checkbox-validation')
    let name = document.querySelector('.name')
    let email = document.querySelector('.email')
    let checkbox = document.querySelector('.form-checkbox')
    
    // Name validation
    if(!nameRegex.test(nameValue)){
        nameTextError.style.visibility = "visible"
        name.style.borderBottom = "1px solid red"
    }else{
        nameTextError.style.visibility = "hidden"
        name.style.borderBottom = "1px solid #08A6E4"
    }

    // Email validation
    if(!emailRegex.test(emailValue)){
        emailTextError.style.visibility = "visible"
        email.style.borderBottom = "1px solid red"
    }else{
        emailTextError.style.visibility = "hidden"
        email.style.borderBottom = "1px solid #08A6E4"
    }

    // Checkbox validation
    if(!checkbox.checked){
        checkboxTextError.style.visibility = "visible"
    }else{
        checkboxTextError.style.visibility = "hidden"
    }
}

document.querySelector('.contact-form').addEventListener('submit', formValidation)









/* Recoger los datos del formulario y mandarselos a un servidor JSON de testing 
como este https://jsonplaceholder.typicode.com/guide/ con fetch() */






/* Crear un popup (/modal) de ‘Subscribe to our newsletter’ que aparece 
después de 5 segundos, o cuando el usuario baja 25% de la página */





/* Añadir un selector de moneda (EUR, USD, GBP), obtener los tipos de 
cambio de esta API https://github.com/fawazahmed0/currency-api#readme 
(https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json) */