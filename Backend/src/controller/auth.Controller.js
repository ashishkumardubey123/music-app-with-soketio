import express, { request } from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import db from "../config/dbconfig.js";
import {sendeamil} from "../services/mail.service.js"
import usermodel from "../model/user.model.js"
import userModel from '../model/user.model.js';


// eamil html template----------

const welcomeEmailHTML = (userName, emailvarificationtoken) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
</head>

<body style="
    margin: 0;
    padding: 0;
    background-color: #05070d;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color: #c9d1d9;
">

    <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        style="
            max-width: 600px;
            margin: 40px auto;
            background: linear-gradient(180deg, #161b22 0%, #0d1117 100%);
            border-radius: 16px;
            border: 1px solid #2a3038;
            box-shadow: 0 0 0 1px rgba(88,166,255,0.08), 0 20px 40px rgba(0,0,0,0.5);
            overflow: hidden;
        "
    >

        <!-- Top Accent Bar -->
        <tr>
            <td style="
                height: 4px;
                background: linear-gradient(
                    90deg,
                    #58a6ff 0%,
                    #a371f7 50%,
                    #58a6ff 100%
                );
            "></td>
        </tr>

        <!-- Header -->
        <tr>
            <td
                align="center"
                style="
                    padding: 44px 20px 28px 20px;
                    border-bottom: 1px solid #21262d;
                    background-image: radial-gradient(
                        circle at 50% 0%,
                        rgba(88,166,255,0.08),
                        transparent 70%
                    );
                "
            >

                <div style="
                    display: inline-block;
                    padding: 6px 14px;
                    border: 1px solid #30363d;
                    border-radius: 20px;
                    background-color: rgba(88,166,255,0.08);
                    margin-bottom: 18px;
                ">
                    <span style="
                        font-size: 11px;
                        letter-spacing: 1.5px;
                        color: #58a6ff;
                        font-family: 'Courier New', monospace;
                        text-transform: uppercase;
                    ">
                        ● System Online
                    </span>
                </div>

                <h1 style="
                    color: #ffffff;
                    margin: 0;
                    font-size: 30px;
                    font-weight: 700;
                    letter-spacing: -0.5px;
                ">
                    Perplexity
                </h1>

                <p style="
                    color: #8b949e;
                    font-size: 13px;
                    margin: 10px 0 0 0;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    font-family: 'Courier New', monospace;
                ">
                    Knowledge at the Speed of Thought
                </p>

            </td>
        </tr>

        <!-- Body -->
        <tr>
            <td style="padding: 40px 30px;">

                <h2 style="
                    margin-top: 0;
                    font-size: 24px;
                    color: #ffffff;
                    font-weight: 600;
                ">
                    Welcome aboard, ${userName}.
                    <span style="color:#58a6ff;">⚡</span>
                </h2>

                <p style="
                    font-size: 16px;
                    line-height: 1.7;
                    color: #c9d1d9;
                ">
                    Your account has been successfully created.
                    Before you can start using your account, please verify
                    your email address.
                </p>

                <p style="
                    font-size: 16px;
                    line-height: 1.7;
                    color: #c9d1d9;
                    margin-bottom: 32px;
                ">
                    Click the button below to verify your email address and
                    activate your account.
                </p>

                <!-- Verification Box -->
                <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="
                        margin-bottom: 32px;
                        background-color: #0d1117;
                        border: 1px solid #21262d;
                        border-left: 3px solid #58a6ff;
                        border-radius: 8px;
                    "
                >
                    <tr>
                        <td style="padding: 18px;">

                            <span style="
                                color: #58a6ff;
                                font-weight: 700;
                                font-family: 'Courier New', monospace;
                            ">
                                &gt; verify_email()
                            </span>

                            <br />

                            <span style="
                                color: #8b949e;
                                font-size: 14px;
                                line-height: 1.6;
                            ">
                                Verify your email address to securely activate
                                your account.
                            </span>

                        </td>
                    </tr>
                </table>

                <!-- CTA -->
                <div style="text-align: center;">

                    <a
                        href="http://localhost:3000/api/auth/verify-email?token=${emailvarificationtoken}"
                        style="
                            background: linear-gradient(
                                90deg,
                                #238636 0%,
                                #2ea043 100%
                            );
                            color: #ffffff;
                            text-decoration: none;
                            padding: 15px 36px;
                            font-size: 16px;
                            font-weight: 600;
                            border-radius: 8px;
                            display: inline-block;
                            border: 1px solid rgba(240, 246, 252, 0.1);
                            box-shadow: 0 4px 16px rgba(35, 134, 54, 0.35);
                        "
                    >
                        Please Verify This Email →
                    </a>

                </div>

                <!-- Fallback Link -->
                <p style="
                    margin-top: 30px;
                    font-size: 12px;
                    line-height: 1.6;
                    color: #6e7681;
                    text-align: center;
                ">
                    If the button doesn't work, copy and paste the following
                    link into your browser:
                </p>

                <p style="
                    font-size: 12px;
                    line-height: 1.6;
                    color: #58a6ff;
                    text-align: center;
                    word-break: break-all;
                ">
                 http://localhost:3000/api/auth/verify-email?token=${emailvarificationtoken}
                </p>

            </td>
        </tr>

        <!-- Footer -->
        <tr>
            <td
                align="center"
                style="
                    background-color: #0a0d12;
                    padding: 28px 20px;
                    border-top: 1px solid #21262d;
                "
            >

                <p style="
                    font-size: 12px;
                    color: #6e7681;
                    margin: 0;
                    font-family: 'Courier New', monospace;
                ">
                    This is an automated message — please do not reply directly.
                </p>

                <p style="
                    font-size: 12px;
                    color: #6e7681;
                    margin: 10px 0 0 0;
                ">
                    &copy; ${new Date().getFullYear()} Perplexity.
                    All systems operational.
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

      const emailvarificationtoken  = jwt.sign({
         email },
          process.env.JWT_SECRET, 
          
        )


    
      

await sendeamil({
    to: email, // Receiver's email
    subject: "Welcome to Our Platform! 🎉",
    html: welcomeEmailHTML(username , emailvarificationtoken) 
});



      return res.status(201).json({
            message: "Please verify your email address first. ",
           success: true,
            
       
      })
 

}

export const  verifyemail = async (req, res) => {
      const { token } = req.query;

       if (!token) {
            return res.status(400).json({
                success: false,
                message: "Verification token is required"
            });
        }
       
      const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET)

      if(!decoded){
            return res.status(400).json(
                
                {    
                    suucsee : false,
                    message: "Invalid token"
                })
      }
      console.log(decoded)
      const user = await userModel.findOne({email: decoded.email})

      if(!user){
            return res.status(400).json(
                {    
                    success : false,
                    message: "user does not exists"
                })
      }
      user.isVarify = true
      await user.save()

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verified Successfully</title>
</head>

<body style="
    margin: 0;
    padding: 0;
    background-color: #05070d;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
">

    <div style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
    ">

        <div style="
            width: 100%;
            max-width: 480px;
            background: linear-gradient(180deg, #161b22 0%, #0d1117 100%);
            border: 1px solid #2a3038;
            border-radius: 16px;
            padding: 45px 35px;
            text-align: center;
            box-sizing: border-box;
            box-shadow: 0 20px 50px rgba(0,0,0,0.45);
        ">

            <!-- Success Icon -->
            <div style="
                width: 70px;
                height: 70px;
                margin: 0 auto 25px;
                border-radius: 50%;
                background-color: rgba(63, 185, 80, 0.12);
                border: 1px solid rgba(63, 185, 80, 0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 34px;
                color: #3fb950;
            ">
                ✓
            </div>

            <!-- Heading -->
            <h1 style="
                margin: 0 0 15px;
                color: #ffffff;
                font-size: 28px;
                font-weight: 700;
            ">
                Email Verified Successfully!
            </h1>

            <!-- Message -->
            <p style="
                margin: 0 auto 30px;
                max-width: 380px;
                color: #8b949e;
                font-size: 16px;
                line-height: 1.7;
            ">
                Your email address has been successfully verified.
                Your account is now ready to use.
            </p>

            <!-- Login Message -->
            <div style="
                padding: 15px 18px;
                margin-bottom: 30px;
                background-color: #0d1117;
                border: 1px solid #21262d;
                border-left: 3px solid #58a6ff;
                border-radius: 8px;
                color: #c9d1d9;
                font-size: 14px;
                line-height: 1.6;
            ">
                Please log in to your account to continue.
            </div>

            <!-- Login Button -->
            <a
                href="http://localhost:3000/login"
                style="
                    display: inline-block;
                    padding: 14px 35px;
                    background: linear-gradient(90deg, #238636, #2ea043);
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 16px;
                    font-weight: 600;
                    border-radius: 8px;
                    box-shadow: 0 4px 16px rgba(35,134,54,0.35);
                "
            >
                Login to Your Account →
            </a>

            <!-- Footer -->
            <p style="
                margin: 30px 0 0;
                color: #6e7681;
                font-size: 12px;
            ">
                You can now access your account.
            </p>

        </div>

    </div>

</body>
</html>`

      res.send(html)
}
export const userlogin = async (req,res) => {
       const { email, password } = req.validatedData;
       
       const user = await usermodel.findOne({ email })

       if(!user){
            return res.status(400).json({
                
                message: "user does not exists",
                success: false ,
                error: "user does not exists"
            })
       }
       const ismatch = await bcrypt.compare(password, user.password)

       if(!ismatch){
            return res.status(400).json({
                   success: false ,
                   error: "Invalid credentials",
                message: "Invalid credentials"})
       }

       if(!user.isVarify ){
            return res.status(400).json({
                   success: false ,
                   error: "email mot farified",
                message: "Please verify your email before login "})
           
       }

     const token = jwt.sign({
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET, 
  
    )
      
      res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
      });

      return res.status(201).json({
        success: true,
        message: "user logged in successfully",
        user:{
         id: user._id,
        username: user.username,
        email: user.email,  
        }
    
      
           
      })

        
}



export const logout = async (req,res) => {
      res.clearCookie("token")
      return res.status(200).json({message: "user logged out successfully"})
}


export const getme = async (req, res) => {
  const userId = req.user.id;

  const user = await userModel.findById(userId).select("-password");

  if (!user) {
    return res.status(400).json({
      message: "user not found",
      success: false,
      error: "user not found"
    });
  }

  return res.status(200).json({
    message: "User fetched successfully. ",
    success: true,
    user
  });
}