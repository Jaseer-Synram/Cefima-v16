import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortDirective } from '../directive/sort.directive';
import { SortPipe } from '../sort.pipe';

// import { AngularFullpageModule } from "@fullpage/angular-fullpage";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from "@angular/material/menu";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatRippleModule } from "@angular/material/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import * as owlCarousel from "ngx-owl-carousel-o";
import { MatRadioModule } from "@angular/material/radio";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { RecaptchaModule } from "ng-recaptcha";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { TabsModule } from "ngx-bootstrap/tabs";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from '@angular/material/table';
import {  } from 'ngx-intl-tel-input'
import { PdfViewerModule } from 'ng2-pdf-viewer';



import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule, } from "@angular-material-components/datetime-picker";
import { GooglePlaceModule } from "@barkhub/ngx-google-places-autocomplete"
// import { AngularFullpageModule } from '@fullpage/angular-fullpage'



@NgModule({
  declarations: [
    SortPipe,
    SortDirective,
  ],
  imports: [
    CommonModule,
    // AngularFullpageModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatStepperModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatRippleModule,
    MatProgressBarModule,
    owlCarousel.CarouselModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatInputModule,
    RecaptchaModule,
    ClipboardModule,
    MatDialogModule,
    MatDatepickerModule,
    TabsModule,
    MatListModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatMenuModule,
    MatExpansionModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    GooglePlaceModule,
    MatTableModule,
    PdfViewerModule
  ], exports: [
    CommonModule,
    // AngularFullpageModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatStepperModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatRippleModule,
    MatProgressBarModule,
    owlCarousel.CarouselModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatInputModule,
    RecaptchaModule,
    ClipboardModule,
    MatDialogModule,
    MatDatepickerModule,
    TabsModule,
    MatListModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatMenuModule,
    MatExpansionModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    GooglePlaceModule,
    MatTableModule,
    SortPipe,
    SortDirective,
    PdfViewerModule
  ]
})
export class SharedModule { }
