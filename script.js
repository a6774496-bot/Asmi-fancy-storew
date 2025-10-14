// JavaScript for Order Modal, WhatsApp Order, and Smooth Scroll

document.addEventListener('DOMContentLoaded', function() {
    // Your WhatsApp number 
    const whatsappNumber = '9779848488830'; 

    // Modal Elements
    const modal = document.getElementById('order-modal');
    const closeButton = document.querySelector('.close-button');
    const productNameInput = document.getElementById('product_name');
    const priceDetailInput = document.getElementById('price_detail');
    const orderForm = document.getElementById('order-form');

    // 1. Open Modal Functionality
    const openModalButtons = document.querySelectorAll('.open-modal-button');

    openModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = button.closest('.product-card');
            const productName = card.getAttribute('data-product');
            const price = card.getAttribute('data-price');
            
            // Set values in the form fields
            productNameInput.value = productName;
            priceDetailInput.value = price;
            
            modal.style.display = 'block';
        });
    });

    // 2. WhatsApp Order Functionality
    const whatsappOrderButtons = document.querySelectorAll('.whatsapp-order-button');
    
    whatsappOrderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = button.closest('.product-card');
            const productName = card.getAttribute('data-product');
            const price = card.getAttribute('data-price');
            
            // Nepali message for WhatsApp
            const message = `नमस्ते! म Asmi Fancy Store बाट "${productName}" (मूल्य: ${price}) अर्डर गर्न चाहन्छु। कृपया उपलब्ध छ/छैन, जानकारी दिनुहोला।`;
            
            // Encode the message for the URL
            const encodedMessage = encodeURIComponent(message);
            
            // Construct the final WhatsApp URL
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp link in a new tab
            window.open(whatsappUrl, '_blank');
        });
    });


    // 3. Close Modal Functionality
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        orderForm.reset(); // Clear form on close
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            orderForm.reset(); // Clear form on close
        }
    });

    // 4. Form Submission Handling (Formspree Fetch API)
    orderForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Use Fetch API to submit form data to Formspree without full page reload
        const response = await fetch(orderForm.action, {
            method: 'POST',
            body: new FormData(orderForm),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert('धन्यवाद! तपाईंको अर्डर सफलतापूर्वक सबमिट भएको छ। हामी छिट्टै तपाईंलाई सम्पर्क गर्नेछौं।');
            modal.style.display = 'none';
            orderForm.reset();
        } else {
            alert('अर्डर सबमिट गर्न समस्या भयो। कृपया आफ्नो विवरणहरू जाँच्नुहोस्।');
        }
    });


    // 5. Smooth Scroll for Navigation Links
    const headerHeight = document.querySelector('header').offsetHeight;

    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll smoothly to the target section, adjusting for the sticky header
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 10,
                    behavior: 'smooth'
                });
            }
        });
    });
});
