import { PrismaClient, Status } from "@prisma/client";
import { CreateTaskDto, TaskDto, UpdateTaskDto } from "./task.schema";

export class TaskModel {
  private select = {
    id: true,
    title: true,
    description: true,
    status: true,
    created_at: true,
    updated_at: true,
  };
  constructor(private prisma: PrismaClient) {}

  getAllTasks = async (): Promise<TaskDto[]> => {
    const data = await this.prisma.tasks.findMany({
      select: this.select,
      orderBy: {
        created_at: "desc",
      },
    });
    return data || [];
  };

  getTaskById = async (taskId: string) => {
    const data = await this.prisma.tasks.findUnique({
      where: { id: taskId },
      select: this.select,
    });

    return data;
  };

  createTask = async (payload: CreateTaskDto): Promise<TaskDto> => {
    const newData = await this.prisma.tasks.create({
      data: payload,
      select: this.select,
    });

    return newData;
  };

  toggleStatus = async ({ taskId, newStatus }: { taskId: string; newStatus: Status }): Promise<TaskDto> => {
    const updatedTask = await this.prisma.tasks.update({
      where: { id: taskId },
      data: { status: newStatus },
      select: this.select,
    });

    return updatedTask;
  };

  updateTask = async (payload: UpdateTaskDto) => {
    const updatedTask = await this.prisma.tasks.update({
      where: { id: payload.id },
      data: { ...payload },
      select: this.select,
    });

    return updatedTask;
  };

  deleteTask = async (taskId: string) => {
    const deleteTask = await this.prisma.tasks.delete({
      where: { id: taskId },
    });

    return deleteTask;
  };
}
