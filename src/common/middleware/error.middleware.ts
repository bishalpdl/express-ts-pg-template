import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../class/error";
import multer from "multer";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("from error middleware-----------> ", err);
  let error: ExpressError;
  if (err instanceof ExpressError) {
    error = err;
  } else if (
    err instanceof multer.MulterError &&
    err.code === "LIMIT_FILE_SIZE"
  ) {
    error = new ExpressError(400, `${err.field} size is too large.`);
  } else {
    error = new ExpressError(500, err.message);
  }
  return res.status(error.getStatus).json({
    success: false,
    message: error.message,
    ...error.getProps,
  });
}
