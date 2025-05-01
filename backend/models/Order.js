// Simple in-memory store for orders
const orders = [];

module.exports = {
    // Add a new order to the store
    addOrder: (orderData) => {
        // Ensure that the orderData has the necessary fields
        if (!orderData.transactionId) {
            console.error("Order data must include a transactionId.");
            return;
        }
        orders.push(orderData);
    },

    // Get an order by transaction ID
    getOrderByTransactionId: (transactionId) => {
        const order = orders.find(order => order.transactionId === transactionId);
        if (!order) {
            console.error(`Order with transactionId ${transactionId} not found.`);
            return null;
        }
        return order;
    },

    // Update the status of an order by transaction ID
    updateOrderStatus: (transactionId, status) => {
        const order = orders.find(order => order.transactionId === transactionId);
        if (order) {
            order.paymentStatus = status;
        } else {
            console.error(`Order with transactionId ${transactionId} not found.`);
        }
    },

    // Get all orders in the store
    getAllOrders: () => {
        if (orders.length === 0) {
            console.log("No orders found.");
            return [];
        }
        return orders;
    }
};
