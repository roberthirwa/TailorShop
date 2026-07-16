// menu.js - Responsive menu functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainMenu = document.querySelector('.main-menu');
    const body = document.body;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('menu-overlay');
    document.body.appendChild(overlay);
    
    // Toggle menu function
    function toggleMenu() {
        mobileMenuBtn.classList.toggle('active');
        mainMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
    }
    
    // Add click event to mobile menu button
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }
    
    // Add click event to overlay to close menu
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on links (for single page applications)
    const menuLinks = document.querySelectorAll('#navigation a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                toggleMenu();
            }
        });
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Adjust body class for no-scroll
    const style = document.createElement('style');
    style.textContent = `
        .no-scroll {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});