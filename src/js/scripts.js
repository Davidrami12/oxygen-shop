// Replace burger menu from CSS to JS functionality
const menu = document.querySelector('.menu')
const iconBurger = document.querySelector('#toggler-label')

const burgerMenu = () => {
    
    if(iconBurger.innerHTML == "☰"){
        menu.style.position = 'relative';
        menu.style.visibility = 'visible';
        iconBurger.innerHTML = "⛌"
        
    } else if(iconBurger.innerHTML == "⛌"){
        menu.style.position = 'absolute';
        menu.style.visibility = 'hidden';
        iconBurger.innerHTML = "☰"
        
        // Control on desktop px 
        window.onresize = () => {
            if(window.innerWidth>1000){
                menu.style.position = 'relative';
                menu.style.visibility = 'visible';
                iconBurger.innerHTML = "☰"
            }else{
                menu.style.position = 'absolute';
                menu.style.visibility = 'hidden';
            }
        }   
    }
}

iconBurger.addEventListener("click", burgerMenu)



// Percentage scroller element
const percentageScroller = () => {
    const bar = document.querySelector('#progress-bar');
    const bodyHeight = document.body.scrollHeight - window.innerHeight;

    window.addEventListener('scroll', () => {
        const scrolledPercentage = (window.scrollY / bodyHeight) * 100;
        bar.style.width = scrolledPercentage + '%';
    });
};

document.addEventListener('scroll', percentageScroller);



// Return to the top button (200ms wait time and smooth animation)
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



// Form validation: Name: 2-100 characters. Email must be valid. Checkbox must be checked
// Adding styles and red borders for error text validation
let name = document.querySelector('.name')
let email = document.querySelector('.email')
let checkbox = document.querySelector('.form-checkbox')

const formValidation = (e) => {
    e.preventDefault();

    let flag = true; // Flag to prevent sending incorrect data

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
}

document.querySelector('.contact-form').addEventListener('submit', formValidation)



// Receive form data and send it to a JSON test server using fetch()
document.querySelector('.contact-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = {
        name: name.value,
        email: email.value,
        checkbox: checkbox.checked,
    }

    const flag = formValidation(e)
    if(flag != true){
        return; // Prevent sending data to server
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
        console.log('Server response: ', data);

    } catch (error) {
        console.error('Server error: ', error);
    }
})





// Popup ‘Subscribe to our newsletter’ after 5s or 25% scrolled







// Currency selector (EUR, USD, GBP) using an API
const basicPrice = document.querySelector('.basic-price');
const professionalPrice = document.querySelector('.professional-price');
const premiumPrice = document.querySelector('.premium-price');
const currencySelected = document.querySelector('.currency-selector')

async function fetchCurrencyApi() {
    try {
        const response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json');
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Server error: ', error);
    }
}

fetchCurrencyApi().then((data) => {
    currencySelected.addEventListener("change", (e) => {
        switch (e.target.value) {
            case "USD":
                basicPrice.innerHTML = "$0";
                professionalPrice.innerHTML = "$25";
                premiumPrice.innerHTML = "$60";
                break;

            case "EUR":
                basicPrice.innerHTML = Math.round(0 * (data.usd.eur)) + "€";
                professionalPrice.innerHTML = Math.round(25 * (data.usd.eur)) + "€";
                premiumPrice.innerHTML = Math.round(60 * (data.usd.eur)) + "€";
                break;

            case "GBP":
                basicPrice.innerHTML = "£" + Math.round(0 * (data.usd.gbp));
                professionalPrice.innerHTML = "£" + Math.round(25 * (data.usd.gbp));
                premiumPrice.innerHTML = "£" + Math.round(60 * (data.usd.gbp));
                break;

            default:
                break;
        }
    });
});





// ‘Slider’ with prev/next buttons, individual images, automatic move