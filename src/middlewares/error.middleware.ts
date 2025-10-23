import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorMiddleware(err: Error, req: Request, res: Response, _Next: NextFunction) {
  // ZOD
  if (err instanceof ZodError) {
    console.error(`[${req.method}] ${req.url} - validation error`);
    return res.status(400).json({
      success: false,
      message: "validation error",
      errors: err.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // App Error
  if (err instanceof AppError) {
    console.error(`[${req.method}] ${req.url} - ${err.message}`);

    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Default Error
  console.error(`[${req.method}] ${req.url} - unexpected error: ${JSON.stringify(err, null, 2)}`);
  return res.status(500).json({
    success: false,
    message: "internal server error",
  });
}
