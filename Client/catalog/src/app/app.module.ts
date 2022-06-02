import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from 'src/material.module';
import { FeatureModule } from './features/feature.module';
import { HttpClientModule } from '@angular/common/http';
import { BrandDataService } from './features/brand/service/brand-data.service';
import { ModelDataService } from './features/model/service/model-data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    FeatureModule
  ],
  providers: [
    BrandDataService,
    ModelDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
