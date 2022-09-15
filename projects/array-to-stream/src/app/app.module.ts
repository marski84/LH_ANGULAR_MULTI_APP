import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArrayStreamSubscriptionComponent } from './array-stream-subscription/array-stream-subscription.component';
import { MessageStreamComponent } from './message-stream/message-stream.component';

@NgModule({
  declarations: [
    AppComponent,
    ArrayStreamSubscriptionComponent,
    MessageStreamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
