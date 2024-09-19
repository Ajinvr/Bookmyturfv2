import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { manager } from '../../db/models/managerModel.js';


const salt = 10;

const tokengenerate = ( email, id, role) => {
  const token =jwt.sign({email, id , role}, process.env.jWTKEY);
  return token;
};


const signupValidators = [
  body('email').isEmail().withMessage('Enter a valid email address').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').trim(),
];


// signup ====
export const managerSignup = async (req, res) => {
      
       await Promise.all(signupValidators.map(validator => validator.run(req)));
       const errors = validationResult(req);

       if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

       const {email, password } = req.body;
             
       try {
             let isExistingUser = await manager.findOne({ email });
            
             if (isExistingUser != null) return res.status(409).json({ msg: "Manager already exists", ts: "error" });

             const hashedPassword = await bcrypt.hash(password, salt);
             let newUser = await manager.create({email, password: hashedPassword });
   
             let id = newUser._id;
             let role = newUser.role
             
             let token = tokengenerate( email, id,role);

             res.cookie("token", token, {
              sameSite: "None",
              secure: true,
              httpOnly: true,
             });

        res.status(201).json({ msg: 'Sign up successful', ts: "success", email, id, role });
      } catch (error) {
        console.log(error);
        
        res.status(500).json({ msg: 'Server error try again', ts: "error" });
      }
};



const loginValidators = [
  body('email').isEmail().withMessage('Enter a valid email address').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required').trim(),
];


// login ====
export const managerLogin = async (req, res) => {
      await Promise.all(loginValidators.map(validator => validator.run(req)));
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { email, password } = req.body;
  
      try {
           let existingUser = await manager.findOne({ email });
           if (existingUser == null) return res.status(401).json({ msg: "Manager doesn't exist", ts: "error" });

           const isMatch = await bcrypt.compare(password, existingUser.password);
           if (!isMatch) return res.status(401).json({ msg: "Invalid credentials", ts: "error" });

          
           let id = existingUser._id;
           let role = existingUser.role
           let token = tokengenerate( email, id, role);

           res.cookie("token", token, {
            sameSite: "None",
            secure: true,
            httpOnly: true,
           });

    return res.status(200).json({ msg: 'Login successful', ts: "success", email, id , role});
  } catch (error) {
    return res.status(500).json({ msg: "Server error try again", ts: "error" });
  }
};


// manger check
export const mangerCheck = async(req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({  isAuthenticated: false, msg: "User not authenticated", ts: "error" });
    }

    const tokenVerified = jwt.verify(token, process.env.jWTKEY);

    

    if (!tokenVerified || (tokenVerified.role !== 'manager' && tokenVerified.role !== 'admin')) {
      return res.status(400).json({ isAuthenticated: false, msg: "User not authenticated or insufficient privileges", ts: "error" });
    }

    return res.status(200).json({ isAuthenticated: true, msg: "User authenticated", ts: "success" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ isAuthenticated: false, msg: "Internal server error", ts: "error" });
  }
}


// manger check
export const AdminCheck = async(req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({  isAuthenticated: false, msg: "User not authenticated", ts: "error" });
    }

    const tokenVerified = jwt.verify(token, process.env.jWTKEY);

    

    if (!tokenVerified || tokenVerified.role !== 'admin') {
      return res.status(400).json({ isAuthenticated: false, msg: "User not authenticated or insufficient privileges", ts: "error" });
    }

    return res.status(200).json({ isAuthenticated: true, msg: "User authenticated", ts: "success" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ isAuthenticated: false, msg: "Internal server error", ts: "error" });
  }
}
