import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate;

  switch (filter) {
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
    case "week": {
      const mondayDate =
        now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    }
    case "month": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case "all":
    default: {
      startDate = null;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    /* const tasks = await Task.find().sort({ createdAt: -1 });*/
    /*đếm dữ liệu count trong DB mongoose*/
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          /* sắp xếp lại*/
          tasks: [{ $sort: { createdAt: -1 } }],
          /* đếm số nhiệm vụ active */
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          /* đếm số nhiệm vụ hoàn thành */
          completeCount: [
            { $match: { status: "complete" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    /* lấy nhiệm vụ sau khi đã sắp xếp*/
    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completeCount = result[0].completeCount[0]?.count || 0;

    /* gửi dữ liệu về fontend*/
    res.status(200).json({ tasks, activeCount, completeCount });
  } catch (error) {
    console.log("Lỗi khi gọi getAllTasks", error);
    res.status(500).json({ messages: "Lỗi hệ thống" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.log("Lỗi khi gọi createTask", error);
    res.status(500).json({ messages: "Lỗi hệ thống" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt,
      },
      { new: true },
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log("Lỗi khi gọi updateTask", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      return res.status(404).json({ message: " Nhiệm vụ không tồn tại" });
    }
    res.status(200).json(deleteTask);
  } catch (error) {
    console.log("Lỗi khi gọi deleteTask", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
