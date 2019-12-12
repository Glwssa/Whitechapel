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

    public data: any;
    public Tabledata: any;
    public retData: string[];
    public retDataTable: string[];
    public final: string[] = [];
    public TableNamesImagesCharactersfinal: string[][];
    public calls: number;
    public StartTable: boolean = false;
  NamesArray: string[] = [];
  ReadyPlayersCounter: number = 0;
  NamesRoles:string [] = [];
  Roles=['https://i.imgur.com/9LzwD2L.png','https://i.imgur.com/Hl9HvHp.png','https://i.imgur.com/VZVnvpp.png','https://i.imgur.com/W3WK2IQ.png','https://i.imgur.com/vth8OLN.png','https://i.imgur.com/cIwiHJe.png','https://i.imgur.com/yb3YgnB.png'];
  exist=false;
  randomNum: number;
  usednumber: number[] = [];
  NameAvatar: string[] = [];
  Avatar= ['https://i.imgur.com/yOxs9eW.png', 'https://i.imgur.com/6f6DPhk.png', 'https://i.imgur.com/lJ3ggBw.png', 'https://i.imgur.com/zaleAlv.png', 'https://i.imgur.com/dkszoEI.png', ' https://i.imgur.com/j5Haq2A.png', 'https://i.imgur.com/g2vt5Hk.png'];
  status: number[]  = [];
  currentRound: number;
  i: number;
  j: number;
  end: number = 0;
    /**
     * Apply all routes for example
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();

        router
            .post('/sendMessageToClients',(req: Request, res: Response)=>{ this.sendMessageToClients(req,res)})
            .post('/setNames',(req: Request, res: Response)=>{ this.setNames(req,res)})
            .get('/getMessage', this.getMessage)
            .get('/getTableNames', (req: Request, res: Response)=>{ this.getTableNames(req,res)})
            .get('/getTableStartBool', (req: Request, res: Response)=>{ this.getTableStartBool(req,res)});

        return router;
    }

    public setNames(req: Request, res: Response) {
      const message: any = req.body.message;
      const event: any = req.body.event;

      logger.info(message.scream);
      logger.info(event);

      const socketService = DIContainer.get(SocketsService);
      socketService.broadcast(event, message);
      this.writeNames(message.scream);

      res.json({ message: 'lala'});

    }

    public writeNames(name: string) {
      logger.info(name);
      this.NamesArray.push(name);      
      this.status.push(1);

      this.ReadyPlayersCounter++;

      this.AssignNames();
      if(this.ReadyPlayersCounter==6){
        this.StartTable=true;
      }
    }

    public AssignNames(){

      this.randomNum=this.getRandomInt(7);
      while(this.usednumber.indexOf(this.randomNum) !== -1){
        this.randomNum=this.getRandomInt(7);
      }
      this.usednumber.push(this.randomNum); 

      this.NamesRoles.push(this.Roles[this.randomNum]);


      this.NameAvatar.push(this.Avatar[this.randomNum]);

      this.exist=false;

      logger.info(this.NameAvatar+' 1');
      logger.info(this.NamesArray+' 2');
      logger.info(this.NamesRoles+' 3');

    }

    public getRandomInt(max: number) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    

/*
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

        res.json({ message: [
          
            this.NamesArray
          ,
            this.NamesRoles
          ,
            this.NameAvatar
        ]
          
          
      });
    }

    //get table names fro setup
    public getTableNames(req: Request, res: Response) {
      logger.info('e getTableNames request print message');
      //this.TableFileReader();
      //this.fileReader('1');

      res.json({ message: [
          
          this.NamesArray
        ,
          this.NamesRoles
        ,
          this.NameAvatar
        ]
       });
    }

    public getTableStartBool(req: Request, res: Response){
      logger.info('e getTableStartBool request print message');
      res.json({ message: this.StartTable });
    }

    public history(){
      this.i = (this.currentRound - 1) * 7;
      this.j=0;
      for (let index = this.i; index <= index+7; index++){
         this.final[this.j] = JSON.stringify(this.status[index]);
         this.j++;
      }
    }
    /**
     * Broadcasts a received message to all connected clients
     */
    public sendMessageToClients(req: Request, res: Response) {
        const message: any = req.body.message;
        const event: any = req.body.event;
        logger.info(message.scream);
        logger.info(message.userID);

        this.currentRound=message.scream;

        // Sending a broadcast message to all clients
        const socketService = DIContainer.get(SocketsService);
        socketService.broadcast(event, message);

       // await this.fileReader(message.scream);
       logger.info('tv');
     //   this.history();
        logger.info(this.NameAvatar);
        logger.info(this.NamesArray);

       // logger.info(this.final);
        logger.info(this.NamesRoles );

      
        res.json({ message: [this.NamesArray,this.NameAvatar]});

    }

}
