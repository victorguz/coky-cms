import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './view/app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,

    // MatTableModule,
    // MatPaginatorModule,
    // MatFormFieldModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
