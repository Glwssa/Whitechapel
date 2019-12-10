import { Request, Response, NextFunction, Router } from 'express';
import { NotFound, BadRequest } from 'http-errors';
import { DIContainer, MinioService, SocketsService } from '@app/services';
import { logger } from '../../../utils/logger';
import * as  fs from 'fs';
import * as path from 'path';

export class ExampleController {

    public names = ['Stratos', 'Panos'];
    public data: any;
    public Tabledata: any;
    public retData: string[];
    public retDataTable: string[];
    public final: string[];
    public TableNamesfinal: string[];
    public calls: number;
    //public setuppedplayers: number;

    //setup (){
     // kane this.setup. bale name bale image
      //setupppedplayers++;
      //if(settuppedplayers==7){
      //  res.json({ message: 'allready' });
     // }
    //}
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
            .post('/getNames',(req: Request, res: Response)=>{ this.getNames(req,res)})
            .get('/getMessage', this.getMessage)
            .get('/getTableNames', (req: Request, res: Response)=>{ this.getTableNames(req,res)});

        return router;
    }

    public getNames(req: Request, res: Response) {
      const message: any = req.body.message;
      const event: any = req.body.event;

      const socketService = DIContainer.get(SocketsService);
      socketService.broadcast(event, message);

      res.json({ message: 'lala'});

    }

    public writeNames(name: String) {
      fs.writeFile('/example/PlayerNames.txt', name+' 1\n', function (err: any) {
        if (err) throw err;
      }); 
    }

    public async fileReader(round: string) {
      if ( this.final === undefined || this.final.length < 15) {
        this.final = [];
      }

      logger.info('FS');
      fs.readFile(path.join(__dirname, '../example/test' + round + '.txt'), 'utf8', (error, data) => {
        this.data = data;
      });

      this.retData = this.data.split(/\n/g);
      const i = 0;
      for (const  row of this.retData) {
        const value = row.split(' ');
        if ( this.final === undefined || this.final.length === 0) {
            this.final = value;
            continue;
        }
        this.final.push(value[0]);
        this.final.push(value[1]);
      }
    }

    public TablefileReader() {
      if ( this.TableNamesfinal === undefined || this.TableNamesfinal.length < 15) {
        this.TableNamesfinal = [];
      }

      logger.info('FS');
      fs.readFile(path.join(__dirname, '../example/test1.txt'), 'utf8', (error, Tabledata) => {
        this.Tabledata = Tabledata;
      });

      this.retDataTable = this.Tabledata.split(/\n/g);
      const i = 0;
      for (const  row of this.retDataTable) {
        const value = row.split(' ');
        if ( this.TableNamesfinal === undefined || this.TableNamesfinal.length === 0) {
            this.TableNamesfinal = value;
            continue;
        }
        this.TableNamesfinal.push(value[0]);
        this.TableNamesfinal.push(value[1]);
      }
    }

    /**
     * Sents a message back as a response
     */
    public getMessage(req: Request, res: Response) {
        logger.info('e getMessage request print message');

        res.json({ message: 'hello' });
    }

    //get table names fro setup
    public getTableNames(req: Request, res: Response) {
      logger.info('e getTableNames request print message');
      this.TablefileReader();
      res.json({ message: this.TableNamesfinal });
  }

    /**
     * Broadcasts a received message to all connected clients
     */
    public async sendMessageToClients(req: Request, res: Response) {
        const message: any = req.body.message;
        const event: any = req.body.event;
        logger.info(message.scream);

        logger.info(message.userID);

        // Sending a broadcast message to all clients
        const socketService = DIContainer.get(SocketsService);
        socketService.broadcast(event, message);

        await this.fileReader(message.scream);

        res.json({ message: this.final});

    }

}
