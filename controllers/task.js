import ErrorHandler from "../utils/errorConstruct.js";
import { Task } from "./../models/task.js";

export const check = (req, res , next) => {
  res.status(200).json({
    success: true,
    message: "Recieved",
  });
};

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    //working 1
    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const tasks = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task not found", 404)); //error handling

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated",
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    console.log(task);

    if (!task) return next(new ErrorHandler("Task not found", 404)); //error handling

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "task deleted",
    });
  } catch (error) {
    next(error);
  }
};
