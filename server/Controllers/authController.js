import User from "../Model/user.js";
import jwt from 'jsonwebtoken'
export const signup = async (req, res) => {
    const { name, email, password } = req.body
    console.log(name, email, password);
    try {
        const newUser = new User({ name, email, password });

        await newUser.save();

        res.status(201).json({
            message: 'User signed up successfully',
            success: true,
            user: { id: newUser._id, name: newUser.name, email: newUser.email } 
        });
    } catch (err) {
        console.log('error while signup', err)
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Email already in use' });
          }
        res.status(500)
    }
}

export const login = async(req, res)=>{
    const {email, password} = req.body;
    try {
        console.log('coming here 1');
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        console.log('coming here 2');

        const isMatch = password == user.password;
        console.log('coming here 3');

        
        console.log('coming here');
        res.status(200).json({success:true, email})


    } catch (error) {
        res.status(500)
    }
}


