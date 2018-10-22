import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'audionews';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    const iconDefinitions = {
      facebook: 'assets/facebook.svg',
      twitter: 'assets/twitter.svg',
      linkedin: 'assets/linkedin.svg',
      copy: 'assets/copy.svg'
    };
    Object.keys(iconDefinitions).forEach(key => {
      this.matIconRegistry.addSvgIcon(
        key,
        this.sanitizer.bypassSecurityTrustResourceUrl(iconDefinitions[key])
      );
    });
  }
}
