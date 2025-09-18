// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .download-card, .security-text, .security-image');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Download button interactions
    const downloadButtons = document.querySelectorAll('.btn-download, .btn-primary, .btn-secondary');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Simulate download action
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show download message
            showDownloadMessage(this.textContent);
        });
    });

    // Chat message animation
    const messages = document.querySelectorAll('.message');
    messages.forEach((message, index) => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            message.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, index * 500 + 1000);
    });

    // Typing indicator animation
    function showTypingIndicator() {
        const chatMessages = document.querySelector('.chat-messages');
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message received typing-indicator';
        typingIndicator.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        chatMessages.appendChild(typingIndicator);
        
        setTimeout(() => {
            typingIndicator.remove();
        }, 2000);
    }

    // Show typing indicator after initial messages
    setTimeout(showTypingIndicator, 4000);

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add ripple effect CSS
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .typing-indicator {
            background: white !important;
            padding: 1rem !important;
        }
        
        .typing-dots {
            display: flex;
            gap: 4px;
        }
        
        .typing-dots span {
            width: 8px;
            height: 8px;
            background: #999;
            border-radius: 50%;
            animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-dots span:nth-child(1) {
            animation-delay: -0.32s;
        }
        
        .typing-dots span:nth-child(2) {
            animation-delay: -0.16s;
        }
        
        @keyframes typing {
            0%, 80%, 100% {
                transform: scale(0);
            }
            40% {
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
});

// Download message function
function showDownloadMessage(buttonText) {
    const message = document.createElement('div');
    message.className = 'download-message';
    message.innerHTML = `
        <div class="download-message-content">
            <i class="fas fa-download"></i>
            <span>MEA Chyme download started for ${buttonText}</span>
        </div>
    `;
    
    // Add styles for download message
    const messageStyle = document.createElement('style');
    messageStyle.textContent = `
        .download-message {
            position: fixed;
            top: 100px;
            right: 20px;
            background: #DC2626;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        }
        
        .download-message.show {
            transform: translateX(0);
        }
        
        .download-message-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .download-message i {
            font-size: 1.2rem;
        }
    `;
    
    if (!document.querySelector('.download-message-style')) {
        messageStyle.className = 'download-message-style';
        document.head.appendChild(messageStyle);
    }
    
    document.body.appendChild(message);
    
    // Show message
    setTimeout(() => {
        message.classList.add('show');
    }, 100);
    
    // Hide message
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 3000);
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loaded styles
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadedStyle);
});

// Add scroll to top functionality
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #DC2626;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
addScrollToTop();

// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const supportForm = document.getElementById('supportForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'Contact');
        });
    }
    
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'Support');
        });
    }
});

// Form submission handler
function handleFormSubmission(form, type) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showFormSuccess(type);
    }, 2000);
}

// Show form success message
function showFormSuccess(type) {
    const message = document.createElement('div');
    message.className = 'form-success-message';
    message.innerHTML = `
        <div class="form-success-content">
            <i class="fas fa-check-circle"></i>
            <span>${type} form submitted successfully! We'll get back to you soon.</span>
        </div>
    `;
    
    // Add styles for success message
    const messageStyle = document.createElement('style');
    messageStyle.textContent = `
        .form-success-message {
            position: fixed;
            top: 100px;
            right: 20px;
            background: #10B981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        }
        
        .form-success-message.show {
            transform: translateX(0);
        }
        
        .form-success-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .form-success-content i {
            font-size: 1.2rem;
        }
    `;
    
    if (!document.querySelector('.form-success-message-style')) {
        messageStyle.className = 'form-success-message-style';
        document.head.appendChild(messageStyle);
    }
    
    document.body.appendChild(message);
    
    // Show message
    setTimeout(() => {
        message.classList.add('show');
    }, 100);
    
    // Hide message
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 5000);
}

// Help search functionality
document.addEventListener('DOMContentLoaded', function() {
    const helpSearch = document.getElementById('helpSearch');
    
    if (helpSearch) {
        helpSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = searchTerm ? 'none' : 'block';
                }
            });
        });
    }
});

// Live chat functionality
function startLiveChat() {
    const chatWindow = document.createElement('div');
    chatWindow.className = 'live-chat-window';
    chatWindow.innerHTML = `
        <div class="chat-header">
            <h3>Live Chat Support</h3>
            <button class="close-chat" onclick="closeLiveChat()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="chat-messages">
            <div class="message received">
                <p>Hello! How can we help you today?</p>
                <span class="time">${new Date().toLocaleTimeString()}</span>
            </div>
        </div>
        <div class="chat-input">
            <input type="text" placeholder="Type your message..." id="chatInput">
            <button onclick="sendChatMessage()">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
    `;
    
    // Add styles for live chat
    const chatStyle = document.createElement('style');
    chatStyle.textContent = `
        .live-chat-window {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            display: flex;
            flex-direction: column;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        }
        
        .live-chat-window.show {
            transform: translateY(0);
        }
        
        .chat-header {
            background: #DC2626;
            color: white;
            padding: 1rem;
            border-radius: 15px 15px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .chat-header h3 {
            margin: 0;
            font-size: 1.1rem;
        }
        
        .close-chat {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1.2rem;
        }
        
        .chat-messages {
            flex: 1;
            padding: 1rem;
            overflow-y: auto;
            background: #f8f9fa;
        }
        
        .chat-input {
            padding: 1rem;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 0.5rem;
        }
        
        .chat-input input {
            flex: 1;
            padding: 0.5rem;
            border: 1px solid #e5e7eb;
            border-radius: 20px;
            outline: none;
        }
        
        .chat-input button {
            background: #DC2626;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
        }
    `;
    
    if (!document.querySelector('.live-chat-window-style')) {
        chatStyle.className = 'live-chat-window-style';
        document.head.appendChild(chatStyle);
    }
    
    document.body.appendChild(chatWindow);
    
    // Show chat window
    setTimeout(() => {
        chatWindow.classList.add('show');
    }, 100);
}

function closeLiveChat() {
    const chatWindow = document.querySelector('.live-chat-window');
    if (chatWindow) {
        chatWindow.classList.remove('show');
        setTimeout(() => {
            chatWindow.remove();
        }, 300);
    }
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (chatInput.value.trim()) {
        const message = document.createElement('div');
        message.className = 'message sent';
        message.innerHTML = `
            <p>${chatInput.value}</p>
            <span class="time">${new Date().toLocaleTimeString()}</span>
        `;
        
        chatMessages.appendChild(message);
        chatInput.value = '';
        
        // Simulate response
        setTimeout(() => {
            const response = document.createElement('div');
            response.className = 'message received';
            response.innerHTML = `
                <p>Thank you for your message. Our support team will respond shortly.</p>
                <span class="time">${new Date().toLocaleTimeString()}</span>
            `;
            chatMessages.appendChild(response);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Add enter key support for chat input
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.id === 'chatInput') {
        sendChatMessage();
    }
});

// First Alert functionality
document.addEventListener('DOMContentLoaded', function() {
    const firstAlertBtn = document.getElementById('firstAlertBtn');
    
    if (firstAlertBtn) {
        firstAlertBtn.addEventListener('click', function() {
            showFirstAlertModal();
        });
    }
});

function showFirstAlertModal() {
    const modal = document.createElement('div');
    modal.className = 'first-alert-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Get First Alert!</h3>
                    <button class="close-modal" onclick="closeFirstAlertModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Be the first to know when MEA Chyme goes live! Enter your email below to get notified.</p>
                    <form id="firstAlertForm">
                        <div class="form-group">
                            <input type="email" id="alertEmail" placeholder="Enter your email address" required>
                        </div>
                        <button type="submit" class="btn-submit-alert">
                            <i class="fas fa-bell"></i>
                            Sign Up for First Alert
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for modal
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .first-alert-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: relative;
            background: white;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            transform: scale(0.8);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .modal-content.show {
            transform: scale(1);
            opacity: 1;
        }
        
        .modal-header {
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: #333;
            padding: 1.5rem;
            border-radius: 15px 15px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h3 {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 700;
        }
        
        .close-modal {
            background: none;
            border: none;
            color: #333;
            cursor: pointer;
            font-size: 1.5rem;
            padding: 0.5rem;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .close-modal:hover {
            background: rgba(0, 0, 0, 0.1);
        }
        
        .modal-body {
            padding: 2rem;
        }
        
        .modal-body p {
            color: #666;
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        
        .modal-body .form-group {
            margin-bottom: 1.5rem;
        }
        
        .modal-body input {
            width: 100%;
            padding: 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 10px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        
        .modal-body input:focus {
            outline: none;
            border-color: #FFD700;
        }
        
        .btn-submit-alert {
            width: 100%;
            padding: 1rem 2rem;
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: #333;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .btn-submit-alert:hover {
            background: linear-gradient(135deg, #FFA500, #FF8C00);
            transform: translateY(-2px);
        }
        
        .btn-submit-alert:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
    `;
    
    if (!document.querySelector('.first-alert-modal-style')) {
        modalStyle.className = 'first-alert-modal-style';
        document.head.appendChild(modalStyle);
    }
    
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.querySelector('.modal-content').classList.add('show');
    }, 100);
    
    // Handle form submission
    const form = modal.querySelector('#firstAlertForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFirstAlertSubmission(this);
    });
    
    // Close modal when clicking overlay
    modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeFirstAlertModal();
        }
    });
}

function closeFirstAlertModal() {
    const modal = document.querySelector('.first-alert-modal');
    if (modal) {
        modal.querySelector('.modal-content').classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function handleFirstAlertSubmission(form) {
    const email = form.querySelector('#alertEmail').value;
    const submitButton = form.querySelector('.btn-submit-alert');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing Up...';
    submitButton.disabled = true;
    
    // Initialize EmailJS
    emailjs.init("ZExNOu09FML70WNFg");
    
    // EmailJS template parameters
    const templateParams = {
        to_email: 'info@meachyme.com',
        from_email: email,
        subject: 'First Alert Signup - MEA Chyme',
        message: `New First Alert signup from: ${email}\n\nUser wants to be notified when MEA Chyme goes live.`,
        user_email: email,
        signup_date: new Date().toLocaleDateString(),
        signup_time: new Date().toLocaleTimeString(),
        user_ip: 'Unknown' // You can add IP detection if needed
    };
    
    // Send email using EmailJS
    emailjs.send('service_bxh33he', 'template_0nc25af', templateParams)
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            
            // Show success message
            showFirstAlertSuccess();
            
            // Close modal
            closeFirstAlertModal();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        })
        .catch(function(error) {
            console.error('Failed to send email:', error);
            
            // Show error message
            showFirstAlertError();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        });
}

function showFirstAlertSuccess() {
    const message = document.createElement('div');
    message.className = 'first-alert-success';
    message.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <span>Successfully signed up for First Alert! We'll notify you when MEA Chyme goes live.</span>
        </div>
    `;
    
    // Add styles for success message
    const messageStyle = document.createElement('style');
    messageStyle.textContent = `
        .first-alert-success {
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #10B981, #059669);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        }
        
        .first-alert-success.show {
            transform: translateX(0);
        }
        
        .success-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .success-content i {
            font-size: 1.2rem;
            flex-shrink: 0;
        }
        
        .success-content span {
            font-size: 0.9rem;
            line-height: 1.4;
        }
    `;
    
    if (!document.querySelector('.first-alert-success-style')) {
        messageStyle.className = 'first-alert-success-style';
        document.head.appendChild(messageStyle);
    }
    
    document.body.appendChild(message);
    
    // Show message
    setTimeout(() => {
        message.classList.add('show');
    }, 100);
    
    // Hide message
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 5000);
}

function showFirstAlertError() {
    const message = document.createElement('div');
    message.className = 'first-alert-error';
    message.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Sorry, there was an error signing up. Please try again or contact support.</span>
        </div>
    `;
    
    // Add styles for error message
    const messageStyle = document.createElement('style');
    messageStyle.textContent = `
        .first-alert-error {
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #EF4444, #DC2626);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        }
        
        .first-alert-error.show {
            transform: translateX(0);
        }
        
        .error-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .error-content i {
            font-size: 1.2rem;
            flex-shrink: 0;
        }
        
        .error-content span {
            font-size: 0.9rem;
            line-height: 1.4;
        }
    `;
    
    if (!document.querySelector('.first-alert-error-style')) {
        messageStyle.className = 'first-alert-error-style';
        document.head.appendChild(messageStyle);
    }
    
    document.body.appendChild(message);
    
    // Show message
    setTimeout(() => {
        message.classList.add('show');
    }, 100);
    
    // Hide message
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 5000);
}
