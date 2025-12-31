export const getProtected = (req, res) => {
    res.status(200).json({
        message: 'You have accessed a protected route',
        user: req.user
    }
    );
}