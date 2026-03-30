import React from "react";
import TaskEmptyStats from "./TaskEmptyState";
import TaskCard from "./TaskCard";

// Để lấy thông tin về server nhé
const TaskList = ({ filteredTasks, filter, handleTaskChanged }) => {
  /*
const TaskList = () => {
  let filter = "all";
  const filteredTasks = [
    {
      _id: "1",
      title: "Học react",
      status: "active",
      completedAt: null,
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "Học js",
      status: "complete",
      completedAt: new Date(),
      createdAt: new Date(),
    },
    {
      _id: "3",
      title: "Học css",
      status: "active",
      completedAt: null,
      createdAt: new Date(),
    },
  ];
  */

  if (!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyStats filter={filter} />;
  }
  return (
    <div className="space=y-3">
      {filteredTasks.map((task, index) => (
        <TaskCard
          key={task._id ?? index}
          task={task}
          index={index}
          handleTaskChanged={handleTaskChanged}
        />
      ))}
    </div>
  );
};

export default TaskList;
