import { contactType } from './ContactType.enum';

export class Contact {
  name: string;
  type: string;
  backgroundColor: string;
  emailAdditionalInfo?: string | undefined;
  adressAdditionalInfo?: {
    homeNumber: string;
    street: string;
    streetNumber: string;
  };
  phoneAdditionalInfo?: string | undefined;

  constructor(
    name: string,
    type: contactType,
    backgroundColor: string,
    emailAdditionalInfo?: string | undefined,
    adressAdditionalInfo?:
      | { homeNumber: string; street: string; streetNumber: string }
      | undefined,
    phoneAdditionalInfo?: string | undefined
  ) {
    this.name = name;
    this.type = type;
    this.backgroundColor = backgroundColor;
    this.emailAdditionalInfo = emailAdditionalInfo;
    this.adressAdditionalInfo = adressAdditionalInfo;
    this.phoneAdditionalInfo = phoneAdditionalInfo;
  }
}
