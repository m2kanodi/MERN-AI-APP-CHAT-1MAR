import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async(req , res) =>{
    console.log(req.body);
    try{
        const{fullName,username,password,comfirmPassword,gender} = req.body;
        console.log(req.body);
        if(password !== comfirmPassword){
            return res.status(400).json({error :"Passwords dont match"})
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error: "Username already exists"})
        }
        //Hash password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //https://avatar-placeholder.iran.liara.run
        const boyProfilePic =`https://avatar.iran.liara.run/public/boy?username= ${username}`
        const girlProfilePic =`https://avatar.iran.liara.run/public/girl?username= ${username}`
        const newUser = new User({
            fullName,
            username,
            password :hashedPassword,
            gender,
            profilePic : gender === "male"? boyProfilePic :girlProfilePic
        });
        if(newUser){
            await generateTokenAndSetCookie(newUser._id,res);
        await newUser.save();
        res.status(201).json({
            _id: newUser.id,
            fullName :newUser.fullName,
            username :newUser.username,
            profilePic :newUser.profilePic

        
        })
    }
}catch(error){
        console.log("error in signup controller",error.message)
        res.status(500).json({error : "internal server error"
        })


    }
}
export const login = async(req , res) =>{
    try{
        const {username , password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"invalid  username or password"});

        }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
    });
    }catch(error){
        console.log("Error in login controller",error.message);
        res.status(500).json({error : "internal server error"});
    }
    

}
export const logout = (req , res) =>{
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};