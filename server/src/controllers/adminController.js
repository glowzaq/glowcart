export const adminDashboard = (req, res)=>{
    res.json({
        message: 'Admin Dashboard'
    })
}

export const adminAllUsers = (req, res)=>{
    res.json({
        users: []
    })
}