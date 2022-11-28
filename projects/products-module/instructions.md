<h2 align="center">ProductsModule</h2>

<br>

## Wymagana wiedza

- Angular, Typescript, Reactive programming

## Technologie potrzebne do zadania

- Angular, Typescript, RxJS, Subject

## Cele główne

- [ ] Stwórz komponent do wyświetlenia listy produktów.

* Wyświetl w materialowej tabelce produkty z api podanego poniżej.
* Obsłuż paginacje oraz sortowanie.

- [ ] Stwórz komponent dla pojedyńczego produktu.

* Wyświetl formularz do edycji produktu
* Przycisk do submitu produktu możliwy tylko jeżeli formularz jest valid inaczej jest disabled
* Po edycji przenosimy do strony z produktami
* Wejście na komponent wymaga wcześniejszego pobrania danych na temat tego produktu - resolver!

- [ ] Na liście produktów mamy przycisk do dodawania nowego produktu.

* Otwieramy komponent w popupie który emituje ten produkt przy zamknięciu
* Nasłuchujemy na zamknięcie popupu, jeżeli mamy wyemitowany produkt to wysyłamy request o dodanie produktu.

## Przydatne linki

- Fake store API - https://fakestoreapi.com/
