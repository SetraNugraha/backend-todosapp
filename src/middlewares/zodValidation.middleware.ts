import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const zodValidation = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (error) {
      next(error);
    }
  };
};
