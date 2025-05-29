// Sample product data with AI-generated images
const productData = {
    paintings: [
        { 
            id: 'paint1',
            name: 'Abstract Sunset', 
            price: '৳1,800', 
            seller: 'Fatema', 
            icon: '🎨', 
            rating: '4.9',
            image: 'abstract sunset.jpg',
            description: 'A beautiful abstract painting capturing the essence of a golden sunset over the horizon.'
        },
        { 
            id: 'paint2',
            name: 'Village Life', 
            price: '৳2,200', 
            seller: 'Karim', 
            icon: '🖼️', 
            rating: '4.8',
            image: 'village life.jpg',
            description: 'A vibrant depiction of rural Bangladesh life with intricate details and warm colors.'
        },
        { 
            id: 'paint3',
            name: 'Modern Art', 
            price: '৳1,500', 
            seller: 'Rashida', 
            icon: '🎨', 
            rating: '4.7',
            image: 'modern art.jpg',
            description: 'Contemporary abstract art piece with bold colors and dynamic composition.'
        },
        { 
            id: 'paint4',
            name: 'Nature Scene', 
            price: '৳1,900', 
            seller: 'Ahmed', 
            icon: '🌅', 
            rating: '4.9',
            image: 'nature scene.jpg',
            description: 'Serene landscape painting showcasing the natural beauty of Bangladesh.'
        }
    ],
    crochet: [
        { 
            id: 'crochet1',
            name: 'Baby Blanket', 
            price: '৳2,800', 
            seller: 'Rashida', 
            icon: '🧶', 
            rating: '5.0',
            image: 'baby blanket.jpg',
            description: 'Soft and cozy handmade baby blanket crafted with premium yarn.'
        },
        { 
            id: 'crochet2',
            name: 'Winter Scarf', 
            price: '৳800', 
            seller: 'Nasreen', 
            icon: '🧣', 
            rating: '4.8',
            image: 'winter scarf.jpg',
            description: 'Warm and stylish winter scarf perfect for the cold season.'
        },
        { 
            id: 'crochet3',
            name: 'Table Runner', 
            price: '৳1,200', 
            seller: 'Fatema', 
            icon: '🧶', 
            rating: '4.7',
            image: 'table runner.jpg',
            description: 'Elegant table runner with intricate crochet patterns for your dining table.'
        },
        { 
            id: 'crochet4',
            name: 'Cushion Cover', 
            price: '৳650', 
            seller: 'Salma', 
            icon: '🛏️', 
            rating: '4.9',
            image: 'cushion cover.jpg',
            description: 'Beautiful decorative cushion cover to enhance your home decor.'
        }
    ],
    pottery: [
        { 
            id: 'pottery1',
            name: 'Tea Set', 
            price: '৳1,500', 
            seller: 'Karim', 
            icon: '🫖', 
            rating: '4.8',
            image: 'tea set.jpg',
            description: 'Traditional handmade clay tea set perfect for tea ceremonies.'
        },
        { 
            id: 'pottery2',
            name: 'Flower Vase', 
            price: '৳900', 
            seller: 'Rahman', 
            icon: '🏺', 
            rating: '4.9',
            image: 'flower vase.jpg',
            description: 'Elegant ceramic flower vase with beautiful glazed finish.'
        },
        { 
            id: 'pottery3',
            name: 'Dinner Plates', 
            price: '৳1,200', 
            seller: 'Nasir', 
            icon: '🍽️', 
            rating: '4.7',
            image: 'dinner plates.jpg',
            description: 'Set of handcrafted dinner plates with traditional designs.'
        },
        { 
            id: 'pottery4',
            name: 'Decorative Bowl', 
            price: '৳750', 
            seller: 'Fatema', 
            icon: '🥣', 
            rating: '4.8',
            image: 'decorative bowl.jpg',
            description: 'Beautiful decorative bowl perfect for fruits or as a centerpiece.'
        }
    ],
    apparel: [
        { 
            id: 'apparel1',
            name: 'Hand-knit Sweater', 
            price: '৳2,500', 
            seller: 'Rashida', 
            icon: '👕', 
            rating: '4.9',
            image: 'hand-knit sweater.jpg',
            description: 'Cozy hand-knitted sweater made with soft wool yarn.'
        },
        { 
            id: 'apparel2',
            name: 'Embroidered Kurta', 
            price: '৳1,800', 
            seller: 'Nasreen', 
            icon: '👔', 
            rating: '4.8',
            image: 'embroidered kurta.jpg',
            description: 'Traditional kurta with beautiful hand embroidery work.'
        },
        { 
            id: 'apparel3',
            name: 'Traditional Saree', 
            price: '৳3,500', 
            seller: 'Salma', 
            icon: '👗', 
            rating: '5.0',
            image: 'traditional saree.jpg',
            description: 'Elegant traditional saree with intricate border designs.'
        },
        { 
            id: 'apparel4',
            name: 'Custom Jacket', 
            price: '৳2,200', 
            seller: 'Ahmed', 
            icon: '🧥', 
            rating: '4.7',
            image: 'custom jacket.jpg',
            description: 'Stylish custom-made jacket with modern design elements.'
        }
    ]
};

// Shopping cart functionality
let cart = [];

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click events to category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('.category-name').textContent.toLowerCase();
            showProducts(categoryName);
            showScreen('home'); // Stay on home screen but show filtered products
        });
    });

    // Initialize featured products
    showProducts('paintings');
    updateCartDisplay();
    updateCartBadge();
});

// Screen navigation function
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.app-screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    // Show selected screen
    document.getElementById(screenId).classList.add('active');
    
    // Update navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Find and activate the correct nav item
    const targetNavItem = Array.from(navItems).find(item => {
        const onClick = item.getAttribute('onclick');
        return onClick && onClick.includes(screenId);
    });
    if (targetNavItem) {
        targetNavItem.classList.add('active');
    }

    // Update cart display when cart screen is opened
    if (screenId === 'cart') {
        updateCartDisplay();
    }
}

// Product display function
function showProducts(category) {
    const products = productData[category] || productData.paintings;
    const productGrid = document.querySelector('.product-grid');
    
    if (!productGrid) return;
    
    // Add loading animation
    productGrid.style.opacity = '0.5';
    
    setTimeout(() => {
        productGrid.innerHTML = products.map(product => `
            <div class="product-card" onclick="showProductDetail('${product.id}')">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price}</div>
                    <div class="seller-name">by ${product.seller}</div>
                    <div style="color: #f39c12; font-size: 12px; margin-top: 3px;">⭐ ${product.rating}</div>
                </div>
            </div>
        `).join('');
        
        productGrid.style.opacity = '1';
    }, 300);
}

// Get product by ID
function getProductById(productId) {
    const allProducts = [...productData.paintings, ...productData.crochet, ...productData.pottery, ...productData.apparel];
    return allProducts.find(product => product.id === productId);
}

// Product detail modal function
function showProductDetail(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const modal = `
        <div class="product-modal" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <span class="close-btn" onclick="closeModal()">&times;</span>
                </div>
                <div class="product-detail">
                    <div class="product-image-large">
                        <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px;">
                    </div>
                    <h2>${product.name}</h2>
                    <p class="price-large">${product.price}</p>
                    <p class="seller-info">👤 Created by ${product.seller}</p>
                    <p class="rating-info">⭐ ${product.rating} rating</p>
                    <div class="product-description">
                        <p>${product.description}</p>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-primary" onclick="addToCart('${product.id}')">🛒 Add to Cart</button>
                        <button class="btn-secondary" onclick="contactSeller('${product.seller}')">💬 Message ${product.seller}</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
}

// Close modal function
function closeModal() {
    const modal = document.querySelector('.product-modal');
    if (modal) modal.remove();
}

// Add to cart function
function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;

    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`${product.name} quantity updated! 🛒`);
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
        showNotification(`${product.name} added to cart! 🛒`);
    }
    
    updateCartBadge();
    closeModal();
}

// Remove from cart function
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateCartBadge();
    showNotification('Item removed from cart! 🗑️');
}

// Update cart quantity
function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
            updateCartBadge();
        }
    }
}

// Update cart badge
function updateCartBadge() {
    const cartBadge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartBadge) {
        if (totalItems > 0) {
            cartBadge.textContent = totalItems;
            cartBadge.style.display = 'block';
        } else {
            cartBadge.style.display = 'none';
        }
    }
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        if (cartEmpty) cartEmpty.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
    } else {
        if (cartEmpty) cartEmpty.style.display = 'none';
        if (cartSummary) cartSummary.style.display = 'block';
        
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-seller">by ${item.seller}</div>
                    <div class="cart-item-price">${item.price}</div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button onclick="updateCartQuantity('${item.id}', -1)" class="quantity-btn">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button onclick="updateCartQuantity('${item.id}', 1)" class="quantity-btn">+</button>
                    </div>
                    <button onclick="removeFromCart('${item.id}')" class="remove-btn">🗑️</button>
                </div>
            </div>
        `).join('');
        
        updateCartSummary();
    }
}

// Update cart summary
function updateCartSummary() {
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    const subtotal = cart.reduce((sum, item) => {
        const price = parseInt(item.price.replace('৳', '').replace(',', ''));
        return sum + (price * item.quantity);
    }, 0);
    
    const delivery = 50;
    const total = subtotal + delivery;
    
    if (subtotalElement) subtotalElement.textContent = `৳${subtotal.toLocaleString()}`;
    if (totalElement) totalElement.textContent = `৳${total.toLocaleString()}`;
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty! 🛒');
        return;
    }
    
    const total = cart.reduce((sum, item) => {
        const price = parseInt(item.price.replace('৳', '').replace(',', ''));
        return sum + (price * item.quantity);
    }, 0) + 50; // Including delivery
    
    showCheckoutModal(total);
}

// Show checkout modal
function showCheckoutModal(total) {
    const modal = `
        <div class="product-modal" onclick="closeModal()">
            <div class="modal-content checkout-modal" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>Checkout</h2>
                    <span class="close-btn" onclick="closeModal()">&times;</span>
                </div>
                <div class="checkout-form">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" id="customerName" placeholder="Enter your full name">
                    </div>
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" id="customerPhone" placeholder="01XXXXXXXXX">
                    </div>
                    <div class="form-group">
                        <label>Delivery Address</label>
                        <textarea id="customerAddress" placeholder="Enter your complete address"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Payment Method</label>
                        <select id="paymentMethod">
                            <option value="cod">Cash on Delivery</option>
                            <option value="bkash">bKash</option>
                            <option value="nagad">Nagad</option>
                            <option value="rocket">Rocket</option>
                        </select>
                    </div>
                    <div class="order-summary">
                        <h3>Order Summary</h3>
                        <div class="summary-item">
                            <span>Items (${cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                            <span>৳${(total - 50).toLocaleString()}</span>
                        </div>
                        <div class="summary-item">
                            <span>Delivery Fee</span>
                            <span>৳50</span>
                        </div>
                        <div class="summary-item total-row">
                            <span>Total Amount</span>
                            <span>৳${total.toLocaleString()}</span>
                        </div>
                    </div>
                    <button class="place-order-btn" onclick="placeOrder(${total})">
                        Place Order 🚀
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
}

// Place order function
function placeOrder(total) {
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    const payment = document.getElementById('paymentMethod').value;
    
    if (!name || !phone || !address) {
        showNotification('Please fill in all required fields! ⚠️');
        return;
    }
    
    // Simulate order placement
    closeModal();
    showSuccessModal(total);
    
    // Clear cart after successful order
    cart = [];
    updateCartDisplay();
    updateCartBadge();
}

// Show success modal
function showSuccessModal(total) {
    const modal = `
        <div class="product-modal" onclick="closeModal()">
            <div class="modal-content success-modal" onclick="event.stopPropagation()">
                <div class="success-icon">✅</div>
                <h2>Order Placed Successfully!</h2>
                <p>Thank you for supporting local artisans!</p>
                <div class="order-details">
                    <p><strong>Order Amount:</strong> ৳${total.toLocaleString()}</p>
                    <p><strong>Order ID:</strong> #KBD${Date.now().toString().slice(-6)}</p>
                    <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
                </div>
                <div class="success-actions">
                    <button class="btn-primary" onclick="closeModal(); showScreen('home');">Continue Shopping</button>
                    <button class="btn-secondary" onclick="closeModal(); showScreen('profile');">Track Order</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
}

// Contact seller function
function contactSeller(sellerName) {
    showNotification(`Opening chat with ${sellerName}... 💬`);
    closeModal();
}

// Show notification function
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}