import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InventoryUploadComponent } from 'src/app/inventory/inventory-upload/inventory-upload.component';

@Component({
  selector: 'app-actions-dock',
  templateUrl: './actions-dock.component.html',
  styleUrls: ['./actions-dock.component.scss'],
  providers: [MessageService, DialogService],
})
export class ActionsDockComponent {
  displayFileUpload: boolean = false;
  displayActiveBosses: boolean = true;
  displaySettings: boolean = false;
  dockItems!: MenuItem[];
  ref: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private router: Router
  ) {}



  show() {
    this.ref = this.dialogService.open(InventoryUploadComponent, {
      header: 'Select a Product',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      closable: true,
      maximizable: true,
    });

    this.ref.onClose.subscribe((product: any) => {
      if (product) {
        this.messageService.add({
          severity: 'info',
          summary: 'Product Selected',
          detail: product.name,
        });
      }
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Maximized',
        detail: `maximized: ${value.maximized}`,
      });
    });
  }

  ngOnInit() {
    this.dockItems = [
      {
        label: 'Home',
        icon: '../../../assets/home.svg',
        tooltipOptions: {
          tooltipLabel: 'Home',
          tooltipPosition: 'top',
          positionLeft: 15,
          positionTop: -15,
          showDelay: 800,
        },
        command: () => {
          this.router.navigate(['/home']);
        },
      },
      {
        label: 'Bosses',
        icon: '../../../assets/bosses.svg',
        tooltipOptions: {
          tooltipLabel: 'Active Bosses',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 800,
        },
        command: () => {
          this.router.navigate(['/bosses']);
        },
      },
      {
        label: 'Inventory',
        icon: '../../../assets/inventory.svg',
        tooltipOptions: {
          tooltipLabel: 'Upload Inventory',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 800,
        },
        command: () => {
          this.show();
          this.router.navigate(['/inventory']);
        },
      },
      {
        label: 'Settings',
        icon: '../../../assets/settings.svg',
        tooltipOptions: {
          tooltipLabel: 'Settings',
          tooltipPosition: 'top',
          positionLeft: 15,
          positionTop: -15,
          showDelay: 800,
        },
        command: () => {
          this.router.navigate(['/settings']);
        },
      }
    ];
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
