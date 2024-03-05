import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId ,res)=>{
    const token = jwt.sign({userId},"MANAV13012005",{
        expiresIn: '15d',
    })
    res.cookie("jwt",token,{
        maxAge :15 * 24 * 60 * 60 * 1000,
        httpOnly : true,
        SameSite : "strict"
    })
}
export default generateTokenAndSetCookie;