export interface IselectType {
  value: contactType;
}

// żeby obsłużyć viewValue dodać  bezpieczny switch w pipe
export enum contactType {
  email = 'email',
  adress = 'adress',
  phone = 'phone',
}

export enum contactTypeViewValue {
  emailViewValue = 'Email Adress',
  postViewValue = 'Post Adress',
  phoneViewValue = 'Contact Phone',
}

export enum contactTypeActionHandle {
  email = 'Send email',
  postAdres = 'Copy adress to clipboard',
  phone = 'Make a call',
}
