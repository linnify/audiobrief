import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {NewsEntry} from '../../../news/types/news-entry';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'audiobrief-share',
  template: `
    <button *ngIf="icon" mat-icon-button class="main-button" [matMenuTriggerFor]="shareMenu"
            (click)="$event.stopPropagation()">
      <mat-icon class="big-icon">share</mat-icon>
    </button>
    <div  *ngIf="!icon" class="mat-title" [matMenuTriggerFor]="shareMenu">
      SHARE
    </div>
    
    <mat-menu #shareMenu="matMenu">

      <button mat-menu-item (click)="onOpenUrl('https://www.facebook.com/sharer/sharer.php?u=')">
        <mat-icon svgIcon="facebook"></mat-icon>
        <span>Facebook</span>
      </button>
      <button mat-menu-item (click)="onOpenUrl('https://twitter.com/home?status=')">
        <mat-icon svgIcon="twitter"></mat-icon>
        <span>Twitter</span>
      </button>
      <button mat-menu-item (click)="onOpenUrl('https://www.linkedin.com/shareArticle?mini=true&url=')">
        <mat-icon svgIcon="linkedin"></mat-icon>
        <span>Linkedin</span>
      </button>
      <button mat-menu-item ngxClipboard [cbContent]="newsEntry.url" (cbOnSuccess)="onCopySuccess()">
        <mat-icon svgIcon="copy"></mat-icon>
        <span>Copy link</span>
      </button>
    </mat-menu>
  `,
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  @Input() newsEntry: NewsEntry;
  @Input() icon: boolean;

  @Output() openUrl: EventEmitter<string> = new EventEmitter<string>();

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onOpenUrl(sharerUrl: string): void {
    const url: string = `${sharerUrl}${environment.apiUrl}/social/${this.newsEntry.id}/`;
    this.openUrl.emit(url);
  }

  onCopySuccess() {
    this.snackBar.open('News link copied successful', '', {
      duration: 400
    });

  }
}
