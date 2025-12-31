export const getSellerDashboard = (req, res)=>{
    res.json({
        message: 'Seller Dashboard',
        seller: req.user
    })
}

export const getSellerOrder = (req, res)=>{
    res.json({
        message: 'Seller orders',
        sellerId: req.user._id,
        orders: []
    })
}