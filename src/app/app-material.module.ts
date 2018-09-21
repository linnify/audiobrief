import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatChipsModule, MatDialogModule,
  MatDividerModule, MatExpansionModule,
  MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule,
  MatProgressSpinnerModule, MatSliderModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule,
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
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatChipsModule
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
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatChipsModule
  ],
})
export class AppMaterialModule {}
