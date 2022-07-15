<h2 align="center">ContactApp</h2>

<br>

## Wymagana wiedza

- Typescript, Angular

## Technologie potrzebne do zadania

- Typescript, Angular

## Cele główne

- [ ] Stwórz Formularz dodawania kontaktów:

* Defaultowo wymagany name, typ.
* Typy dostajemy z serwisu musisz założyć narazie 3 typy: `email`, `adress`, `phone`.
* W zależności od typu modyfikujesz formularz(w adresie przyjmuj ulicę, numer domu, kod pocztowy oraz opcjonalnie numer lokalu).
* Opcjonalny również jest kolor kontaktu(użyj paczki aby zaimplementować color picker).
* Formularz służy również do edycji jeżeli jest w trybie edycji widzimy przycisk `Anuluj edycje` zamiast `Zapisz`.

- [ ] Poniżej Formularza wyświetl aktualnie dodane kontakty

* Wyświetlamy pięknie na liście w której każdy row jest stylowany na background color który wybraliśmy w formularzu lub biały jako default.
* Pierwsza pozycja to label `name` + wartość `name`.
* Pierwsza pozycja to label `typ` + wartość `type`, lecz wyświetlamy alias dla każdej wartości nie jego wartość tzn. wartość `email` ma wyświetlać wartość `adres email`.
* Kolejna to label Kontakt oraz w zależności od typu:
  - jeśli email + wartość pola `email`
  - jeśli phone + wartość pola `phone`
  - jeśli adress + wartość pola `adress.street+adress.homeNumber`
* Ostatnia to przycisk edycji oraz w zależności od typu
  - jeśli email to dajmy przycisk który umożliwia wysłanie wiadomości email
  - jeśli phone to dajmy przycisk do wykonania połączenia
  - jeśli adress to kopiujemy sformatowany adres do schowka.

- [ ] Ponadto:

* Kliknięcie w przycisk każdy akcji np. dzownienie do kontaktu powoduje efekt uboczny w postaci wykonania loga z tej akcji(data akcji + opis akcji np. telefon na numer...). Ta logika musi zostać zawarta w serwisie.
* Tworzymy inferfejs do serwisu i budujemy pierwszy przykładowy logger logujący do consoli. Pamiętaj że wykonanie kolejnego serwisu powinno polegać tylko na dopisaniu kolejnego serwisu i dostarczeniu go do aplikacji.

## Przydatne linki

- Dynamiczna zmiana formularzy - https://netbasal.com/three-ways-to-dynamically-alter-your-form-validation-in-angular-e5fd15f1e946
- Dependency injection Service'ów - https://angular.io/guide/architecture-services
