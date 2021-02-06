import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, ComponentsModule, HttpClientModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
