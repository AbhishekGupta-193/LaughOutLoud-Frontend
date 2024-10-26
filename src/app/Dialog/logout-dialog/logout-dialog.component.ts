import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent {

  constructor(public dialogRef: MatDialogRef<LogoutDialogComponent>,private router:Router) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/signup']);
    this.dialogRef.close();
  }
}
