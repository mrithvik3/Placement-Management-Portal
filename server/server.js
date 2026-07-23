import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import companyRoutes from "./routes/companyRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());   // ← This is REQUIRED

app.use("/api/companies", companyRoutes);

app.get("/", (req, res) => {
  res.send("Placement Portal Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});