
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from "uuid";



export const login=async(req, res) => {
    try {
          const { name } = req.body;

    if(!name) {
        return res.status(400).json({ message: "All fields are required" });
    }



    // unique session identifier
    const sessionId = uuidv4();

    const jwtToken = jwt.sign(
      {username: name, sessionId },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

      res.cookie("token", jwtToken, {
            httpOnly: true,
            maxAge: 1*24 * 60 * 60 * 1000, // 1 day
             sameSite: "None",
            secure: true,  // Set to true if using HTTPS
        });

    res.status(200).json({
        success: true,
        message: "User logged in successfully", 
        jwtToken,
        sessionId,
        name
    });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "There is some problem on login"
        });
        
    }
  
}





export const logout = (req, res) => {
    try {
           res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
        });
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "There is some problem on logout"
        });
    }
}


export const currentUser = async (req, res) => {
    try {

        const user = req.user

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Problem while fetching current user"
        });
        
    }
}
