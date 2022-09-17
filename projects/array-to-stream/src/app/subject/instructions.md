<h2 align="center">subject</h2>

<br>

## Wymagana wiedza

- Typescript, Reactive programming

## Technologie potrzebne do zadania

- Typescript, RxJS, Subject

## Cele główne

- [ ] Stwórz funkcję getPostalCodeDetails() która ma za zadanie zwrócić strumień z danymi dla kodu pocztowego.

* Request wykonaj za pomocą metody ajax pochodzącej z RxJs.
* Endpoint to `https://api.zippopotam.us/us/${postalCode}`
* Metoda może przyjmować różne kody pocztowe i na ich podstawie wysyłać request do api.

- [ ] Poniżej mamy tablice która trzyma w sobie różne kody pocztowe.

* Zamień ją na strumień kodów pocztowych.
* Strumień mapujesz na requesty z swojej metody getPostalCodeDetails(). => doczytaj o higher order operators w RxJs
* Najlepiej niech requesty lecą jeden po drugim(nie jednocześnie wszystkie), Nie chcemy przekraczać limitu requestów per sekunda.
* Pamiętaj o obsłudze błędów, bo któryś z kodów może zrobić Ci na złość.

- [ ] newPostalDataAppears$ - to Subject zapoznaj sie z nim bo jest bardzo pomocny

* Zasubskrybuj go oraz na każdej jego emisji złap wartość nowych danych które pojawiły się w aplikacji i dodawaj do postalCodeData;
* Emituj wartość do tego Subjecta zawsze gdy pobierzesz informcje o kolejnych kodzie pocztowym;
* Wywołaj console.log'a każdej nowej informacji która tutaj wpadnie.

- [ ] apiError$ - podobnie do newPostalDataAppears

* Nasłuchuj na błędy pochodzące z api. W tym miejscu moglibyśmy reagować na określone rodzaje błędów w całej aplikacji. My pozostajemy na tym aby wywołać console.log informujący o błędzie i jego kodzie.
* Emitujemy wartość w tym Subject'cie gdy pojawi się błąd w api.

- [ ] Pamiętaj o poprawnym otypowaniu całości aplikacji.

## Przydatne linki

- Subjects - https://www.youtube.com/watch?v=uZOmUIlPMN8

## Początek kodu

```javascript
const postalCodes = ["90210", "33162", "I will crush your plan :)", "33163"];
const postalCodeData = []; // postalCode + tablica places( sama nazwa miejsca )
const newPostalDataAppears$ = new Subject();
const apiError$ = new Subject();
```
