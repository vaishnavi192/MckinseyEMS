import jwt from 'jsonwebtoken'

export const VerifyEmployeeToken = (req, res, next) => {
    // Check for token in cookies first, then in Authorization header
    let token = req.cookies.EMtoken
    
    if (!token) {
        // Check Authorization header for Bearer token
        const authHeader = req.headers.authorization
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7) // Remove 'Bearer ' prefix
        }
    }
    
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized access", gologin : true })
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) 
        if (!decoded) {
            res.clearCookie("EMtoken")  
            return res.status(403).json({ success: false, message: "unauthenticated employee", gologin : true }) 
        }
        req.EMid = decoded.EMid
        req.EMrole = decoded.EMrole 
        req.ORGID = decoded.ORGID
        next()
    } catch (error) {
        console.error('Token verification error:', error)
        return res.status(500).json({ success: false, message: "internal server error", error: error.message }) 
    }
}

export const VerifyhHRToken = (req, res, next) => {
    const token = req.cookies.HRtoken
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized access", gologin : true }) 
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) 
        if (!decoded) {
            res.clearCookie("HRtoken")
            return res.status(403).json({ success: false, message: "unauthenticated employee", gologin : true })
        }
        req.HRid = decoded.HRid
        req.ORGID = decoded.ORGID
        req.Role = decoded.HRrole
        next()
    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error", error: error }) 
    }
}