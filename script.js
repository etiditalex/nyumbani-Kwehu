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

// Sample Properties Data
const properties = [
    {
        id: 1,
        title: "Coastal Villa - Nyali",
        location: "Nyali, Mombasa",
        price: "KSh 8,500,000",
        type: "Villa",
        status: "For Sale",
        image: "https://via.placeholder.com/400x250/A08050/FFFFFF?text=Property+1",
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
        image: "https://via.placeholder.com/400x250/A08050/FFFFFF?text=Property+2",
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
        image: "https://via.placeholder.com/400x250/A08050/FFFFFF?text=Property+3",
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
        image: "https://via.placeholder.com/400x250/A08050/FFFFFF?text=Property+4",
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
        image: "https://via.placeholder.com/400x250/A08050/FFFFFF?text=Property+5",
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
        image: "https://via.placeholder.com/400x250/A08050/FFFFFF?text=Property+6",
        features: {
            bedrooms: 2,
            bathrooms: 2,
            sqft: "1,200"
        },
        description: "Furnished apartment for rent"
    }
];

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Booking Modal
bookingBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

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
                <img src="${property.image}" alt="${property.title}" onerror="this.src='https://via.placeholder.com/400x250/A08050/FFFFFF?text=Property+Image'">
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
function viewProperty(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
        // Create a modal for property details
        const detailModal = document.createElement('div');
        detailModal.className = 'modal';
        detailModal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <div class="property-detail">
                    <img src="${property.image}" alt="${property.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
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
}

// Book Viewing Function
function bookViewing(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
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
}

// Virtual Tour Function
function startVirtualTour(propertyId) {
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
                    <div class="tour-placeholder" style="height: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center; background: linear-gradient(135deg, #A08050, #8B6B3A); color: white; border-radius: 8px;">
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
}

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
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
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

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

// Lazy Loading for Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadProperties();
    lazyLoadImages();
    
    // Add loading animation
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--white);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 50px; height: 50px; border: 3px solid #f3f3f3; border-top: 3px solid var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
            <p style="color: var(--primary-color); font-weight: 500;">Loading Nyumbani Kwehu Developers...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
    
    // Also remove loader if it takes too long
    setTimeout(() => {
        if (loader && loader.parentNode) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    }, 3000);
    
    // Add spinner animation
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinnerStyle);
});

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
document.querySelector('.btn-primary.btn-large')?.addEventListener('click', () => {
    const query = prompt('Enter your search terms (property type, location, etc.):');
    if (query) {
        searchProperties(query);
        document.getElementById('for-sale').scrollIntoView({ behavior: 'smooth' });
    }
});

// Virtual Tour Button in Hero
document.querySelector('.btn-outline.btn-large')?.addEventListener('click', () => {
    document.querySelector('.virtual-tour-section').scrollIntoView({ behavior: 'smooth' });
});

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
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

