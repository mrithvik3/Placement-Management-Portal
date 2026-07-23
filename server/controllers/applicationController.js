import Application from "../models/Application.js";
import Company from "../models/Company.js";

export const applyToCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    const existingApplication = await Application.findOne({
      student: req.user.id,
      company: companyId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied to this company.",
      });
    }

    const application = await Application.create({
      student: req.user.id,
      company: companyId,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const withdrawApplication = async (req, res) => {
  try {
    const { companyId } = req.params;

    const application = await Application.findOne({
      student: req.user.id,
      company: companyId,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    await application.deleteOne();

    res.json({
      success: true,
      message: "Application withdrawn successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      student: req.user.id,
    })
      .populate("company")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const getCompanyApplicants = async (req, res) => {
  try {
    const { companyId } = req.params;

    const applications = await Application.find({
      company: companyId,
    })
      .populate("student", "-password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    application.status = status;

    await application.save();

    res.json({
      success: true,
      message: "Application status updated.",
      application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};