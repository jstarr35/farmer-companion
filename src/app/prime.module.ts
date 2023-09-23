import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { SidebarModule } from 'primeng/sidebar';
import { DataViewModule } from 'primeng/dataview';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { AnimateModule } from 'primeng/animate';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { DockModule } from 'primeng/dock';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FileUploadModule,
    ButtonModule,
    CardModule,
    SidebarModule,
    DataViewModule,
    RippleModule,
    ToastModule,
    PanelModule,
    ProgressSpinnerModule,
    DividerModule,
    AnimateModule,
    TagModule,
    AccordionModule,
    DialogModule,
    DockModule,
    DynamicDialogModule,
    InputTextareaModule,
    TableModule,
    ScrollPanelModule
  ],
  exports: [
    ButtonModule,
    CardModule,
    DropdownModule,
    FileUploadModule,
    SidebarModule,
    DataViewModule,
    RippleModule,
    ToastModule,
    PanelModule,
    ProgressSpinnerModule,
    DividerModule,
    AnimateModule,
    TagModule,
    AccordionModule,
    DialogModule,
    DockModule,
    DynamicDialogModule,
    InputTextareaModule,
    TableModule,
    ScrollPanelModule
  ],
})
export class PrimeModule {}
