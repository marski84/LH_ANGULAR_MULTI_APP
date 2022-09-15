<h2 align="center">messages stream</h2>

<br>

## Wymagana wiedza

- Typescript, Reactive programming

## Technologie potrzebne do zadania

- Typescript, RxJS

## Cele główne

- [ ] Mamy array notyfikacji podany poniżej zrób z niego strumień który emituje wartość co kilka sekund(nie subskrybuj go).

* Pamiętaj że ma emitować każdą pojedyńczą wartość co kilka sekund a nie emitować wszystkie wartości jednocześnie.
* Tip: zerknij na operatory `interval` oraz `zip` => chociaż oczywiście możesz zrobić to na sto innych sposobów :)
* Tip #2:Doczytaj na temat share() :)

- [ ] Stwórz z niego strumienie które dotyczą konkretnych tematów nie duplikując źródłowego strumienia.

* Strumień dotyczący wpływu na konto
* Strumień dotyczący wydatku z konta
* Po zakończeniu emisji musimy wyświetlić stan konta oraz tablicę pożyczek które trzeba było wziąć(kredyt ma kwotę, oraz id płatności którego dotyczył).

- [ ] Strumień wpływów.

* Każda emisja wartości ma zostać złapana i dodana do wartości konta.
* Przy każdej emisji pokaż jaki jest wpływ oraz stan konta po transakcji wraz z id płatności.

- [ ] Strumień wydatków.

* Każda emisja wartości ma zostać złapana i odjęta od konta.
* Jeżeli wartość wydatku jest większa od aktualnej wartości konta, dodaj pożyczkę "weź pożyczkę" dodając środki do konta oraz pożyczkę do tablicy.
* Przy każdej emisji pokaż jaki jest id płatności, wydatek oraz stan konta po transakcji.

## Przydatne linki

- operator share oraz koncepcja hot and cold - https://www.angular.love/2018/06/13/rxjs-share-operator/

## Początek kodu

```javascript
const array = [
  {
    id: 1,
    type: "income",
    amount: 100,
  },
  {
    id: 2,
    type: "income",
    amount: 100,
  },
  {
    id: 3,
    type: "outcome",
    amount: 100,
  },
  {
    id: 5,
    type: "outcome",
    amount: 500,
  },
  {
    id: 6,
    type: "outcome",
    amount: 100,
  },
  {
    id: 7,
    type: "income",
    amount: 100,
  },
];

let accountValue = 0;
let loans = []; // amount: number; forPaymentId: number;

// symulacja wyniku:
// id: 1. income: 100, total: 0
// id: 2. income: 100, total: 100
// id: 3. outcome: 100, total: 200
// id: 5. outcome: 500, total: 100
// id: 6. outcome: 100, total: 100
// id: 7. income: 100, total: 0
// 100 [ { amount: 500, forPayment: 5 } ]
```
