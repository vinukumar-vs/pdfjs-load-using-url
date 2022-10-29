import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { PdfViewComponent } from './main/pdf-view/pdf-view.component';
import { PdfHandlerService } from './pdf-handler.service';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PdfViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ PdfHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
