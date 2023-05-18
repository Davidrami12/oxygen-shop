// El menú de la vista mobile que aparece solo cuando haces clic en el botón hamburguesa
 



// Elemento ‘percentage scroller’
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
la dirección de correo electrónico tiene que ser válida y tienen que hacer el checkbox. 
Si un campo no es válido, cambiar el color de su border a rojo */

let name = document.querySelector('.name')
let email = document.querySelector('.email')
let checkbox = document.querySelector('.form-checkbox')

const formValidation = (e) => {
    e.preventDefault();

    let flag = true;

    const nameRegex = /^[A-Za-z]{2,100}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    let nameTextError = document.querySelector('.name-validation')
    let emailTextError = document.querySelector('.email-validation')
    let checkboxTextError = document.querySelector('.checkbox-validation')
    
    
    // Name validation
    if(!nameRegex.test(name.value)){
        nameTextError.style.visibility = "visible"
        name.style.borderBottom = "1px solid red"
        flag = false
    }else{
        nameTextError.style.visibility = "hidden"
        name.style.borderBottom = "1px solid #08A6E4"
        flag = true
    }

    // Email validation
    if(!emailRegex.test(email.value)){
        emailTextError.style.visibility = "visible"
        email.style.borderBottom = "1px solid red"
        flag = false
    }else{
        emailTextError.style.visibility = "hidden"
        email.style.borderBottom = "1px solid #08A6E4"
        flag = true
    }

    // Checkbox validation
    if(!checkbox.checked){
        checkboxTextError.style.visibility = "visible"
        flag = false
    }else{
        checkboxTextError.style.visibility = "hidden"
        flag = true
    }

    return flag
    //console.log("Flag: " + flag)
}

document.querySelector('.contact-form').addEventListener('submit', formValidation)





/* Recoger los datos del formulario y mandarselos a un servidor JSON de testing 
como este https://jsonplaceholder.typicode.com/guide/ con fetch() */
document.querySelector('.contact-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = {
        name: name.value,
        email: email.value,
        checkbox: checkbox.checked,
    }

    const flag = formValidation(e)
    if(flag != true){
        return; // 
    }

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
        })

        const data = await response.json();
        console.log('Server response:', data);

    } catch (error) {
        console.error('Server error:', error);
    }

    
})








/* Crear un popup (/modal) de ‘Subscribe to our newsletter’ que aparece 
después de 5 segundos, o cuando el usuario baja 25% de la página */





/* Añadir un selector de moneda (EUR, USD, GBP), obtener los tipos de 
cambio de esta API https://github.com/fawazahmed0/currency-api#readme 
(https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json) */