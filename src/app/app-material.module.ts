import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatDividerModule, MatExpansionModule,
  MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule,
  MatProgressSpinnerModule, MatSliderModule, MatToolbarModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatExpansionModule,
    MatSliderModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatMenuModule,
    MatDialogModule
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatExpansionModule,
    MatSliderModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatMenuModule,
    MatDialogModule
  ],
})
export class AppMaterialModule {}
