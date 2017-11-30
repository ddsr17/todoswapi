import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() item: any;
  @Input() isHidden: any;
  runningList:Array<String>;
  downList:Array<String>;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(){
    this.runningList = [];
    this.downList = [];
    let firstValue = Object.keys(this.item)[0]
    let res = this.item[firstValue];

    for(let k = 0;k < res.length;k++){
      if(res[k].status == "RUNNING")
        this.runningList.push(res[k].serviceName);
      else if(res[k].status == "DOWN")
        this.downList.push(res[k].serviceName);
    }

    console.log("running list is ",this.runningList);
    console.log("down list is ",this.downList);
  }

}
