import { HttpMethod, IRouting } from "../../types/routing.type";
import { TaskModule } from "./task.module";
import { prisma } from "../../config/database";
import { zodValidation } from "../../middlewares/zodValidation.middleware";
import { CreateTaskSchema, UpdateTaskSchema } from "./task.schema";

const { controller } = TaskModule(prisma);

export const TaskRoute: IRouting[] = [
  // GET All
  {
    method: HttpMethod.GET,
    url: "/tasks",
    controller: controller.getAllTask,
  },
  // CREATE
  {
    method: HttpMethod.POST,
    url: "/tasks",
    middleware: [zodValidation(CreateTaskSchema)],
    controller: controller.createTask,
  },
  // Toggle Status
  {
    method: HttpMethod.PUT,
    url: "/tasks/:taskId",
    controller: controller.toggleStatus,
  },
  // UPDATE Task
  {
    method: HttpMethod.PATCH,
    url: "/tasks/:taskId",
    middleware: [zodValidation(UpdateTaskSchema)],
    controller: controller.updateTask,
  },
  // DELETE
  {
    method: HttpMethod.DELETE,
    url: "/tasks/:taskId",
    controller: controller.deleteTask,
  },
];
