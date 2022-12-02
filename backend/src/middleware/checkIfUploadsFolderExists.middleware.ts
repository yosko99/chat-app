import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

@Injectable()
export class CheckIfUploadsFolderExists implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    fs.access('./uploads', async (err) => {
      if (err) {
        await fs.mkdirSync('./uploads');
      }
    });

    next();
  }
}
