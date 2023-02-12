import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch()
export class BaseExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response
        .status(status)
        .json({
          statusCode: status,
          message: exception.message,
        });
    } else {
      response
        .status(500)
        .json({
          statusCode: 500,
          message: 'Internal Server Error',
        });
    }
  }
}