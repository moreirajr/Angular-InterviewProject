import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  message: string = "Tem certeza que deseja realizar essa operação?"
  confirmButtonText = "Sim"
  cancelButtonText = "Não"

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>) 
    {
      if(data){
        this.message = data.message || this.message;
      }
    }

    onConfirmClick(): void {
      this.dialogRef.close(true);
    }
}