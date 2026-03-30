import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // bắt buộc phải có
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "complete"],
      default: "active",
    },
    // ngày hoàn thành
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // create and updatedAt tự động thêm vào không phải viết tay
  },
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
