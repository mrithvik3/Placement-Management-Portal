import Company from "../models/Company.js";

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createCompany = async (req, res) => {
  try {
    const { name, location, package: salaryPackage, status } = req.body;

    const company = await Company.create({
      name,
      location,
      package: salaryPackage,
      status,
    });

    res.status(201).json({
      message: "Company added successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

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

export const updateCompany = async (req, res) => {
  try {
    const { name, location, package: salaryPackage, status } = req.body;

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        name,
        location,
        package: salaryPackage,
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

    res.json({
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

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