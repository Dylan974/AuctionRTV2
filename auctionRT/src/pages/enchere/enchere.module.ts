import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EncherePage } from './enchere';

@NgModule({
  declarations: [
    EncherePage,
  ],
  imports: [
    IonicPageModule.forChild(EncherePage),
  ],
})
export class EncherePageModule {}
