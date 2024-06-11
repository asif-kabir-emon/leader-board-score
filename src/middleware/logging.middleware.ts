import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const log = `${req.ip} - ${req.method} - ${req.url} - ${res.statusCode}\n`;
    fs.appendFileSync(path.join(__dirname, '../../logs/requests.log'), log);
    next();
  }
}
