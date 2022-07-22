import { contactType } from './ContactType.enum';

export interface IselectType {
  value: contactType;
}

// żeby obsłużyć viewValue dodać  bezpieczny swi
export enum contactTypeActionHandle {
  email = 'Send email',
  postAdres = 'Copy adress to clipboard',
  phone = 'Make a call',
}
