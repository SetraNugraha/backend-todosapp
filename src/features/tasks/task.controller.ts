import { NextFunction, Request, Response } from "express";
import { TaskService } from "./task.service";
import { successResponse } from "../../utils/successResponse";

export class TaskController {
  constructor(private service: TaskService) {}

  getAllTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getAllTasks();
      successResponse(res, 200, "get all tasks success", result);
    } catch (error) {
      next(error);
    }
  };

  createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.createTask(req.body);
      successResponse(res, 201, "task created", result);
    } catch (error) {
      next(error);
    }
  };

  toggleStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId = String(req.params.taskId);
      const result = await this.service.toggleStatus(taskId);
      successResponse(res, 200, "task updated", result);
    } catch (error) {
      next(error);
    }
  };

  updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId = String(req.params.taskId);
      const result = await this.service.updateTask({ id: taskId, ...req.body });
      successResponse(res, 200, "update task sucess", result);
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId = String(req.params.taskId);
      await this.service.deleteTask(taskId);
      successResponse(res, 200, "task deleted", []);
    } catch (error) {
      next(error);
    }
  };
}
