// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // DOM Elements
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const bookingBtn = document.querySelector('.booking-btn');
    const modal = document.getElementById('booking-modal');
    const closeBtn = document.querySelector('.close');
    const contactForm = document.getElementById('contact-form');
    const bookingForm = document.getElementById('booking-form');
    const propertiesGrid = document.getElementById('properties-grid');
    const rentalPropertiesGrid = document.getElementById('rental-properties-grid');

    // Carousel Elements
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;

    // Sample Properties Data
    const properties = [
        {
            id: 1,
            title: "Coastal Villa - Nyali",
            location: "Nyali, Mombasa",
            price: "KSh 8,500,000",
            type: "Villa",
            status: "For Sale",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            features: {
                bedrooms: 4,
                bathrooms: 3,
                sqft: "2,500"
            },
            description: "Luxury villa with ocean views and modern amenities"
        },
        {
            id: 2,
            title: "Kilifi Heights Apartment",
            location: "Kilifi Town",
            price: "KSh 2,200,000",
            type: "Apartment",
            status: "For Sale",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            features: {
                bedrooms: 3,
                bathrooms: 2,
                sqft: "1,800"
            },
            description: "Modern apartment in prime Kilifi location"
        },
        {
            id: 3,
            title: "Shanzu Beach House",
            location: "Shanzu, Mombasa",
            price: "KSh 6,800,000",
            type: "House",
            status: "For Sale",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            features: {
                bedrooms: 5,
                bathrooms: 4,
                sqft: "3,200"
            },
            description: "Beachfront property with private access"
        },
        {
            id: 4,
            title: "Mtwapa Commercial Space",
            location: "Mtwapa",
            price: "KSh 4,500,000",
            type: "Commercial",
            status: "For Sale",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            features: {
                floors: 2,
                parking: "10 spaces",
                sqft: "5,000"
            },
            description: "Prime commercial space for business"
        },
        {
            id: 5,
            title: "Vipingo Luxury Villa",
            location: "Vipingo Ridge",
            price: "KSh 12,000,000",
            type: "Villa",
            status: "For Sale",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            features: {
                bedrooms: 6,
                bathrooms: 5,
                sqft: "4,500"
            },
            description: "Ultra-luxury villa with golf course views"
        },
        {
            id: 6,
            title: "Nyali Rental Apartment",
            location: "Nyali",
            price: "KSh 85,000/month",
            type: "Apartment",
            status: "For Rent",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            features: {
                bedrooms: 2,
                bathrooms: 2,
                sqft: "1,200"
            },
            description: "Furnished apartment for rent"
        }
    ];

    // Remove loading screen immediately
    function removeLoader() {
        const existingLoader = document.querySelector('.loader');
        if (existingLoader) {
            existingLoader.style.opacity = '0';
            setTimeout(() => {
                if (existingLoader.parentNode) {
                    existingLoader.remove();
                }
            }, 300);
        }
    }

    // Remove loader immediately
    removeLoader();

    // Carousel Functions
    function showSlide(index) {
        // Remove active class from all slides and indicators
        carouselSlides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        carouselSlides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % carouselSlides.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        showSlide(prev);
    }

    // Carousel Event Listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Auto-advance carousel
    let carouselInterval = setInterval(nextSlide, 5000);

    // Pause auto-advance on hover
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(nextSlide, 5000);
        });
    }

    // Mobile Menu Toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Close all dropdown menus when hamburger menu is closed
            if (!hamburger.classList.contains('active')) {
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        });
    }
    
    // Mobile Dropdown Menu Toggle
    const dropdownLinks = document.querySelectorAll('.dropdown .nav-link');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdownMenu = link.nextElementSibling;
                if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                    dropdownMenu.classList.toggle('show');
                }
            }
        });
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            
            // Close all dropdown menus on mobile
            if (window.innerWidth <= 768) {
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        });
    });

    // Booking Modal
    if (bookingBtn && modal) {
        bookingBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Smooth Scrolling for Navigation Links
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

    // Active Navigation Link on Scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Property Card Template
    function createPropertyCard(property) {
        const features = property.features;
        const featureItems = [];
        
        if (features.bedrooms) {
            featureItems.push(`<span class="property-feature"><i class="fas fa-bed"></i> ${features.bedrooms} Beds</span>`);
        }
        if (features.bathrooms) {
            featureItems.push(`<span class="property-feature"><i class="fas fa-bath"></i> ${features.bathrooms} Baths</span>`);
        }
        if (features.sqft) {
            featureItems.push(`<span class="property-feature"><i class="fas fa-ruler-combined"></i> ${features.sqft} sqft</span>`);
        }
        if (features.floors) {
            featureItems.push(`<span class="property-feature"><i class="fas fa-building"></i> ${features.floors} Floors</span>`);
        }
        if (features.parking) {
            featureItems.push(`<span class="property-feature"><i class="fas fa-car"></i> ${features.parking}</span>`);
        }

        return `
            <div class="property-card" data-id="${property.id}">
                <div class="property-image">
                    <img src="${property.image}" alt="${property.title}" onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
                    <div class="property-status">${property.status}</div>
                </div>
                <div class="property-content">
                    <h3 class="property-title">${property.title}</h3>
                    <p class="property-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${property.location}
                    </p>
                    <div class="property-price">${property.price}</div>
                    <div class="property-features">
                        ${featureItems.join('')}
                    </div>
                    <p>${property.description}</p>
                    <div class="property-actions">
                        <button class="btn btn-primary" onclick="viewProperty(${property.id})">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                        <button class="btn btn-outline" onclick="bookViewing(${property.id})">
                            <i class="fas fa-calendar-check"></i> Book Viewing
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Load Properties
    function loadProperties() {
        const saleProperties = properties.filter(p => p.status === 'For Sale');
        const rentalProperties = properties.filter(p => p.status === 'For Rent');
        
        if (propertiesGrid) {
            propertiesGrid.innerHTML = saleProperties.map(createPropertyCard).join('');
        }
        
        if (rentalPropertiesGrid) {
            rentalPropertiesGrid.innerHTML = rentalProperties.map(createPropertyCard).join('');
        }
    }

    // Property Filtering
    function filterProperties() {
        const locationFilter = document.querySelector('select[value=""]');
        const priceFilter = document.querySelectorAll('.filter-select')[1];
        const typeFilter = document.querySelectorAll('.filter-select')[2];
        
        let filteredProperties = properties.filter(p => p.status === 'For Sale');
        
        if (locationFilter && locationFilter.value) {
            filteredProperties = filteredProperties.filter(p => 
                p.location.toLowerCase().includes(locationFilter.value.toLowerCase())
            );
        }
        
        if (typeFilter && typeFilter.value) {
            filteredProperties = filteredProperties.filter(p => 
                p.type.toLowerCase() === typeFilter.value.toLowerCase()
            );
        }
        
        if (propertiesGrid) {
            propertiesGrid.innerHTML = filteredProperties.map(createPropertyCard).join('');
        }
    }

    // Add filter event listeners
    document.querySelectorAll('.filter-select').forEach(select => {
        select.addEventListener('change', filterProperties);
    });

    // Property Viewing Function
    window.viewProperty = function(propertyId) {
        const property = properties.find(p => p.id === propertyId);
        if (property) {
            // Create a modal for property details
            const detailModal = document.createElement('div');
            detailModal.className = 'modal';
            detailModal.innerHTML = `
                <div class="modal-content">
                    <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                    <div class="property-detail">
                        <img src="${property.image}" alt="${property.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 1rem;">
                        <h2>${property.title}</h2>
                        <p><strong>Location:</strong> ${property.location}</p>
                        <p><strong>Price:</strong> ${property.price}</p>
                        <p><strong>Type:</strong> ${property.type}</p>
                        <p><strong>Description:</strong> ${property.description}</p>
                        <div class="property-actions" style="margin-top: 2rem;">
                            <button class="btn btn-primary" onclick="bookViewing(${property.id})">
                                <i class="fas fa-calendar-check"></i> Book Viewing
                            </button>
                            <button class="btn btn-outline" onclick="startVirtualTour(${property.id})">
                                <i class="fas fa-vr-cardboard"></i> Virtual Tour
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(detailModal);
            detailModal.style.display = 'block';
        }
    };

    // Book Viewing Function
    window.bookViewing = function(propertyId) {
        const property = properties.find(p => p.id === propertyId);
        if (property && modal) {
            // Update modal with property info
            const propertySelect = document.querySelector('#booking-form select');
            if (propertySelect) {
                propertySelect.innerHTML = `
                    <option value="${property.id}">${property.title} - ${property.location}</option>
                `;
            }
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    // Virtual Tour Function
    window.startVirtualTour = function(propertyId) {
        const property = properties.find(p => p.id === propertyId);
        if (property) {
            // Create virtual tour modal
            const tourModal = document.createElement('div');
            tourModal.className = 'modal';
            tourModal.innerHTML = `
                <div class="modal-content" style="max-width: 800px;">
                    <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                    <div class="virtual-tour-container">
                        <h2>Virtual Tour - ${property.title}</h2>
                        <div class="tour-placeholder" style="height: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center; background: linear-gradient(135deg, #A08050, #8B6B3A); color: white; border-radius: 12px;">
                            <i class="fas fa-vr-cardboard" style="font-size: 4rem; margin-bottom: 1rem;"></i>
                            <h3>360° Virtual Tour</h3>
                            <p>Experience ${property.title} in immersive detail</p>
                            <div style="margin-top: 2rem;">
                                <button class="btn btn-primary" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">
                                    <i class="fas fa-play"></i> Start Tour
                                </button>
                            </div>
                        </div>
                        <div style="margin-top: 1rem; text-align: center;">
                            <p><strong>Features:</strong> HD Quality • Mobile Compatible • 24/7 Access</p>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(tourModal);
            tourModal.style.display = 'block';
        }
    };

    // Form Handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            this.reset();
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate booking submission
            showNotification('Booking request submitted successfully! We will confirm your viewing appointment.', 'success');
            this.reset();
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background-color: ${type === 'success' ? '#28a745' : '#007bff'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Search Functionality
    function searchProperties(query) {
        const filteredProperties = properties.filter(property => 
            property.title.toLowerCase().includes(query.toLowerCase()) ||
            property.location.toLowerCase().includes(query.toLowerCase()) ||
            property.description.toLowerCase().includes(query.toLowerCase())
        );
        
        if (propertiesGrid) {
            propertiesGrid.innerHTML = filteredProperties.map(createPropertyCard).join('');
        }
    }

    // Add search functionality to hero button
    const heroButton = document.querySelector('.btn-primary.btn-large');
    if (heroButton) {
        heroButton.addEventListener('click', () => {
            const query = prompt('Enter your search terms (property type, location, etc.):');
            if (query) {
                searchProperties(query);
                const forSaleSection = document.getElementById('for-sale');
                if (forSaleSection) {
                    forSaleSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // Virtual Tour Button in Hero
    const virtualTourButton = document.querySelector('.btn-outline.btn-large');
    if (virtualTourButton) {
        virtualTourButton.addEventListener('click', () => {
            const virtualTourSection = document.querySelector('.virtual-tour-section');
            if (virtualTourSection) {
                virtualTourSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Statistics Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat h3');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                }
            };
            
            updateCounter();
        });
    }

    // Trigger counter animation when stats section is visible
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        });
        statsObserver.observe(heroStats);
    }

    // Scroll animations for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });

    // Initialize everything
    console.log('Loading properties...');
    loadProperties();
    console.log('Website initialized successfully!');
});

// Fallback: Remove loader if it still exists after 2 seconds
setTimeout(() => {
    const loader = document.querySelector('.loader');
    if (loader && loader.parentNode) {
        console.log('Removing loader fallback');
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
}, 2000);

