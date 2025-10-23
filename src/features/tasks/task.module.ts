import { PrismaClient } from "@prisma/client";
import { TaskModel } from "./task.model";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";

export const TaskModule = (prisma: PrismaClient) => {
  // MODEL
  const taskModel = new TaskModel(prisma);

  // SERVICE
  const taskService = new TaskService(taskModel);

  // CONTROLLER
  const controller = new TaskController(taskService);

  return { controller };
};
