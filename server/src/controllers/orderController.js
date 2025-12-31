export const placeOrder = (req, res)=>{
    res.status(201).json({
        message: 'Order placed successfully',
        customer: req.user._id
    })
}

export const myOrders = (req, res)=>{
    res.json({
        orders: []
    })
}