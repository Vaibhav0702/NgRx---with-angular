import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


const data : any[] = [MatToolbarModule , CommonModule ,MatButtonModule]

@NgModule({
  declarations: [],
  imports: data ,
  exports : data
})
export class MaterialModule { }
