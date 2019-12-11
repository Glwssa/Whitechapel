import { Request, Response, NextFunction, Router } from 'express';
import { NotFound, BadRequest } from 'http-errors';
import { DIContainer, MinioService, SocketsService } from '@app/services';
import { logger } from '../../../utils/logger';
import * as  fs from 'fs';
import * as path from 'path';

export class ExampleController {

    //Avatars:
    // https://i.imgur.com/yOxs9eW.png -monica
    // https://i.imgur.com/6f6DPhk.png -Bin
    // https://i.imgur.com/lJ3ggBw.png -Cirus
    // https://i.imgur.com/zaleAlv.png -Ed
    // https://i.imgur.com/dkszoEI.png -Seth
    // https://i.imgur.com/j5Haq2A.png -Barack
    // https://i.imgur.com/g2vt5Hk.png -Ariana
    //Characters:
    // https://i.imgur.com/9LzwD2L.png -Cotsable
    // https://i.imgur.com/Hl9HvHp.png -Jocker
    // https://i.imgur.com/VZVnvpp.png -Vigilante
    // https://i.imgur.com/W3WK2IQ.png -Mayor
    // https://i.imgur.com/vth8OLN.png -Medium
    // https://i.imgur.com/cIwiHJe.png -Killer
    // https://i.imgur.com/yb3YgnB.png -Doctor

    public names = ['Stratos', 'Panos'];
    public data: any;
    public Tabledata: any;
    public retData: string[];
    public retDataTable: string[];
    public final: string[];
    public TableNamesImagesCharactersfinal: string[][];
    public calls: number;
    public StartTable: boolean = true;
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
            .get('/getTableNames', (req: Request, res: Response)=>{ this.getTableNames(req,res)})
            .get('/getTableStartBool', (req: Request, res: Response)=>{ this.getTableStartBool(req,res)});

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

    /*public async TableFileReader() {
      if ( this.TableNamesfinal === undefined || this.TableNamesfinal.length < 15) {
        this.TableNamesfinal = [];
      }

      logger.info('FS');
      fs.readFile(path.join(__dirname, '../example/PlayerName-Images.txt'), 'utf8', (error, Tabledata) => {
        this.Tabledata = Tabledata;
      });

      this.retDataTable = this.Tabledata.split(/\n/g);
      
      for (const  row of this.retDataTable) {
        const Tablevalue = row.split(' ');
        if ( this.TableNamesfinal === undefined || this.TableNamesfinal.length === 0) {
            this.TableNamesfinal = Tablevalue;
            continue;
        }
        this.TableNamesfinal.push(Tablevalue[0]);
        this.TableNamesfinal.push(Tablevalue[1]);
      }
    }
    */
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
      //this.TableFileReader();
      //this.fileReader('1');

      res.json({ message: this.TableNamesImagesCharactersfinal });
    }

    public getTableStartBool(req: Request, res: Response){
      logger.info('e getTableStartBool request print message');
      res.json({ message: this.StartTable });
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
