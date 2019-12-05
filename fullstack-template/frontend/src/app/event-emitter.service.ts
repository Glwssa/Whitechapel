import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';    
    
@Injectable({    
  providedIn: 'root'    
})    
export class EventEmitterService {    
    
  invokeTable_functions_player1 = new EventEmitter<{function_name: string, parameter: string}>();    
  TablesubsVarpl1: Subscription;    
  invokeTable_functions_player2 = new EventEmitter<{function_name: string, parameter: string}>();    
  TablesubsVarpl2: Subscription; 
  invokeTable_functions_player3 = new EventEmitter<{function_name: string, parameter: string}>();    
  TablesubsVarpl3: Subscription; 
  invokeTable_functions_player4 = new EventEmitter<{function_name: string, parameter: string}>();    
  TablesubsVarpl4: Subscription; 
  invokeTable_functions_player5 = new EventEmitter<{function_name: string, parameter: string}>();    
  TablesubsVarpl5: Subscription; 
  invokeTable_functions_player6 = new EventEmitter<{function_name: string, parameter: string}>();    
  TablesubsVarpl6: Subscription; 
  invokeTable_functions_player7 = new EventEmitter<{function_name: string, parameter: string}>();    
  TablesubsVarpl7: Subscription; 
    
  constructor() { }    
    
  Table_functions_player1({function_name, parameter}) {    
    this.invokeTable_functions_player1.emit({function_name,parameter});    
  }  
  Table_functions_player2({function_name, parameter}) {    
    this.invokeTable_functions_player2.emit({function_name,parameter});    
  }  
  Table_functions_player3({function_name, parameter}) {    
    this.invokeTable_functions_player3.emit({function_name,parameter});    
  }  
  Table_functions_player4({function_name, parameter}) {    
    this.invokeTable_functions_player4.emit({function_name,parameter});    
  } 
  Table_functions_player5({function_name, parameter}) {    
    this.invokeTable_functions_player5.emit({function_name,parameter});    
  } 
  Table_functions_player6({function_name, parameter}) {    
    this.invokeTable_functions_player6.emit({function_name,parameter});    
  } 
  Table_functions_player7({function_name, parameter}) {    
    this.invokeTable_functions_player7.emit({function_name,parameter});    
  } 
}