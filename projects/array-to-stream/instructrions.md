<h2 align="center">Array to stream</h2>

<br>

## Wymagana wiedza

- Typescript, Reactive programming

## Technologie potrzebne do zadania

- Typescript, RxJS

## Cele główne

Poniżej masz zmienną w postaci tablicy, chcemy się z nią trochę pobawić tak żeby lepiej poznać koncepcje programowania reaktywnego.

- [ ] Na początku chcemy zamienić naszą tablicę na strumień pojedyńczych wartości o typie string czyli poprostu `Observable<string>`
- [ ] Za pomocą funkcji `.pipe` dostępnej w strumieniu musimy wykonać następujące operacje:

* Zmapuj na dużą literę.
* Zrób console.log wartości zaraz przed mapowaniem.
* Pomiń emisje 2 pierwszych liter oraz nasłuchuj tylko na 4 kolejne emisje => nie zmieniasz tablicy tylko operujesz na strumieniu.
* Opóźnij emisje każdej kolejnej wartości o 2sekundy

- [ ] Wykonaj subskrypcję naszego strumienia wykonując console.log'a naszej wartości z strumienia.
- [ ] Po zakończeniu strumienia pokaż w console.log napis `Stream done!`.

## Przydatne linki

- Init project - https://medium.com/codingthesmartway-com-blog/getting-started-with-rxjs-part-1-setting-up-the-development-environment-creating-observables-db76ce053725

## Początek kodu

```javascript
const array = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

// symulacja wyniku
// c
// C
// ...2sekundy
// d
// D
// ...2sekundy
// e
// E
// ...2sekundy
// f
// F
// Stream done!
```
