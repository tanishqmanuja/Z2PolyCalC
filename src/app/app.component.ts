import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DegreeSelectorComponent } from './components/degree-selector/degree-selector.component';
declare var Polynomial: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  preOperand = ""
  preOperandDisplay = ""
  curOperand = ""
  operation = undefined
  maxDegree = undefined

  constructor(private bottomSheet: MatBottomSheet){

  }

  ngOnInit(){
    Polynomial.setField('Z2')
  }

  enterNumber(ev){
    if(this.curOperand=='0') this.curOperand = this.curOperand.slice(0,-1)
    this.curOperand += ev.target.innerText
  }
  
  enterSymbol(s){
    if(this.curOperand=='0') this.curOperand = this.curOperand.slice(0,-1)
    this.curOperand += s
  }

  enterOperation(op){
    if(!this.preOperand && !this.curOperand) return;
    if(this.preOperand != ""){
      this.compute()
    }
    this.operation = op
    this.preOperand = this.curOperand
    this.preOperandDisplay = this.curOperand + " " + op
    this.curOperand = "";
  }

  deleteLast(){
    this.curOperand = this.curOperand.slice(0,-1)
  }

  compute(){
    let x = new Polynomial(this.preOperand)
    let y = new Polynomial(this.curOperand)
    let ans = y.add((new Polynomial()))
    if(this.operation == 'add'){
      ans = x.add(y)
    }
    if(this.operation == 'mul'){
      ans = x.mul(y)
    }
    if(this.operation == 'div'){
      ans = x.div(y)
    }
    if(this.operation == 'mod'){
      ans = x.mod(y)
    }

    ans = this.limtDegree(ans.toString(),this.maxDegree)
    console.log("prevOp : ",x.toString())
    console.log("curOp : ",y.toString())
    console.log("Ans : ",ans.toString())
    
    this.curOperand = ans.toString()
    this.operation = undefined
    this.preOperand = ""
    this.preOperandDisplay = ""
  }

  reset(){
    this.preOperand = ""
    this.preOperandDisplay = ""
    this.curOperand = ""
    this.operation = undefined
  }

  setDegree(){
    let sheet = this.bottomSheet.open(DegreeSelectorComponent)
    window.history.pushState({noBackExitsApp: true},'') 
    sheet.afterDismissed().subscribe((val)=>{
      window.history.back()
      this.maxDegree = val ? parseInt(val) : undefined
    })
  }

  private limtDegree(p,deg){
    if(!deg) return p;
    let poly = new Polynomial(p)
    if(poly.degree() < deg) return poly;
    
    let str = poly.toString().split('')
    for(let i=0;i<str.length-1;i++){
        if(str[i]=='^' && parseInt(str[i+1]) >= deg) str[i+1] = parseInt(str[i+1])-deg;   
    }
    return new Polynomial(str.join(''))
  }
}
