import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[primeiraLetraMaiuscula]'
})
export class PrimeiraLetraMaiusculaDirective {

  preposicoes: Array<string> = [
    'da',
    'das',
    'de',
    'do',
    'dos',
    'para',
    'que',
    'com'
  ];

  constructor(private element: ElementRef) {}

  @HostListener('blur') onBlur() {
    this.primeiraLetraMaiuscula();
  }

  @HostListener('keypress', ['$event']) onKeyPress(event: { keyCode: number; }) {
    if (event.keyCode == 13)
      this.primeiraLetraMaiuscula();
  }

  primeiraLetraMaiuscula() {
    let input: HTMLInputElement = this.element.nativeElement;
    let texto = input.value;
    texto = texto.trim();
    let palavras = texto.split(' ');
    let result: Array<string> = [];
    for (let palavra of palavras) {
      if (palavra !== '') {
        if (this.preposicoes.indexOf(palavra) > -1)
          result.push(palavra.toLowerCase())
        else
          result.push(palavra[0].toUpperCase() + palavra.substring(1, palavra.length).toLowerCase())
      }
    }
    input.value = result.join(' ');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

}
