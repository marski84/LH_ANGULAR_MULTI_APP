<h2 align="center">CryptoApp</h2>

<br>

## Wymagana wiedza

- Angular, Typescript, Reactive programming

## Technologie potrzebne do zadania

- Angular, Typescript, RxJS, Subject

## Cele główne

- [ ] Stwórz formularz do wyboru interesującej Cię kryptowaluty.

* Mamy do wyboru kilka kryptowalut defaultowo jest wybrany bitcoin.
* Zmiana w formularzu zmienia kryptowalutę o jaką pytamy.

- [ ] Przycisk do refresh danych na żądanie.

* Wyświetl przycisk który emituje wartość w strumieniu refreshCrytoData$.
* Osadzamy przycisk gdzie nam odpowiada ponieważ całość i tak komunikuje się na Subjectach :)

- [ ] Logika pobierania danych z API na temat kryptowaluty.

* Mergujemy 2 strumienie w jeden i switchujemy efekt na request Request o dane kryptowaluty.
* Jeden strumień to czasówka która odświeża dane co np. 10sekund.
* Drugi strumień to refreshCrytoData$ - który również resetuje czasówkę tak żeby od ręcznego odświeżenia zresetować czas do kolejnego odpytania.

- [ ] Dane o kryptowalucie pokazujemy w sposób deklaratywny w komponencie preview
- [ ] W innym miejscu wyświetlamy przycisk który wyświetla oraz informacje o możliwości kupna wybranej kryptowaluty(nazwa), cenę(kupna). Przycisk również zaciąga informacje ze strumienia, więc jest na bieżąco ze zmianami a kliknięcie powoduje console.loga

## Przydatne linki

- Crypto data API - https://api.kucoin.com/api/v1/market/stats?symbol=BTC-USDT
- Declarative vs imperative - https://eliteionic.com/tutorials/imperative-vs-declarative-programming-with-rxjs-search-filter/
