import {Directive, HostListener, Input} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Directive({
  selector: '[text-copy]'
})
export class TextCopyDirective {

  @Input('text-copy') text: string;

  constructor(public snackBar: MatSnackBar) { }

  @HostListener('click')
  copyText() {
    // We need to create a dummy textarea with the text to be copied in the DOM
    const textArea = document.createElement('textarea');

    // Hide the textarea from actually showing
    textArea.style.position = 'fixed';
    textArea.style.top = '-999px';
    textArea.style.left = '-999px';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    // Set the texarea's content to our value defined in our [text-copy] attribute
    textArea.value = this.text;
    document.body.appendChild(textArea);

    // This will select the textarea
    textArea.select();

    try {
      // Most modern browsers support execCommand('copy'|'cut'|'paste'), if it doesn't it should throw an error
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';

      this.snackBar.open('News link copied successful', '', {
        duration: 400
      });

      console.log(msg);
    } catch (err) {
      console.log('unable to copy');
    }

    // Finally we remove the textarea from the DOM
    document.body.removeChild(textArea);
  }
}
