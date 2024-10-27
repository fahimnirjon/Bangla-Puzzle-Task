let cart = [];

// Function to calculate total revenue
function calculateTotalRevenue() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Function to add item to cart
function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...item, quantity: 1});
    }
    updateCart();
}

// Function to update cart UI
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'flex justify-between items-center py-2 border-b';
        cartItemDiv.innerHTML = `
            <span>${item.name} ($${item.price})</span>
            <div class="flex items-center">
                <button onclick="adjustQuantity('${item.id}', -1)">-</button>
                <span class="mx-4 font-semibold">${item.quantity}</span>
                <button onclick="adjustQuantity('${item.id}', 1)">+</button>
                <button onclick="removeFromCart('${item.id}')" class="text-red-500 ml-2 text-xl font-semibold">X</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    document.getElementById('cart-button').innerText = `Cart (${cart.length})`;
    updateTotalRevenue();
}

// Function to update total revenue in the UI
function updateTotalRevenue() {
    const totalRevenue = calculateTotalRevenue();
    document.getElementById('revenue-amount').innerText = totalRevenue.toFixed(2);
}

// Function to adjust quantity
function adjustQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        }
        updateCart();
    }
}

// Function to remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Event listener for Add to Cart buttons
document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        const itemCard = button.parentElement;
        const item = {
            id: `item${index + 1}`, 
            name: itemCard.querySelector('h3').innerText,
            price: parseFloat(itemCard.querySelector('p').innerText.replace('$', ''))
        };
        
        addToCart(item);
        button.disabled = true; 
        button.classList.remove('bg-green-500');
        button.classList.add('bg-gray-500', 'cursor-not-allowed')

    });
});



// Event listeners for sidebar
document.getElementById('cart-button').addEventListener('click', () => {
    document.getElementById('cart-sidebar').style.transform = 'translateX(0)';
});

document.getElementById('close-sidebar').addEventListener('click', () => {
    document.getElementById('cart-sidebar').style.transform = 'translateX(100%)';
});
