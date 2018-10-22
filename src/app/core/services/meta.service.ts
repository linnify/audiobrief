import { Injectable } from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(
    private meta: Meta,
  ) { }


  generateTags(config) {
    // default values
    config = {
      title: 'AudioBrief',
      description: '',
      // image: 'https://angularfirebase.com/images/logo.png',
      ...config
    };

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@audiobrief' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    // this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'AudioBrief' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    // this.meta.updateTag({ name: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:url', content: config.url });
    console.log(config);
  }

}
