import express from "express";
import taskRoute from "./routes/tasksRoutes.js";
import { connect } from "mongoose";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();

// MiddleWare Trạm kiểm soát Tất cả request phải qua MiddleWare kiểm tra đúng loại Json không ?
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/tasks", taskRoute);

connectDB().then(() => {
  // 5001 cổng, máy tính cả nghìn cổng, một số cổng mà lập trình viên hay dùng trên máy tính là 8000, 8080, 5000, 5001, 5173, 3000 đang rãnh dùng được
  app.listen(PORT, () => {
    console.log(`server bắt đầu trên cổng ${PORT}`);
  });
});

// Đã xong phần Backend
