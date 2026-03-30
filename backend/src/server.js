import express from "express";
import taskRoute from "./routes/tasksRoutes.js";
import { connect } from "mongoose";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

const app = express();

// MiddleWare Trạm kiểm soát Tất cả request phải qua MiddleWare kiểm tra đúng loại Json không ?
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

app.use("/api/tasks", taskRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  // 5001 cổng, máy tính cả nghìn cổng, một số cổng mà lập trình viên hay dùng trên máy tính là 8000, 8080, 5000, 5001, 5173, 3000 đang rãnh dùng được
  app.listen(PORT, () => {
    console.log(`server bắt đầu trên cổng ${PORT}`);
  });
});

// Đã xong phần Backend
// Force update 2026
