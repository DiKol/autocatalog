import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { MaterialModule } from 'src/material.module';

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent,
        MenuComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        MenuComponent
    ]
})
export class SharedModule { }
