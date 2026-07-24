import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";

// Get Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const {
      phone,
      branch,
      cgpa,
      graduationYear,
      skills,
      linkedin,
      github,
      bio,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.phone = phone;
    user.branch = branch;
    user.cgpa = cgpa;
    user.graduationYear = graduationYear;
    user.skills = skills;
    user.linkedin = linkedin;
    user.github = github;
    user.bio = bio;

    await user.save();

    const updatedUser = await User.findById(req.user.id).select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Upload Resume
export const uploadResume = async (req, res) => {
  console.log("===== DEBUG =====");
  console.log("req.file:", req.file);
  console.log("req.body:", req.body);
  console.log("===== DEBUG =====");
  console.log(req.file);

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.resume.publicId) {
      await cloudinary.uploader.destroy(user.resume.publicId, {
        resource_type: "raw",
      });
    }

    user.resume = {
      url: req.file.path,
      publicId: req.file.filename,
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: user.resume,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to upload resume",
      error: error.message,
    });
  }
};