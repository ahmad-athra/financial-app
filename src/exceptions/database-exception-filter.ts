import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log(exception);
    if ((exception as any).code === '23505') {
      const errordetails: string =
        (exception as any).detail || 'Duplicate key violation';

      response.status(409).json({
        statusCode: 409,
        message: 'Duplicate key violation:',
        stack: errordetails,
      });
      return;
    }

    response.status(500).json({
      statusCode: 500,
      message: 'Database error',
    });
  }
}
