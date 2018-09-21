import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {select, Store} from '@ngrx/store';
import * as topicsStore from '../../../topics/store';
import {Topic} from '../../types/topic';
import {Observable} from 'rxjs';

@Component({
  selector: 'topics-page',
  template: `
    <topics-page-display [topics]="topics$ | async"></topics-page-display>
  `,
  styleUrls: ['./topics-page.component.scss']
})
export class TopicsPageComponent implements OnInit {

  topics$: Observable<Topic[]>;

  constructor(
    public dialogRef: MatDialogRef<TopicsPageComponent>,
    private store: Store<topicsStore.TopicsState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.topics$ = this.store.pipe(select(topicsStore.selectAll));
  }

  onSubmitTopics() {
    this.dialogRef.close();
  }
}
