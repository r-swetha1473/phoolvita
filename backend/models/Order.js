// models/Order.js

const orders = [];

module.exports = {
    addOrder: (orderData) => {
        if (!orderData.transactionId) {
            console.error("Order data must include a transactionId.");
            return;
        }
        orders.push(orderData);
    },

    getOrderByTransactionId: (transactionId) => {
        return orders.find(order => order.transactionId === transactionId) || null;
    },

    getOrderByTempId: (tempId) => {
        return orders.find(order => order.tempId === tempId) || null;
    },

    updateOrderStatus: (transactionId, status) => {
        const order = orders.find(order => order.transactionId === transactionId);
        if (order) {
            order.paymentStatus = status;
        } else {
            console.error(`Order with transactionId ${transactionId} not found.`);
        }
    },

    getAllOrders: () => {
        return orders;
    }
};
