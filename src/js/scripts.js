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
    bar.style.width = scrolledPercentage + '%';
        
    return scrolledPercentage
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
const nameRegex = /^[A-Za-z]{2,100}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const formValidation = (e) => {
    e.preventDefault();

    let nameTextError = document.querySelector('.name-validation')
    let emailTextError = document.querySelector('.email-validation')
    let checkboxTextError = document.querySelector('.checkbox-validation')

    let flag = false; // Flag to prevent sending incorrect data
    
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
// Close pop up when pressing X button, click outside or pressing Escape
const newsletter = document.querySelector('.popup-overlay');
const popupForm = document.querySelector('.popup-form');
const closeButton = document.querySelector ('.close-button');
const popupEmail = document.querySelector ('.popup-email');
let emailTextError = document.querySelector('.popup-email-validation')

document.addEventListener('DOMContentLoaded', () => {

    // Function to show pop up
    const showNewsletter = () => {
        if (!window.localStorage.getItem('showNewsletter')){
            newsletter.style.display = 'flex';
            window.localStorage.setItem('showNewsletter', 'true');
        }else{
            window.localStorage.setItem('showNewsletter', 'false')
        }
    }

    // Show newsletter only after scrolling 25% of the page
    document.addEventListener("scroll", () => {
        if(percentageScroller() > 25){
            showNewsletter()
        }
    })

    // Show newsletter only after 5s
    setTimeout(()=> {
        showNewsletter()
    }, 5000)
        

    // Close newsletter on X button
    closeButton.addEventListener ('click', () => {
        newsletter.style.display = 'none';
    })

    // Close newsletter when pressing Escape
    window.addEventListener ('keydown', (e) => {
        if(e.key == 'Escape')
            newsletter.style.display = 'none'
    })

    // Close newsletter when click outside 
    newsletter.addEventListener ('click', (e) => {
        if(e.target == newsletter)
            newsletter.style.display = 'none'
    });
    
    popupForm.addEventListener("submit", async(e) => {
        e.preventDefault()

        let flag = false
        
        // Email validation
        if(!emailRegex.test(popupEmail.value)){
            emailTextError.style.visibility = "visible"
            popupEmail.style.borderColor = "red"
            flag = false
        }else{
            emailTextError.style.visibility = "hidden"
            popupEmail.style.border = "1px solid #ccc";
            newsletter.style.display = 'none'; // Close newsletter popup
            flag = true
        }

        const emailData = {
            email: popupEmail.value,
        }

        if(flag){
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
            })

            const data = await response.json();
            console.log('Server response: ', data);
        }

    })
    
})



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