import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';

import { ContentsListComponent } from './components/contents-list.components';
import { ContentNewComponent } from './components/content-new.components';
import { ContentEditComponent } from './components/content-edit.components';

@NgModule({
  declarations: [
    AppComponent,
    ContentsListComponent,
    ContentNewComponent,
    ContentEditComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    HttpModule,
    FormsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
