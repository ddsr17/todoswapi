import { Component } from '@angular/core';
import { BackendService } from './backend.service';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  list: any;
  isHidden: boolean;

  constructor(private backend: BackendService){
    this.isHidden = true;
  }

//  [ip1 -> [{},{}], ip2 -> [{}], ip3 -> ]


  containsIp(ip,list){
    for(let i = 0;i < list.length;i++){
        if(ip in list[i]){
          return i;
        }
    }
    return -1;
  }

  ngOnInit(){
    let result = [];
    this.backend.getData().subscribe(res => {

      for(var keys in res){
        let index = this.containsIp(res[keys].ip,result);
        if( index > 0){
          result[index][res[keys].ip].push(res[keys]);
        }
        else{
          let arr = [];
          arr.push(res[keys]);
          let key1 = res[keys].ip;
          let temp1 = {};
          temp1[key1]  = arr;
          result.push(temp1);
        }
      }


      for(let i =0 ; i < result.length; i++){
        let firstValue = Object.keys(result[i])[0];
        let arr = result[i][firstValue];
        let countUp = 0;
        let countDown = 0;
        //for(var j = 0; j < arr.length; j++){
        for(keys in arr){
          if(arr[keys].status == 'RUNNING'){
              countUp++;
          }
          else if(arr[keys].status == 'DOWN'){
              countDown++;
          }
        }
        if(countUp == arr.length){
          result[i].color = "green";
        }
        else if(countDown == arr.length){
          result[i].color = "red";
        }
        else
          result[i].color = "yellow";

        result[i].isHidden = true;
      }
      this.list = result;
      console.log("final value is ",this.list);

    });
  }

  toggleModalValue(index){
    let flag = this.list[index].isHidden;
    this.list[index].isHidden = !flag;
  }
}
