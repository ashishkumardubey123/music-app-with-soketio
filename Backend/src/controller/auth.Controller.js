import express from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import db from "../config/dbconfig.js";
import {sendeamil} from "../services/mail.service.js"
import usermodel from "../model/user.model.js"


// eamil html template----------

const welcomeEmailHTML = (userName) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Perplexity</title>
</head>
<body style="margin: 0; padding: 0; background-color: #05070d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #c9d1d9;">

    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 40px auto; background: linear-gradient(180deg, #161b22 0%, #0d1117 100%); border-radius: 16px; border: 1px solid #2a3038; box-shadow: 0 0 0 1px rgba(88,166,255,0.08), 0 20px 40px rgba(0,0,0,0.5); overflow: hidden;">

        <!-- Top accent bar -->
        <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #58a6ff 0%, #a371f7 50%, #58a6ff 100%);"></td>
        </tr>

        <!-- Header -->
        <tr>
            <td align="center" style="padding: 44px 20px 24px 20px; border-bottom: 1px solid #21262d; background-image: radial-gradient(circle at 50% 0%, rgba(88,166,255,0.08), transparent 70%);">
                <div style="display: inline-block; padding: 6px 14px; border: 1px solid #30363d; border-radius: 20px; background-color: rgba(88,166,255,0.08); margin-bottom: 18px;">
                    <span style="font-size: 11px; letter-spacing: 1.5px; color: #58a6ff; font-family: 'Courier New', monospace; text-transform: uppercase;">● System Online</span>
                </div>
                <h1 style="color: #ffffff; margin: 0; font-size: 30px; font-weight: 700; letter-spacing: -0.5px;">
                    Perplexity
                </h1>
                <p style="color: #8b949e; font-size: 13px; margin-top: 10px; letter-spacing: 2px; text-transform: uppercase; font-family: 'Courier New', monospace;">
                    Knowledge at the Speed of Thought
                </p>
            </td>
        </tr>

        <!-- Body -->
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="margin-top: 0; font-size: 24px; color: #ffffff; font-weight: 600;">
                    Welcome aboard, ${userName}. <span style="color:#58a6ff;">⚡</span>
                </h2>

                <p style="font-size: 16px; line-height: 1.7; color: #c9d1d9;">
                    Your account has been successfully initialized. You now have direct access to an AI engine built to search, reason, and answer — in real time.
                </p>

                <p style="font-size: 16px; line-height: 1.7; color: #c9d1d9; margin-bottom: 32px;">
                    No more endless scrolling through links. Ask a question, and get a precise, sourced, up-to-date answer — instantly.
                </p>

                <!-- Feature Highlights -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 36px; border-collapse: separate; border-spacing: 0 10px;">
                    <tr>
                        <td style="padding: 16px 18px; background-color: #0d1117; border: 1px solid #21262d; border-left: 3px solid #58a6ff; border-radius: 8px;">
                            <span style="color: #58a6ff; font-weight: 700; font-family: 'Courier New', monospace;">&gt; ask_anything()</span><br/>
                            <span style="color: #8b949e; font-size: 14px;">Get instant, AI-generated answers with cited sources.</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 16px 18px; background-color: #0d1117; border: 1px solid #21262d; border-left: 3px solid #a371f7; border-radius: 8px;">
                            <span style="color: #a371f7; font-weight: 700; font-family: 'Courier New', monospace;">&gt; stay_updated()</span><br/>
                            <span style="color: #8b949e; font-size: 14px;">Real-time information, always current, always verified.</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 16px 18px; background-color: #0d1117; border: 1px solid #21262d; border-left: 3px solid #3fb950; border-radius: 8px;">
                            <span style="color: #3fb950; font-weight: 700; font-family: 'Courier New', monospace;">&gt; go_deeper()</span><br/>
                            <span style="color: #8b949e; font-size: 14px;">Follow up, refine, and explore any topic in depth.</span>
                        </td>
                    </tr>
                </table>

                <!-- CTA -->
                <div style="text-align: center;">
                    <a href="https://perplexity.ai" style="background: linear-gradient(90deg, #238636 0%, #2ea043 100%); color: #ffffff; text-decoration: none; padding: 15px 36px; font-size: 16px; font-weight: 600; border-radius: 8px; display: inline-block; border: 1px solid rgba(240, 246, 252, 0.1); box-shadow: 0 4px 16px rgba(35, 134, 54, 0.35);">
                        Ask Your First Question →
                    </a>
                </div>
            </td>
        </tr>

        <!-- Footer -->
        <tr>
            <td align="center" style="background-color: #0a0d12; padding: 28px 20px; border-top: 1px solid #21262d;">
                <p style="font-size: 12px; color: #6e7681; margin: 0; font-family: 'Courier New', monospace;">
                    This is an automated message — please do not reply directly.
                </p>
                <p style="font-size: 12px; color: #6e7681; margin: 10px 0 0 0;">
                    &copy; ${new Date().getFullYear()} Perplexity. All systems operational.
                </p>
            </td>
        </tr>

    </table>

</body>
</html>
`;




export const userregister = async (req, res) => {

    const { username, email, password } = req.validatedData;

 const isuser = await usermodel.findOne({
            $or:[ { username: req.body.username }, { email: req.body.email } ]})
      if (isuser) {
            return res.status(400).json({ 
                  
                  success: false,
                  message: "user already exists",
                  err: "username or email already exists"
            })
      }

      const hashpassword = await bcrypt.hash(password, 10)

      const user = await usermodel.create({
            username,
            email,
            password: hashpassword,
      })

      const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: "1d" })

      res.cookie("token", token, {
            httpOnly: true,
            secure: false,    
            maxAge: 24 * 60 * 60 * 1000
      });

      

await sendeamil({
    to: email, // Receiver's email
    subject: "Welcome to Our Platform! 🎉",
    html: welcomeEmailHTML(username) 
});


      return res.status(201).json({
            message: "user registered successfully",
            username,
            email,
            token
      })


}

export const userlogin = async (req,res) => {
       const {email, password}  = req.body
        
       if(!email || !password){
            return res.status(400).json({message: "All fields are required"})
       }
       const user = await usermodel.findOne({email})

       if(!user){
            return res.status(400).json({message: "user does not exists"})
       }
       const ismatch = bcrypt.compare(password, user.password)

       if(!ismatch){
            return res.status(400).json({message: "Invalid credentials"})
       }

     const token = jwt.sign({
      id: user.id,
      email: user.email,},process.env.JWT_SECRET,  {expiresIn: "1d"})
      
      res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
      });

      return res.status(201).json({
            message: "user logged in successfully",
            username: user.username,
            email: user.email,
            token
      })

        
}

export const logout = async (req,res) => {
      res.clearCookie("token")
      return res.status(200).json({message: "user logged out successfully"})
}
