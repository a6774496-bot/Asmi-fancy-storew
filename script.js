// JavaScript for WhatsApp Direct Order and Smooth Scroll

document.addEventListener('DOMContentLoaded', function() {
    // Your WhatsApp number (using the number you provided)
    const whatsappNumber = '9779848488830'; 
    
    // 1. WhatsApp Order Functionality (Add to Cart style)
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const orderButton = card.querySelector('.add-to-cart-button');
        const productName = card.getAttribute('data-product');

        if (orderButton && productName) {
            orderButton.addEventListener('click', function() {
                // Nepali message for WhatsApp
                const message = `नमस्ते! म Asmi Fancy Store बाट "${productName}" अर्डर गर्न चाहन्छु। मूल्य: ${card.querySelector('.price').textContent.trim()}। कृपया यो उपलब्ध छ/छैन, जानकारी दिनुहोला।`;
                
                // Encode the message for the URL
                const encodedMessage = encodeURIComponent(message);
                
                // Construct the final WhatsApp URL
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
                
                // Open WhatsApp link in a new tab
                window.open(whatsappUrl, '_blank');
            });
        }
    });

    // 2. Smooth Scroll for Navigation Links
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
