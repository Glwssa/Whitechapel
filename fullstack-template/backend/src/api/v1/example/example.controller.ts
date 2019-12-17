import { Request, Response, NextFunction, Router } from 'express';
import { NotFound, BadRequest } from 'http-errors';
import { DIContainer, MinioService, SocketsService } from '@app/services';
import { logger } from '../../../utils/logger';
import * as  fs from 'fs';
import * as path from 'path';

export class ExampleController {
  testStatus=[1,1,1,1,1,1,1,1,1,0,1,1,0,1];

    //Avatars:
    // https://i.imgur.com/yOxs9eW.png -monica
    // https://i.imgur.com/6f6DPhk.png -Bin
    // https://i.imgur.com/lJ3ggBw.png -Cirus
    // https://i.imgur.com/zaleAlv.png -Ed
    // https://i.imgur.com/dkszoEI.png -Seth
    // https://i.imgur.com/j5Haq2A.png -Barack
    // https://i.imgur.com/g2vt5Hk.png -Ariana
    //Characters:
    // https://i.imgur.com/9LzwD2L.png -Constable
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
    public currentStatus: number[] = [];
    public TableNamesImagesCharacterscurrentStatus: string[][];
    public calls: number;
    public StartTable: boolean = false;
    public countdead: number = 0;
  NamesArray: string[] = [];
  ReadyPlayersCounter: number = 0;
  NamesRoles:string [] = [];
  Rolakia = ['Constable','Jocker','Vigilante','Mayor','Medium','Killer','Docktor'];
  Roles=['https://i.imgur.com/9LzwD2L.png','https://i.imgur.com/Hl9HvHp.png','https://i.imgur.com/VZVnvpp.png','https://i.imgur.com/W3WK2IQ.png','https://i.imgur.com/vth8OLN.png','https://i.imgur.com/cIwiHJe.png','https://i.imgur.com/yb3YgnB.png'];
  exist=false;
  randomNum: number;
  RolesByName:string[] = [];
  usednumber: number[] = [];
  NameAvatar: string[] = [];
  Avatar= ['https://i.imgur.com/yOxs9eW.png', 'https://i.imgur.com/6f6DPhk.png', 'https://i.imgur.com/lJ3ggBw.png', 'https://i.imgur.com/zaleAlv.png', 'https://i.imgur.com/dkszoEI.png', 'https://i.imgur.com/j5Haq2A.png', 'https://i.imgur.com/g2vt5Hk.png'];
  status: number[]  = [];
  currentRound: number;
  i: number;
  j: number;
  end: number = 0;
  AllVotes: string [] = [];
  CurrrentRoundVotes: string [] = [];
  PlayerVote: number;
  VoterIndex: any;
  VotedAvatar: string;
  totalVotes: number=0;
  VoterAvatar: string;
  tempVoteArray=['','','','','','',''];
  countVotes=[0,0,0,0,0,0,0];
    /**
     * Apply all routes for example
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();

        router
            .post('/sendMessageToClients',(req: Request, res: Response)=>{ this.sendMessageToClients(req,res)})
            .post('/StoreVotes',(req: Request, res: Response)=>{ this.StoreVotes(req,res)})
            .post('/setNames',(req: Request, res: Response)=>{ this.setNames(req,res)})
            .get('/getMessage', this.getMessage)
            .get('/getTableNames', (req: Request, res: Response)=>{ this.getTableNames(req,res)})
            .get('/getMobileNames', (req: Request, res: Response)=>{ this.getMobileNames(req,res)})
            .get('/getTableStartBool', (req: Request, res: Response)=>{ this.getTableStartBool(req,res)});

        return router;
    }
    public getMobileNames(req: any, res: any) {
      res.json({ message: [this.NamesArray,this.NameAvatar,this.RolesByName]});
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
      if(this.ReadyPlayersCounter==7){
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
      this.RolesByName.push(this.Rolakia[this.randomNum]);

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
      if ( this.currentStatus === undefined || this.currentStatus.length < 15) {
        this.currentStatus = [];
      }

      logger.info('FS');
      fs.readFile(path.join(__dirname, '../example/test' + round + '.txt'), 'utf8', (error, data) => {
        this.data = data;
      });

      this.retData = this.data.split(/\n/g);
      const i = 0;
      for (const  row of this.retData) {
        const value = row.split(' ');
        if ( this.currentStatus === undefined || this.currentStatus.length === 0) {
            this.currentStatus = value;
            continue;
        }
        this.currentStatus.push(value[0]);
        this.currentStatus.push(value[1]);
      }
    }

    /*public async TableFileReader() {
      if ( this.TableNamescurrentStatus === undefined || this.TableNamescurrentStatus.length < 15) {
        this.TableNamescurrentStatus = [];
      }

      logger.info('FS');
      fs.readFile(path.join(__dirname, '../example/PlayerName-Images.txt'), 'utf8', (error, Tabledata) => {
        this.Tabledata = Tabledata;
      });

      this.retDataTable = this.Tabledata.split(/\n/g);
      
      for (const  row of this.retDataTable) {
        const Tablevalue = row.split(' ');
        if ( this.TableNamescurrentStatus === undefined || this.TableNamescurrentStatus.length === 0) {
            this.TableNamescurrentStatus = Tablevalue;
            continue;
        }
        this.TableNamescurrentStatus.push(Tablevalue[0]);
        this.TableNamescurrentStatus.push(Tablevalue[1]);
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
      this.currentStatus = [];
      this.CurrrentRoundVotes = [];
      this.i = (this.currentRound) * 7; // 7 
      logger.info(this.status);
      for (let index = this.i; index < this.i+7; index++){ 
         this.currentStatus.push(this.status[index]);
         this.CurrrentRoundVotes.push(this.AllVotes[index-7]);
      }
    }

    public StoreVotes(req: Request, res: Response){
      logger.info('ebala vote');
        const message: any = req.body.message;
        this.PlayerVote = message.scream;
        this.VoterIndex = message.userID;
        this.VotedAvatar = this.NameAvatar[this.PlayerVote];
        this.countVotes[this.PlayerVote]++;
        this.totalVotes++;
        this.tempVoteArray[this.VoterIndex] = this.VotedAvatar;
        if(this.totalVotes===1-this.countdead){
          logger.info('mphka sta votes');
          this.countdead++;
          this.totalVotes=0;
          this.AllVotes.push(this.tempVoteArray[0]);
          this.AllVotes.push(this.tempVoteArray[1]);
          this.AllVotes.push(this.tempVoteArray[2]);
          this.AllVotes.push(this.tempVoteArray[3]);
          this.AllVotes.push(this.tempVoteArray[4]);
          this.AllVotes.push(this.tempVoteArray[5]);
          this.AllVotes.push(this.tempVoteArray[6]);
          var max = Math.max(...this.countVotes);
          var maxIndex = this.countVotes.indexOf(max);
          var statusLength = this.status.length;
          var statusStart = statusLength-7;    //14l  0-6  7-13  
          var k =0;
          for ( k = statusStart; k < statusStart+maxIndex-1; k++) {
            this.status.push(this.status[statusStart+k]);
          }
          this.status.push(this.status[statusStart+maxIndex]);
          this.status[statusStart+maxIndex+statusLength] = 0;

          var g;
          for (g = statusStart+maxIndex+1; g < statusLength; g++) { // 7 theseis. 5h thesh.  0-3, 4 , 5-6
            this.status.push(this.status[statusStart+g]);
            
          }
          this.tempVoteArray=['','','','','','',''];
          this.countVotes=[0,0,0,0,0,0,0];
          res.json({ message: statusStart+maxIndex});

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
        this.history();
        logger.info(this.NameAvatar);
        logger.info(this.NamesArray);

        logger.info(this.currentStatus);
        logger.info(this.NamesRoles );

        logger.info(this.status.length);
        res.json({ message: [this.NamesArray,this.NameAvatar,this.currentStatus,this.CurrrentRoundVotes]});


    }

}
