import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from 'src/app/Dialog/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '200px',
      height: '150px',
      position: { top: '-670px', left: '840px' },
      panelClass: 'custom-dialog-container'
    });
  }
}
