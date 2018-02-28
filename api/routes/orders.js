const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'List of Orders'
    })
});

router.post('/', (req, res, next) => {
    const order = {
        productId : req.body.id,
        quantity : req.body.quantity
    }
    res.status(201).json({
        message : 'Orders was created',
        order : order
    })
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message : 'Order details',
        OrderId : req.params.orderId
    })
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message : 'Order deleted',
        OrderId : req.params.orderId
    })
});

module.exports = router;