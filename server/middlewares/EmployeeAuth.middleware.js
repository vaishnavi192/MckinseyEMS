import jwt from 'jsonwebtoken'

export const VerifyEmployeeToken = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized access", gologin : true })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            res.clearCookie("token")
            return res.status(403).json({ success: false, message: "unauthenticated employee" })
        }
        req.employeeid = decoded.employeeid
        next()
    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error", error: error })
    }
}