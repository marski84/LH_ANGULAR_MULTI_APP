<h2 align="center">Abstract Table</h2>

<br>

## Wymagana wiedza

- Typescript, Angular

## Technologie potrzebne do zadania

- Typescript, Angular, content projection + templateOutlet

https://medium.com/@danilrabizo/reusable-angular-material-table-ac0b02162293

## Cele główne

- [ ] Stwórz reużywalny component AbstractTable:

* Przyjmuje tablice obiektów i wyświetla je w formie tabelki
* Obsługuje takie dane w obiekcie jak string, number, boolean, data.
* Przy każdym row posiada wbudowane przyciski takie jak remove oraz edit które emitują zdarzenia do parenta.
* Przyjmuje od parenta opcjonalne customowe button'y które są wyświetlane na początku lub końcu każdego z item'ów tabelki(content projection).

- [ ] Przygotuj sobie przykładowe mockupy danych aby obsłużyć logikę dla poniższych modułów.

* produkt to: nazwa, opis, data ostatniej zmiany oraz boolean czy jest na stanie.
* hurtownia to: nazwa, score(ocena hurtowni załóżmy od 0-100), numer telefonu.

- [ ] Stwórz feature moduł produktów:

* Stwórz logikę do wyświetlania listy oraz edycji produktów wedle uznania(oczywiście ma być poprawna i czysta).
* Do wyświetlenia produktów użyj `AbstractTable`
* W tabelce musi być widoczny przycisk który umożliwia zmiane statusu dostępności(treść przycisku zależna od flagi).

- [ ] Moduł feature moduł hurtowni:

* Stwórz logikę do wyświetlania listy oraz edycji hurtownii.
* Do wyświetlenia użyj `AbstractTable`
* W tabelce musi być widoczny przycisk który otwiera `mat-menu`
* Wewnątrz mat-menu przycisk który umożliwia zadzwonienie do hurtowni oraz drugi kopiujący nazwę hurtowni do schowka.

- [ ] Całość sklep w ContainerComponent:

* Nawigacja w aplikacji wykonana z pomocą `mat-sidenav`.

## Przydatne linki

- content projection + templateOutlet - https://www.angular.love/2020/06/28/angular-nieco-inne-podejscie-do-personalizowania-szablonu-komponentow/
