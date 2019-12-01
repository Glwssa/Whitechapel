import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';    
    
@Injectable({    
  providedIn: 'root'    
})    
export class EventEmitterService {    
    
  invokeTable_functions_player1 = new EventEmitter<{function_name: string, parameter: string}>();    
  TablesubsVarpl1: Subscription;    
    
  constructor() { }    
    
  Table_functions_player1({function_name, parameter}) {    
    this.invokeTable_functions_player1.emit({function_name,parameter});    
  }    
}