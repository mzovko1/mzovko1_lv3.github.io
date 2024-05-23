document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.querySelector('.cart-button');
    const cartBadge = document.querySelector('.cart-badge');
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.close');
    const buyButton = document.querySelector('.buy-btn');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const itemsGrid = document.querySelector('.items-grid');

    let items = [
        {
            id: 1,
            name: 'Mascara',
            price: 12.30,
            imageURL: 'images/mascara.jpg'
        },
        {
            id: 2,
            name: 'Eyeshadow Palette',
            price: 11.49,
            imageURL: 'images/eyeshadow.jpg'
        },
        {
            id: 3,
            name: 'Foundation',
            price: 5.03,
            imageURL: 'images/foundation.jpg'
        },
        {
            id: 4,
            name: 'Perfume',
            price: 51.49,
            imageURL: 'images/perfume.jpg'
        },
        {
            id: 5,
            name: 'Lipstick',
            price: 8.20,
            imageURL: 'images/lipstick.jpg'
        },
        {
            id: 6,
            name: 'Shampoo',
            price: 11.49,
            imageURL: 'images/shampoo.jpg'
        },
    ];

    let cart = [];

    function fillItemsGrid() {
        for (const item of items) {
            let itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <img src="${item.imageURL}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p>$${item.price}</p>
                <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
            `;
            itemsGrid.appendChild(itemElement);
        }

        
        cartButton.addEventListener('click', toggleModal);


        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const itemId = parseInt(button.getAttribute('data-id'));
                addToCart(itemId);
            });
        });
    }

    fillItemsGrid();

    buyButton.addEventListener('click', checkout);

    modalClose.addEventListener('click', toggleModal);
    const filterButton = document.getElementById('filterButton');
    filterButton.addEventListener('click', applyFilter);

    function applyFilter() {
        const minPrice = parseFloat(document.getElementById('filterMinPrice').value);
        const maxPrice = parseFloat(document.getElementById('filterMaxPrice').value);

        const filteredItems = items.filter(item => {
            return item.price >= minPrice && item.price <= maxPrice;
        });

        itemsGrid.innerHTML = '';
        for (const item of filteredItems) {
            let itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <img src="${item.imageURL}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p>$${item.price}</p>
                <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
            `;
            itemsGrid.appendChild(itemElement);
        }

        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const itemId = parseInt(button.getAttribute('data-id'));
                addToCart(itemId);
            });
        });
    }

    function toggleModal() {
        modal.classList.toggle('show-modal');
    }

    function addToCart(itemId) {
        const itemToAdd = items.find(item => item.id === itemId);
        if (itemToAdd) {
            cart.push(itemToAdd);
            updateCart();
        }
    }

    function updateCart() {
        cartItemsList.innerHTML = '';
        let totalPrice = 0;
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsList.appendChild(listItem);
            totalPrice += item.price;
        });
        cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
        cartBadge.textContent = cart.length;
    }

    function checkout() {
        let totalPrice = cart.reduce((total, item) => total + item.price, 0);

        const walletAmount = parseFloat(document.getElementById('walletAmount').textContent);
        if (totalPrice <= walletAmount) {
            document.getElementById('walletAmount').textContent = (walletAmount - totalPrice).toFixed(2);

            cart = [];
            updateCart();

            document.getElementById('message').textContent = 'Checkout successful!';
        } else {
            document.getElementById('message').textContent = 'Insufficient funds!';
        }
    }
});
