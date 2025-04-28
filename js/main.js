// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.classList.remove('navbar-transparent');
        navbar.classList.add('navbar-solid');
    } else {
        navbar.classList.add('navbar-transparent');
        navbar.classList.remove('navbar-solid');
    }

    lastScrollTop = scrollTop;
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Here you would typically send the data to your server
        console.log('Form submitted:', data);

        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Add animation classes to sections when they come into view
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Initialize Google Maps
function initMap() {
    // Replace with your actual coordinates
    const location = { lat: 12.971599, lng: 77.594572 };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location
    });
    const marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

// Load Google Maps API
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
script.defer = true;
script.async = true;
document.head.appendChild(script);