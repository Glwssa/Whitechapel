import { Request, Response, NextFunction, Router } from 'express';
import { NotFound, BadRequest } from 'http-errors';
import { DIContainer, MinioService, SocketsService } from '@app/services';
import { logger } from '../../../utils/logger';
import * as  fs from 'fs';
import * as path from 'path';

export class ExampleController {

    public names = ['Stratos', 'Panos'];
    public data: any;
    public retData: string[];
    public final: string[];

   // stant: any;

    /**
     * Apply all routes for example
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();

        router
            .post('/sendMessageToClients',(req: Request, res: Response)=>{ this.sendMessageToClients(req,res)})
            .get('/getMessage', this.getMessage);

        return router;
    }

    public fileReader() {

      logger.info('FS');
      fs.readFile(path.join(__dirname, '../example/test.txt'),'utf8', (error, data) => {
        this.data = data;
      });

      this.retData = this.data.split(/\n/g);
      const i = 0;
      for (let row of this.retData) {
        const value = row.split(' ');
        if ( this.final === undefined || this.final.length === 0) {
            this.final = value;
            continue;
        }
        this.final.push(value[0]);
        this.final.push(value[1]);
      }
    }

    /**
     * Sens a message back as a response
     */
    public getMessage(req: Request, res: Response) {
        logger.info('e getMessage request print message');

        res.json({ message: 'hello' });
    }

    /**
     * Broadcasts a received message to all connected clients
     */
    public sendMessageToClients(req: Request, res: Response) {
        const message: any = req.body.message;
        const event: any = req.body.event;
        logger.info(message.scream);

        logger.info(message.userID);

        // Sending a broadcast message to all clients
        const socketService = DIContainer.get(SocketsService);
        socketService.broadcast(event, message);

        this.fileReader();

        logger.info(this.final.length);
        res.json({ message: this.final});

    }

}
