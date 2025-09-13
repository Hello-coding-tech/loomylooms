// Demo: Save orders to localStorage. For production, use GitHub API to save as issues.
function saveOrder(order) {
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

function loadOrders() {
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const ordersUl = document.getElementById('ordersUl');
    if (!ordersUl) return;
    ordersUl.innerHTML = '';
    if (orders.length === 0) {
        ordersUl.innerHTML = '<li>No orders submitted yet.</li>';
        return;
    }
    orders.forEach((order, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${order.product}</strong> by ${order.name} (${order.email}):<br>${order.details}`;
        ordersUl.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('orderForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const order = {
                name: form.name.value,
                email: form.email.value,
                product: form.product.value,
                details: form.details.value
            };
            saveOrder(order);
            form.reset();
            document.getElementById('successMsg').style.display = 'block';
            setTimeout(() => {
                document.getElementById('successMsg').style.display = 'none';
            }, 2500);
        });
    }
});