const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ✅ Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "VALIDATION_ERROR",
        message: "Username, email, and password are required.",
      });
    }

    // ✅ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "INVALID_EMAIL",
        message: "Please provide a valid email address.",
      });
    }

    // ✅ Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "WEAK_PASSWORD",
        message: "Password must be at least 6 characters long.",
      });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "USER_EXISTS",
        message: "A user with this email already exists.",
      });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);

    return res.status(500).json({
      success: false,
      error: "SERVER_ERROR",
      message: "Something went wrong while creating the user.",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "VALIDATION_ERROR",
        message: "Email and password are required.",
      });
    }

    // ✅ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "INVALID_EMAIL",
        message: "Please provide a valid email address.",
      });
    }

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "USER_NOT_FOUND",
        message: "No user found with this email.",
      });
    }

    // ✅ Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "INVALID_CREDENTIALS",
        message: "Incorrect password.",
      });
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ Store token in secure cookie
    res.cookie("token", token, {
      httpOnly: true, // prevents JS access
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: "strict", // CSRF protection
      maxAge: 3600000, // 1 hour
    });

    // ✅ Respond with user info (no need to send token again)
    return res.status(200).json({
      success: true,
      message: "Signin successful!",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signin Error:", error);

    return res.status(500).json({
      success: false,
      error: "SERVER_ERROR",
      message: "Something went wrong while signing in.",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  signup,
  signin,
};