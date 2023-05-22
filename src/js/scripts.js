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
    const scrolledPercentage = (window.scrollY / bodyHeight) * 100;

    window.addEventListener('scroll', () => {
        bar.style.width = scrolledPercentage + '%';
        //console.log(scrolledPercentage.value)
        return scrolledPercentage
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

const newsletter = document.querySelector('.popup-overlay');
const newsForm = document.querySelector('.popup-form');
const newsletterCloseBtn = document.querySelector ('.close-button');
//const inputNewsletter = document.querySelector ('#input-newsletter');
//let warningNewsletterEmail = document.getElementById('warning-newsletter-email');
let emailIsCorrect = false;



document.addEventListener('DOMContentLoaded', () => {

    percentageScroller()
    console.log(percentageScroller().scrolledPercentage)

    //console.log((window.localStorage.getItem('newsletterDisplayed').valueOf()))





    const scrolledEnough = () => {
        
    }



    setTimeout(()=> {
        if (!window.localStorage.getItem('newsletterDisplayed')){
            newsletter.style.display = 'flex';
            window.localStorage.setItem('newsletterDisplayed', 'true');
        }else{
            window.localStorage.setItem('newsletterDisplayed', 'false')
        }

    }, 5000)

    newsletter.addEventListener ('click', (e) => {
        if(e.target == newsletter)
            newsletter.style.display = 'none'
        //e.target === newsletter ? newsletter.style.display = 'none' : null;
    });
    
    newsletterCloseBtn.addEventListener ('click', () => {
        newsletter.style.display = 'none';
    })
    
    window.addEventListener ('keyup', (e) => {
        if(e.key == 'Escape')
            newsletter.style.display = 'none'
        
        //e.key === 'Escape' ? newsletter.style.display = 'none' : null;
    })
    
})

/*setTimeout(()=> {
    if (window.localStorage.getItem('newsletterDisplayed').valueOf() == false){
        newsletter.style.display ='flex';
        window.localStorage.setItem('newsletterDisplayed', 'true');
        console.log ('modal asincrónico')
    }
    window.localStorage.setItem('newsletterDisplayed', 'false')

},5000)*/





/*inputNewsletter.addEventListener ('keyup', ()=>{
    if (!regexEmail.test(inputNewsletter.value)) {
        inputNewsletter.style.border = '2px solid red';
        warningNewsletterEmail.innerHTML = `The email address is not valid`;
        console.log('desde false', emailIsCorrect)
    } else {
        inputNewsletter.style.border = '2px solid green'
        warningNewsletterEmail.innerHTML = '';
        emailIsCorrect = true;
        console.log('desde true', emailIsCorrect)
    }
})

newsForm.addEventListener ('submit', (e) => {
    console.log('Entra al submit');
    e.preventDefault();
    if (emailIsCorrect == true) {
        sendData(url, inputNewsletter.value)
        console.log('Data is ok') 
        warningNewsletterEmail.innerHTML = 'Successful subscription';
        warningNewsletterEmail.style.color = 'green';
    } else {
        warningNewsletterEmail.innerHTML = 'The email address is not valid';
        warningNewsletterEmail.classList.add = 'error';
        warningNewsletterEmail.style.color = 'red';
    }
})*/


/*document.addEventListener('DOMContentLoaded', function () {
    var popupOverlay = document.querySelector('.popup-overlay');
    var closeButton = document.querySelector('.close-button');
    var popupForm = document.querySelector('.popup-form');
    var emailInput = document.querySelector('.email');

    // Check if the popup should be displayed based on localStorage
    var isPopupClosed = localStorage.getItem('newsletterPopupClosed');
    if (!isPopupClosed) {
        // Show the popup after 5 seconds
        setTimeout(function () {
            popupOverlay.style.display = 'flex';
        }, 5000);
    }

    // Close the popup when the close button is clicked
    closeButton.addEventListener('click', function () {
        popupOverlay.style.display = 'none';
        // Save the popup closed state in localStorage
        localStorage.setItem('newsletterPopupClosed', true);
    });

    // Close the popup when clicked outside the modal
    window.addEventListener('click', function (event) {
        if (event.target === popupOverlay) {
            popupOverlay.style.display = 'none';
            // Save the popup closed state in localStorage
            localStorage.setItem('newsletterPopupClosed', true);
        }
    });

    // Close the popup when ESC key is pressed
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            popupOverlay.style.display = 'none';
            // Save the popup closed state in localStorage
            localStorage.setItem('newsletterPopupClosed', true);
        }
    });

    // Validate and submit the form
    popupForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var email = emailInput.value;
        if (validateEmail(email)) {
            // Send the email to the server (you'll need to implement this part)
            // ...

            // Close the popup after submitting the form
            popupOverlay.style.display = 'none';
            // Save the popup closed state in localStorage
            localStorage.setItem('newsletterPopupClosed', true);
        } else {
            alert('Please enter a valid email address.');
        }
    });

    // Email validation function
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
});*/







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
class Slider {
    constructor(slider) {
        this.slider = document.querySelector('#slider');
        this.images = this.slider.querySelectorAll('.slider-img');
        this.dots = this.slider.querySelectorAll('.dot');
        this.prevButton = this.slider.querySelector('.prev-button');
        this.nextButton = this.slider.querySelector('.next-button');
        
        this.currentIndex = 0;
    
        this.prevButton.addEventListener('click', () => this.showPreviousImage());
        this.nextButton.addEventListener('click', () => this.showNextImage());
    
        // Automatic advance
        setInterval(() => {
            this.showNextImage();
        }, 3000);

        // Updating images and dots
        this.updateSlider()
    }
  
    showPreviousImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateSlider();
    }
  
    showNextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateSlider();
    }
  
    updateSlider() {
        for (let i = 0; i < this.images.length; i++) {
            // Set and modify attributes for img and dots
            if (i === this.currentIndex) { 
                this.images[i].style.display = 'block';
                this.dots[i].classList.add('active');

            } else {
                this.images[i].style.display = 'none';
                this.dots[i].classList.remove('active');
        
            }
        }
    }

}
  
// Create slider instance with 'slider' ID
const slider = new Slider('slider');