const order = require('./src/order.js');

exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: await order.orderPizza(),
    };
    return response;
};