import { HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

interface UploadEvent {
  originalEvent: HttpEvent<any>;
  files: File[];
}

interface UploadEventHandler {
  files: File[];
}

@Component({
  selector: 'app-inventory-upload',
  templateUrl: './inventory-upload.component.html',
  styleUrls: ['./inventory-upload.component.scss'],
  providers: [MessageService, DynamicDialogRef]
})
export class InventoryUploadComponent {
  uploadedFiles: any[] = [];
  csvContent!: string;
  constructor(private messageService: MessageService, public ref: DynamicDialogRef) {}

  onUpload(event:UploadEvent) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
          console.log('Uploaded: ' + file.name);
      }

      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  onFileLoad(fileLoadedEvent: any) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;
    alert(this.csvContent);
  }

  onFileSelect(input: UploadEventHandler) {

    const files = input.files;
    var content = this.csvContent;

   if (files && files.length) {
       /*
        console.log("Filename: " + files[0].name);
        console.log("Type: " + files[0].type);
        console.log("Size: " + files[0].size + " bytes");
        */

        const fileToRead = files[0];

        const fileReader = new FileReader();
        fileReader.onload = this.onFileLoad;

        fileReader.readAsText(fileToRead, "UTF-8");
   }

  }

}
