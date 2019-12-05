import { Request, Response, NextFunction, Router } from 'express';
import { NotFound, BadRequest } from 'http-errors';
import { DIContainer, MinioService, SocketsService } from '@app/services';
import { logger } from '../../../utils/logger';
//import * as  fs from 'fs';

export class ExampleController {

    names =['Stratos','Panos'];
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
    /*
    public fileReader(){
    fs.open('fullstack-template/backend/src/api/v1/example/playerStatus.json', 'r', (err, fd) => {
        if (err) throw err;
        fs.fstat(fd, (err, stat) => {
          if (err) throw err;
          // use stat
            this.stant= stat;
          // always close the file descriptor!
          fs.close(fd, (err) => {
            if (err) throw err;
          });
        });
      });
    }

*/
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

        logger.info('keftes');
        res.json({ message: this.names });

    }

}
