import { NgModule } from '@angular/core';
import { PunktZuKommaPipe } from './punkt-zu-komma.pipe';



@NgModule({
  declarations: [
    PunktZuKommaPipe
  ],
  exports:[
    PunktZuKommaPipe
  ],
})
export class SharedModule { }
