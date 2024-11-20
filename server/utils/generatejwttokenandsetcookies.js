import jwt from 'jsonwebtoken'

export const GenerateJwtTokenAndSetCookies  = (res, employeeid, role) =>{
    const token = jwt.sign({ employeeid, role }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("token", token, {
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none", 
    })

    return token
}