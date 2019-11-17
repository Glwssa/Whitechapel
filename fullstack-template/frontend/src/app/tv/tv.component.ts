import { Component, OnInit, } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { style } from '@angular/animations';
import { DirectiveNormalizer } from '@angular/compiler';


@Component({
  selector: 'ami-fullstack-tv',
 /* animations: [
    trigger('transition', [
      // ...
      state('start'),
      state('finish'),
      transition('start => finish', [
        animate('1s')
      ]),
      transition('finish => start', [
        animate('1s')
      ]),
    ]),
  ],*/
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {
  image: string;
  round: number;
  flag: boolean;
  norm: string;
  grey: string;
  arrow: string;
  dead: boolean;
  name: string;

  constructor() {
    // tslint:disable-next-line: max-line-length
    this.image = 'https://previews.dropbox.com/p/thumb/AAlCwdX1S67mQAkOvxJGEeoTyw1xgBQy68ZxWeCF17-h1nAI4QYSdN5itMSi2PRHTuq6gYG0OMkYE5NXXvMe9nT2iPpfq0-mA1zMx9e4O88SjtRnRH0CnkCjI4R2XOmhA0rAizncUlzz-WXnoUxNro-LaFoDRmoj3KPs2RcvNSh9abs9IuI2v5IgQI5p1_aCNxN8wti8PBIbOPmJzs5qMGHJskTGLoVqx86vpi8urTIPXQ-K2YXanjpA7rj2zCgPH6y5KeOmsXYakVVIZzIYiYDSvPOvOnGefPR1fxFECcgzGr4Z6orl4vd0AH4Z7y-bd9ELB1pppJN1jq5IXisme_iH/p.png?fv_content=true&size_mode=5';
    // tslint:disable-next-line: max-line-length
    this.arrow = 'https://previews.dropbox.com/p/thumb/AAlobpP0kAki4tI873qjX53B9K2EPEmjlwHkqXIHP9W00TY11qePbngAUidrlvVtxTa_0BFyO80OV6SqwepBehKwi1NJfnkmhGei6AJM5eo9QYQli3nn0XIU_fm9h0i73vhtaYCyQNjPC6RKJjhvErx22NfpY7w1Zp5ICNKezoU3ZW2cChPz9XUySZhhLgtSytPuOH554a_NmCw5HUHqxN8NtQGpDZYO507izLmYyxIWVsL_jvCT-BqezkMdiw2lGlqbb__D0ADoc9mt0NxDz8OIukoB6iRrAMeTMBrLInSTFps5AlQOnoNQgQOSRwTZvzWY7QXhrSFuiOHjpDqcBveQ/p.png?fv_content=true&size_mode=5';
    this.round = 1;
    this.flag = false;
    this.norm = 'saturate(1)';
    this.grey = 'saturate(0)';
    this.dead = true;
    this.name = 'Strataras';
   }


  ngOnInit() {
  }

  increment() {
    ++this.round;
  }
  deincrement() {
    --this.round;
  }

  satur() {
    this.flag = true;
    this.dead = false;
  }

}


