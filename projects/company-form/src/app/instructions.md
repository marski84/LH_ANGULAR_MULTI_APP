<h2 align="center">Companies Forms</h2>

<br>

## Wymagana wiedza

- Typescript, Angular

## Technologie potrzebne do zadania

- Typescript, Angular, RouterModule, ReactiveForms, canDeactivate

## Cele główne

- [ ] Stwórz NavComponent:

* Służy do nawigacji po aplikacji. Wyświetla przyciskiem `New Company` oraz przyciski dla Firm które utworzyliśmy.
* Kliknięcie w przycisk dla Firmy powoduje redirect na url `/company/{indexFirmyuWTablicy}`.
* Jak ktoś wbije na index który nie istnieje to wyrzucamy na `/company/not-found`.
* Pamiętaj aby ostylować aktualnie aktywny elment w nawigacji.
* Używamy tutaj `mat-toolbar` oraz przyciski również materialowe.

- [ ] Stwórz CompanyFormComponent:

* Podpięty pod `/company/new`.
* Wyświetla formularz Firmy (nazwa, select z branżą, przycisk submitujący oraz usuwający Firmę).
* Dodatkowo do Firmy możemy dodawać/usuwać pracowników, jest to FormArray do którego możemy dodawać oraz usuwać osoby. Każda Firma musi mieć przynajmniej jednego pracownika.
* Pracownik posiada imie, nazwisko, wiek.

- [ ] Stwórz NewCompanyComponent:

* Wyświetla formularz.
* Przechodzimy tutaj z widoku informacji o firmie.
* Łapie submit i przekazuje do `CompanyServiceComponent`.

- [ ] Stwórz EditCompanyComponent:

* Wyświetla formularz Firm tak jak `NewCompanyComponent` tylko tutaj przekazuje mu dane o konkretnej firmie.
* Łapie index Firmy z ściezki, pobiera go oraz przekazuje do formularza.
* Gdy wykonamy jakąś zmiane w formularzu nie zapisując jeżeli będziemy chcieli przejść w inne miejsce aplikacji dostaniemy alert że nie zapisaliśmy zmian.

- [ ] Stwórz CompanyServiceComponent:

* Trzyma w sobie tablice z Firmami oraz logikę jaką potrzebujesz.

## Przydatne linki

- Dokumentacja Routingu - https://angular.io/guide/router
- canDeactivate - https://www.angular.love/2017/05/23/angular-candeactivate-guard/

- [ ] przebudować front 1. nawigacje w mat-toolbar w środku przyciski bez jsonów----- ok
- [ ] zmiana w formualrzu edycji nie jest blokowana - #deactivateGuard----ok
- [ ] przebuduj sobie na uuid----- ok
- [ ] wywalić buttonNamePipe ---- ok
- [ ] typeOfBusiness w company form onDestroy----ok
