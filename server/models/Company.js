import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, default: "" },
    package: { type: String, required: true },
    location: { type: String, required: true },
    eligibility: { type: String, default: "" },
    deadline: { type: String, default: "" },
    skills: { type: [String], default: [] },
    status: { type: String, enum: ["Open", "Closed"], default: "Open" },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);