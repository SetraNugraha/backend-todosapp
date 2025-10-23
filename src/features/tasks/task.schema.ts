import { Status } from "@prisma/client";
import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string().nonempty("id cannot be empty"),
  title: z.coerce.string().nonempty("title cannot be empty").min(3, { message: "minimum title character is 3" }),
  description: z.coerce.string().nonempty("description cannot be empty").min(3, { message: "minimum description character is 3" }),
  status: z.enum(Status, { message: "Invalid status, status must be pending or done" }),
});

// GET
export type TaskDto = z.infer<typeof TaskSchema>;

// CREATE
export const CreateTaskSchema = TaskSchema.omit({
  id: true,
});
export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;

// UPDATE
export const UpdateTaskSchema = TaskSchema.partial();
export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;
