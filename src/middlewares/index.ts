/* eslint-disable @typescript-eslint/no-use-before-define */
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import logger from '../utils/logger';
import { throwError } from '../utils/error';
import { CustomError } from '../types/error';
import {
  ErrorResponse,
  SuccessResponse,
  ErrorPayload,
} from '../types/response';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  throwError({
    status: 404,
    message: `${req.method} ${req.path} is not found`,
  });
};

/**
 * Response interceptor
 */
export const formatResponse = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const oldJson = res.json;

  res.json = function (data) {
    let retVal: SuccessResponse | ErrorResponse;
    if (res.statusCode >= 400) {
      logError(data);
      retVal = { error: data };
      retVal.error = data;
    } else {
      retVal = { payload: data };
      retVal.payload = data;
    }
    return oldJson.call(res, retVal);
  };
  next();
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const logError = (err: any) => {
  const errorClone = { ...err };
  logger.error(errorClone);
};

export const catchErrors = (action: Function) => (
  req: Request,
  res: Response,
  next: NextFunction
) => action(req, res).catch(next);

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'An error ocurred';
  const error: ErrorPayload = {
    message: err.message || message,
  };
  if (config.nodeEnv !== 'production') {
    error.stack = err.stack;
  }
  res.status(status).json(error);
};
