const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/orders');
router.get('/', (req, res, next) => {
    Order.find()
    .select('product quantity _id')
    .exec()
    .then(docs => {
        if (docs.length === 0){
            res.status(200).json({
                message : 'No Order in database',
            })
        }else{
            res.status(200).json({
                count: docs.length,
                orders : docs,
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })
});

router.post('/', (req, res, next) => {
    const order = new Order({
        _id : mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    })
    order
    .save()
    .then(result => {
        res.status(201).json({
            message : 'Orders was created',
            order : order
        })
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.find({_id : id}).select('quantity _id product').exec()
    .then(result => {
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })
});

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.remove({_id : id}).exec()
    .then(result => {
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error : err
        })
    })
});

module.exports = router;