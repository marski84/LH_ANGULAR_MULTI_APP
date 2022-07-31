import { contactType } from './ContactType.enum';
import { faker } from '@faker-js/faker';

export class Contact {
  id: string;
  name: string;
  type: contactType;
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
    this.id = faker.datatype.uuid();
    this.name = name;
    this.type = type;
    this.backgroundColor = backgroundColor;
    this.emailAdditionalInfo = emailAdditionalInfo;
    this.adressAdditionalInfo = adressAdditionalInfo;
    this.phoneAdditionalInfo = phoneAdditionalInfo;
  }
}
