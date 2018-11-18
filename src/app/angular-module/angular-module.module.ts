import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule,MatCardModule,MatButtonModule,MatToolbarModule, MatExpansionModule,MatPaginatorModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,MatInputModule,MatCardModule,MatButtonModule,MatToolbarModule,MatDialogModule,
    MatExpansionModule,MatProgressSpinnerModule,MatPaginatorModule
  
  ],
  exports:[  CommonModule,MatInputModule,MatCardModule,MatButtonModule,MatToolbarModule,MatDialogModule,
    MatExpansionModule,MatProgressSpinnerModule,MatPaginatorModule
  ],
  declarations: []
})
export class AngularModuleModule { }
