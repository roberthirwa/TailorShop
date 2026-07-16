// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.toggle('active');
            }
        });
    }
    
    // Back to top button
    const backTop = document.getElementById('back-top');
    if (backTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backTop.style.display = 'block';
            } else {
                backTop.style.display = 'none';
            }
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Set active navigation link based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveNavLink();
});

// Shopping Cart Functionality
function initShoppingCart() {
    const preorderButtons = document.querySelectorAll('.btn-preorder');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalProductName = document.getElementById('modal-product-name');
    const depositAmount = document.getElementById('deposit-amount');
    const cartCount = document.querySelector('.cart-count');
    const summaryProduct = document.getElementById('summary-product');
    const summaryTotal = document.getElementById('summary-total');
    const summaryDeposit = document.getElementById('summary-deposit');
    
    let cartItems = 0;
    let currentProduct = null;
    
    // Open modal when Preorder is clicked
    preorderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = this.getAttribute('data-price');
            const deposit = (price * 0.5).toFixed(0);
            
            modalProductName.textContent = product;
            depositAmount.textContent = deposit;
            summaryProduct.textContent = product;
            summaryTotal.textContent = price;
            summaryDeposit.textContent = deposit;
            
            currentProduct = {name: product, price: price, deposit: deposit};
            
            cartModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form submission
    const cartForm = document.getElementById('cart-form');
    if (cartForm) {
        cartForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
            
            // Simulate payment processing
            alert(`Thank you for your preorder!\n\nA 50% deposit of $${currentProduct.deposit} will be processed via ${paymentMethod === 'momo' ? 'Momo Pay' : 'Credit Card'}.\n\nWe will contact you at ${email} within 24 hours to schedule your measurement session and discuss fabric options.`);
            
            // Update cart count
            cartItems++;
            if (cartCount) {
                cartCount.textContent = cartItems;
                cartCount.style.display = 'flex';
            }
            
            // Close modal
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset form
            this.reset();
        });
    }
    
    // Cart icon click
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            if (cartItems > 0) {
                alert(`You have ${cartItems} preorder${cartItems > 1 ? 's' : ''} in progress. We'll contact you soon to schedule your fittings.`);
            } else {
                alert('Your cart is empty. Explore our collection to find your perfect garment.');
            }
        });
    }

    // Quick view buttons
    const quickViewButtons = document.querySelectorAll('.btn-view-details');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productDesc = productCard.querySelector('p').textContent;
            
            alert(`${productName}\n\n${productDesc}\n\n${productPrice}\n\nClick "Preorder Now" to begin your bespoke journey.`);
        });
    });
}

// Initialize shopping cart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize shopping cart if on shop page
    if (document.querySelector('.products-grid')) {
        initShoppingCart();
    }
});