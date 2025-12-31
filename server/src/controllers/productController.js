export const createProduct = (req, res)=>{
    res.status(201).json({
        message: 'Product created successfully',
        seller: req.user._id
    })
}

export const updateProduct = (req, res)=>{
    res.json({
        message: 'Product updated successfully'
    })
}

export const deleteProduct = (req, res)=>{
    res.json({
        message: 'Product deleted successfully'
    })
}

export const product = (req, res)=>{
    res.json({
        products: []
    })
}

export const productId = (req, res)=>{
    res.json({
        productId: req.params.id
    })
}