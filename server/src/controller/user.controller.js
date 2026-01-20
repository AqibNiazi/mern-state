const cloudinary = require("../config/cloudinary");
const User = require("../model/user.model");

const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Wrap Cloudinary stream in a Promise
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "user_profiles",
          public_id: `avatar_${req.user.id}`,
          overwrite: true,
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      stream.end(req.file.buffer); // ✅ send buffer directly
    });

    // Update user avatar in MongoDB
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: result.secure_url },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      data: user,
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error.message,
    });
  }
};

module.exports = { uploadProfileImage };
