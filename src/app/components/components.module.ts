import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { ResultComponent } from './result/result.component';

@NgModule({
    declarations: [HeaderComponent, FooterComponent, BodyComponent, ResultComponent],
    imports: [CommonModule],
    exports: [HeaderComponent, FooterComponent, BodyComponent, ResultComponent],
})
export class ComponentsModule {}
