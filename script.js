// Food data
const foodData = [
    {
        id: 1,
        name: "Margherita Pizza",
        price: 199,
        category: "pizza",
        image: "img/food/p1.jpg",
        description: "Classic pizza with tomato sauce, mozzarella, and basil"
    },
    {
        id: 2,
        name: "Pepperoni Pizza",
        price: 249,
        category: "pizza",
        image: "img/category/pizza.jpg",
        description: "Pizza topped with pepperoni and mozzarella cheese"
    },
    {
        id: 3,
        name: "Cheeseburger",
        price: 149,
        category: "burger",
        image: "img/food/b1.jpg",
        description: "Juicy beef burger with cheese, lettuce, and tomato"
    },
    {
        id: 4,
        name: "Chicken Burger",
        price: 169,
        category: "burger",
        image: "img/category/burger.jpg",
        description: "Grilled chicken breast with special sauce"
    },
    {
        id: 5,
        name: "Club Sandwich",
        price: 139,
        category: "sandwich",
        image: "img/food/s1.jpg",
        description: "Triple-decker sandwich with turkey, bacon, and vegetables"
    },
    {
        id: 6,
        name: "Veggie Sandwich",
        price: 119,
        category: "sandwich",
        image: "img/category/sandwich.jpg",
        description: "Fresh vegetables with hummus and sprouts"
    },
    {
    id: 7,
    name: "Paneer Tikka Pizza",
    price: 229,
    category: "pizza",
    image: "img/food/p2.jpg",
    description: "Delicious pizza topped with spicy paneer cubes and veggies"
},
{
    id: 8,
    name: "Veggie Burger",
    price: 159,
    category: "burger",
    image: "img/food/b2.jpg",
    description: "Crispy veggie patty with lettuce, tomato, and special sauce"
},
{
    id: 9,
    name: "Grilled Chicken Sandwich",
    price: 179,
    category: "sandwich",
    image: "img/food/s2.jpg",
    description: "Tender grilled chicken with fresh veggies and mayo"
},
{
    id: 10,
    name: "Mushroom Swiss Burger",
    price: 199,
    category: "burger",
    image: "img/food/b3.jpg",
    description: "Juicy beef burger topped with mushrooms and Swiss cheese"
},
{
    id: 11,
    name: "Chicken Club Sandwich",
    price: 189,
    category: "sandwich",
    image: "img/food/s3.jpg",
    description: "Triple-decker sandwich with chicken, bacon, and cheese"
},
{
    id: 12,
    name: "BBQ Chicken Pizza",
    price: 269,
    category: "pizza",
    image: "img/food/p3.jpg",
    description: "Pizza topped with smoky BBQ chicken, onions, and cheese"
},
{
    id: 13,
    name: "Cheese Veggie Burger",
    price: 169,
    category: "burger",
    image: "img/food/b4.jpg",
    description: "Veggie patty with double cheese, lettuce, tomato, and sauce"
},
{
    id: 14,
    name: "Tuna Sandwich",
    price: 149,
    category: "sandwich",
    image: "img/food/s4.jpg",
    description: "Fresh tuna with lettuce, tomato, and mayo in a toasted sandwich"
},
{
    id: 15,
    name: "Spicy Paneer Burger",
    price: 179,
    category: "burger",
    image: "img/food/b5.jpg",
    description: "Paneer patty with spicy sauce, lettuce, and tomato"
},
{
    id: 16,
    name: "Grilled Veggie Sandwich",
    price: 139,
    category: "sandwich",
    image: "img/food/s5.jpg",
    description: "Grilled bell peppers, zucchini, and hummus in toasted bread"
},
{
    id: 17,
    name: "French Fries",
    price: 99,
    category: "snack",
    image: "img/food/f1.jpg",
    description: "Crispy golden french fries served with ketchup and mayonnaise"
},
{
    id: 18,
    name: "Chicken Nuggets",
    price: 149,
    category: "snack",
    image: "img/food/f2.jpg",
    description: "Crispy chicken nuggets served with dipping sauce"
}



];

// Cart array
let cart = [];

// DOM Elements
const cartLink = document.getElementById('cartLink');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const featuredFoods = document.getElementById('featuredFoods');
const checkoutBtn = document.getElementById('checkoutBtn');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromLocalStorage();
    displayFeaturedFoods();
    updateCartUI();
    
    if (cartLink) {
        cartLink.addEventListener('click', function(e) {
            e.preventDefault();
            openCart();
        });
    }
    closeCart.addEventListener('click', closeCartModal);
    checkoutBtn.addEventListener('click', checkout);
    
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            closeCartModal();
        }
    });
});

// Display featured foods
function displayFeaturedFoods() {
    featuredFoods.innerHTML = '';
    
    const featuredItems = foodData.slice(0, 18);
    
    featuredItems.forEach(food => {
        const foodCard = document.createElement('div');
        foodCard.className = 'food-card';
        foodCard.innerHTML = `
            <img src="${food.image}" alt="${food.name}">
            <div class="food-info">
                <h3>${food.name}</h3>
                <p>${food.description}</p>
                <span class="price">₹${food.price.toFixed(2)}</span>
                <button class="add-to-cart" data-id="${food.id}">Add to Cart</button>
            </div>
        `;
        featuredFoods.appendChild(foodCard);
    });
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const foodId = parseInt(this.getAttribute('data-id'));
            addToCart(foodId);
        });
    });
}

// Add item to cart
function addToCart(foodId) {
    const food = foodData.find(item => item.id === foodId);
    
    if (food) {
        const existingItem = cart.find(item => item.id === foodId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: food.id,
                name: food.name,
                price: food.price,
                image: food.image,
                quantity: 1
            });
        }
        
        saveCartToLocalStorage();
        updateCartUI();
        
        alert(`${food.name} added to cart!`);
    }
}

// Remove item from cart
function removeFromCart(foodId) {
    cart = cart.filter(item => item.id !== foodId);
    saveCartToLocalStorage();
    updateCartUI();
}

// Update item quantity
function updateQuantity(foodId, change) {
    const item = cart.find(item => item.id === foodId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(foodId);
        } else {
            saveCartToLocalStorage();
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                <p class="item-price">₹${item.price.toFixed(2)} each</p>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <p class="item-total">₹${itemTotal.toFixed(2)}</p>
            <button class="remove-item" data-id="${item.id}">×</button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(2);
    
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', function() {
            const foodId = parseInt(this.getAttribute('data-id'));
            updateQuantity(foodId, -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', function() {
            const foodId = parseInt(this.getAttribute('data-id'));
            updateQuantity(foodId, 1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const foodId = parseInt(this.getAttribute('data-id'));
            removeFromCart(foodId);
        });
    });
}

// Open cart modal
function openCart() {
    cartModal.style.display = 'flex';
}

// Close cart modal
function closeCartModal() {
    cartModal.style.display = 'none';
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const order = {
        items: [...cart],
        total: parseFloat(cartTotal.textContent),
        timestamp: new Date().toISOString()
    };
    
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    generateBillPreview(order);
    
    cart = [];
    saveCartToLocalStorage();
    updateCartUI();
    closeCartModal();
}

// Generate bill preview
function generateBillPreview(order) {
    let billContent = `
=====================================
          FOODIE'S FOOD'
      ORDER RECEIPT & BILL
=====================================

Date: ${new Date(order.timestamp).toLocaleString()}

Items:
-------------------------------------
`;
    
    order.items.forEach(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        billContent += `${item.name}
  Price: ₹${item.price.toFixed(2)} x ${item.quantity} = ₹${itemTotal}
-------------------------------------
`;
    });
    
    billContent += ` Total Amount: ₹${order.total.toFixed(2)}

=====================================
    Thank you for your order!
  Visit us again at Foodie's Food'
=====================================
`;
    
    showBillPreview(billContent, order);
}

// Show bill preview modal
function showBillPreview(billContent, order) {
    let billModal = document.getElementById('billModal');
    if (!billModal) {
        billModal = document.createElement('div');
        billModal.id = 'billModal';
        billModal.className = 'cart-modal';
        billModal.innerHTML = `
            <div class="cart-content" style="width: 90%; max-width: 700px;">
                <div class="cart-header">
                    <h2>Order Bill Preview</h2>
                    <span class="close-btn" id="closeBill">&times;</span>
                </div>
                <div class="cart-body" style="padding: 20px;">
                    <div id="billPreview" style="white-space: pre-wrap; font-family: monospace; background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; max-height: 400px; overflow-y: auto;">
                    </div>
                    <div class="cart-footer" style="display: flex; gap: 10px; justify-content: center;">
                        <button class="btn-primary" id="downloadTxt" style="background: #28a745;">Download as TXT</button>
                        <button class="btn-primary" id="downloadPdf" style="background: #dc3545;">Download as PDF</button>
                        <button class="btn-primary" id="closeBillBtn">Close</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(billModal);
        
        document.getElementById('closeBill').addEventListener('click', () => {
            billModal.style.display = 'none';
        });
        
        document.getElementById('closeBillBtn').addEventListener('click', () => {
            billModal.style.display = 'none';
        });
        
        document.getElementById('downloadTxt').addEventListener('click', () => {
            downloadBillAsTxt(billContent, order);
        });
        
        document.getElementById('downloadPdf').addEventListener('click', () => {
            downloadBillAsPdf(billContent, order);
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === billModal) {
                billModal.style.display = 'none';
            }
        });
    }
    
    document.getElementById('billPreview').textContent = billContent;
    billModal.style.display = 'flex';
}

// Download bill as TXT
function downloadBillAsTxt(billContent, order) {
    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `foodie's-food't-bill-${new Date(order.timestamp).getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Download bill as PDF
function downloadBillAsPdf(billContent, order) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Foodie Delight Bill</title>
            <style>
                body { font-family: monospace; margin: 20px; }
                pre { white-space: pre-wrap; }
            </style>
        </head>
        <body>
            <pre>${billContent}</pre>
            <script>
                window.onload = function() {
                    window.print();
                }
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Menu page functions
function displayMenuFoods(category = 'all') {
    const menuFoods = document.getElementById('menuFoods');
    if (!menuFoods) return;
    
    menuFoods.innerHTML = '';
    
    const filteredFoods = category === 'all' 
        ? foodData 
        : foodData.filter(food => food.category === category);
    
    filteredFoods.forEach(food => {
        const foodCard = document.createElement('div');
        foodCard.className = 'food-card';
        foodCard.innerHTML = `
            <img src="${food.image}" alt="${food.name}">
            <div class="food-info">
                <h3>${food.name}</h3>
                <p>${food.description}</p>
                <span class="price">₹${food.price.toFixed(2)}</span>
                <button class="add-to-cart" data-id="${food.id}">Add to Cart</button>
            </div>
        `;
        menuFoods.appendChild(foodCard);
    });
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const foodId = parseInt(this.getAttribute('data-id'));
            addToCart(foodId);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.menu-page')) {
        displayMenuFoods('all');
        setupFilterButtons();
    }
});
// ---------- FILTER BUTTON LOGIC ----------
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {

            // remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // add active class to clicked button
            this.classList.add('active');

            // get category from button
            const category = this.getAttribute('data-category');

            // show filtered food
            displayMenuFoods(category);
        });
    });
}

// ---------- DISPLAY MENU FOOD ----------
function displayMenuFoods(category = 'all') {
    const menuFoods = document.getElementById('menuFoods');
    if (!menuFoods) return;

    menuFoods.innerHTML = '';

    const filteredFoods =
        category === 'all'
            ? foodData
            : foodData.filter(food => food.category === category);

    filteredFoods.forEach(food => {
        const foodCard = document.createElement('div');
        foodCard.className = 'food-card';
        foodCard.innerHTML = `
            <img src="${food.image}" alt="${food.name}">
            <div class="food-info">
                <h3>${food.name}</h3>
                <p>${food.description}</p>
                <span class="price">₹${food.price}</span>
                <button class="add-to-cart" data-id="${food.id}">Add to Cart</button>
            </div>
        `;
        menuFoods.appendChild(foodCard);
    });

    // add to cart
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function () {
            addToCart(parseInt(this.dataset.id));
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.menu-page')) {
        displayMenuFoods('all');   // show all items
        setupFilterButtons();     // activate filter buttons
    }
});