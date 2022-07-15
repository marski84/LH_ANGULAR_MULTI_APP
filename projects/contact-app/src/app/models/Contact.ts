import { IselectType } from './IselectType';
export class Contact {
  name: string;
  type: string;
  emailAdditionalInfo?;
  adressAdditionalInfo?;
  phoneAdditionalInfo?;

  constructor(
    name: string,
    type: string,
    emailAdditionalInfo?: { emailAdress: string },
    adressAdditionalInfo?: {
      homeNumber?: string;
      street: string;
      streetNumber: string;
    },
    phoneAdditionalInfo?: { phoneNumber: string }
  ) {
    this.name = name;
    this.type = type;
    this.emailAdditionalInfo = emailAdditionalInfo;
    this.adressAdditionalInfo = adressAdditionalInfo;
    this.phoneAdditionalInfo = phoneAdditionalInfo;
  }
}
