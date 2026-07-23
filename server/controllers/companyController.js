import Company from "../models/Company.js";

// GET all companies
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET company by ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.json(company);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE company
export const createCompany = async (req, res) => {
  try {
    const {
      name,
      role,
      package: salaryPackage,
      location,
      eligibility,
      deadline,
      skills,
      status,
    } = req.body;

    const company = await Company.create({
      name,
      role,
      package: salaryPackage,
      location,
      eligibility,
      deadline,
      skills,
      status,
    });

    res.status(201).json(company);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// UPDATE company
export const updateCompany = async (req, res) => {
  try {
    const {
      name,
      role,
      package: salaryPackage,
      location,
      eligibility,
      deadline,
      skills,
      status,
    } = req.body;

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        name,
        role,
        package: salaryPackage,
        location,
        eligibility,
        deadline,
        skills,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.json(company);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// DELETE company
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.json({
      message: "Company deleted successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};