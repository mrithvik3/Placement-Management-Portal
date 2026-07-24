import Company from "../models/Company.js";
import Application from "../models/Application.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalCompanies = await Company.countDocuments();
    const totalApplications = await Application.countDocuments();

    const interviews = await Application.countDocuments({
      status: "Interview",
    });

    const selected = await Application.countDocuments({
      status: "Selected",
    });

    // Upcoming Drives
    const upcomingDrives = await Company.find({
      status: "Open",
    })
      .sort({ deadline: 1 })
      .limit(5);

    // Latest Applications
    const recentApplications = await Application.find()
      .populate("student", "name")
      .populate("company", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalCompanies,
      totalApplications,
      interviews,
      selected,
      upcomingDrives,
      recentApplications,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};