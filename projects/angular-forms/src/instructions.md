<h2 align="center">Angular Forms</h2>

<br>

## Wymagana wiedza

- Angular, Typescript, Reactive programming

## Technologie potrzebne do zadania

- Angular, Typescript, RxJS, Subject

## Cele główne

- [ ] Stwórz formularz reaktywny w angularze do edycji danych kontaktowych w profilu.

* Formularz posiada pola: email, nazwe, typ konta(osoba/firma), jeżeli typ konta = firma to pojawia sie pole NIP.
* Formularz nie posiada submita ale zamiast tego podpinamy się pod strumień valueChanges tego formularza.
* Jeżeli formularz jest prawidłowy to wywołujemy symulacje obliczeń na tym formularzu tzn. podaną poniżej funkcje `parseData`.
* Zmiany w formularzu muszą czekać na 500ms bez zmian aby rozpocząć strumień `parseData` (nie parsujemy przy każdym kliknięciu).
* Jeżeli wywoła się update w czasie trwania obecnego strumienia `parseData` musimy zastąpić go nowym strumieniem
* Dodatkowo dla siebie pokaż wynik strumienia w console.log
* Tip: pamiętaj że nie tylko formularz posiada wartość valueChanges ale każda kontrolka rówież.

- [ ] Wyświetlamy wartość strumienia `parseData` w komponencie pod formularzem.

* Preview posiada placeholder jeżeli jesteśmy przed pierwszą emisją strumienia.
* Preview posiada loader `<mat-spinner>` który jest aktywny tylko w czasie trwania strumienia.

## Przydatne linki

## Początek kodu

```javascript
function parseData(
  email: string,
  name: string,
  type: string,
  nip?: string
): Observable<string> {
  const res = `email: ${email} | name: ${name} | type: ${type} ${
    nip ? "NIP:" + nip : ""
  }`;
  return of(res).pipe(
    delay(2000) // simulation of calculation proccess
  );
}
```
