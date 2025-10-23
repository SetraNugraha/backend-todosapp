import { keyof, ZodError } from "zod";
import { TaskModel } from "./task.model";
import { CreateTaskDto, TaskDto, UpdateTaskDto } from "./task.schema";
import { AppError } from "../../middlewares/error.middleware";
import { Status } from "@prisma/client";

export class TaskService {
  constructor(private model: TaskModel) {}

  getAllTasks = async () => {
    const result = this.model.getAllTasks();
    return result;
  };

  createTask = async (payload: CreateTaskDto) => {
    const { title, description } = payload;

    if (!title || title === "undefined") {
      throw new ZodError([
        {
          code: "custom",
          path: ["title"],
          message: "title required",
        },
      ]);
    }

    if (!description || description === "undefined") {
      throw new ZodError([
        {
          code: "custom",
          path: ["description"],
          message: "description required",
        },
      ]);
    }

    const result = await this.model.createTask(payload);
    return result;
  };

  findTask = async (taskId: string) => {
    if (!taskId) {
      throw new AppError("task id not found", 404);
    }

    const task = await this.model.getTaskById(taskId);
    if (!task) {
      throw new AppError("task not found", 404);
    }

    return task;
  };

  toggleStatus = async (taskId: string) => {
    const task = await this.findTask(taskId);

    const newStatus = task.status === Status.pending ? Status.done : Status.pending;

    const result = await this.model.toggleStatus({ taskId: task.id, newStatus });

    return result;
  };

  updateTask = async (payload: UpdateTaskDto) => {
    if (!payload.id) {
      throw new AppError("id not found", 404);
    }

    const task = await this.findTask(payload.id);

    const newPayload = {
      id: task.id,
      title: payload.title ?? task.title,
      description: payload.description ?? task.description,
      status: (payload.status as Status) ?? task.status,
    };

    const isChanges = Object.entries(newPayload).some(([key, value]) => {
      return value !== undefined && value !== task[key as keyof typeof task];
    });

    if (!isChanges) {
      throw new AppError("no field are changes", 404);
    }

    const result = await this.model.updateTask({ ...newPayload });
    return result;
  };

  deleteTask = async (taskId: string) => {
    const task = await this.findTask(taskId);
    const result = await this.model.deleteTask(task.id);
    return result;
  };
}
