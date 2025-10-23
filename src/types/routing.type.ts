import { Request, Response, NextFunction } from "express";

export enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

export interface IRouting {
  method: HttpMethod;
  url: string;
  middleware?: ((req: Request, res: Response, Next: NextFunction) => void)[];
  controller: (req: Request, res: Response, Next: NextFunction) => Promise<any> | any;
}
