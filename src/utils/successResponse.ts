import { Response } from "express";

export const successResponse = (res: Response, statusCode: number = 200, message: string = "success", data: any) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
