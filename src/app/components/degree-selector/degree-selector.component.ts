import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-degree-selector',
  templateUrl: './degree-selector.component.html',
  styleUrls: ['./degree-selector.component.scss']
})
export class DegreeSelectorComponent implements OnInit {
  arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

  constructor(private bottomSheetRef: MatBottomSheetRef) { }

  ngOnInit(): void {
  }

  sendData(val){
    this.bottomSheetRef.dismiss(val)
  }

}
