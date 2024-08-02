export enum enumErrorsCodes {
  emailExists = "auth/email-already-in-use",
  emailWrong = "auth/invalid-email",
  missingPass = "auth/missing-password",
  weakPass = "auth/weak-password",
  userNotFound = "auth/user-not-found",
  wrongPass = "auth/wrong-password",
  emailNotVerified = "auth/email-not-verified",
  tooManyAttempts = "auth/too-many-attempts",
  operationNotAllowed = "auth/operation-not-allowed",
  invalidCredential = "auth/invalid-credential",
}

export enum enumErrors {
  clear = "",
  wrongEmail = "Wprowadz poprawny email",
  existsEmail = "Podany email jest już używany",
  wrongPass = "Wymagana długość to 6 znaków",
  weakPass = "Hasło jest zbyt słabe",
  serverError = "Błąd serwera",
  correctDetails = "Wprowadz poprawne dane",
  userNotFound = "Użytkownik nie znaleziony",
  wrongPassDetails = "Niepoprawne hasło",
  emailNotVerified = "Email nie został zweryfikowany",
  tooManyAttempts = "Zbyt wiele prób, spróbuj ponownie później",
  operationNotAllowed = "Operacja niedozwolona",
  invalidCredential = "Użytkownik nie istnieje",
}

const emailErrorGroup = [
  enumErrorsCodes.emailWrong,
  enumErrorsCodes.emailExists,
  enumErrorsCodes.userNotFound,
  enumErrorsCodes.emailNotVerified,
];

const passErrorGroup = [
  enumErrorsCodes.missingPass,
  enumErrorsCodes.weakPass,
  enumErrorsCodes.wrongPass,
  enumErrorsCodes.tooManyAttempts,
  enumErrorsCodes.operationNotAllowed,
  enumErrorsCodes.invalidCredential,
];

const generateEmailError = (errorCode: enumErrorsCodes) => {
  if (passErrorGroup.includes(errorCode)) {
    return ' ';
  }
  switch (errorCode) {
    case enumErrorsCodes.emailExists:
      return enumErrors.existsEmail;
    case enumErrorsCodes.emailWrong:
      return enumErrors.wrongEmail;
    case enumErrorsCodes.userNotFound:
      return enumErrors.userNotFound;
    case enumErrorsCodes.emailNotVerified:
      return enumErrors.emailNotVerified;
    default:
      return enumErrors.serverError;
  }
};

const generatePassError = (errorCode: enumErrorsCodes) => {
  if (emailErrorGroup.includes(errorCode)) {
    return ' ';
  }
  switch (errorCode) {
    case enumErrorsCodes.missingPass:
      return enumErrors.wrongPass;
    case enumErrorsCodes.weakPass:
      return enumErrors.weakPass;
    case enumErrorsCodes.wrongPass:
      return enumErrors.wrongPassDetails;
    case enumErrorsCodes.tooManyAttempts:
      return enumErrors.tooManyAttempts;
    case enumErrorsCodes.operationNotAllowed:
      return enumErrors.operationNotAllowed;
    case enumErrorsCodes.invalidCredential:
      return enumErrors.invalidCredential;
    default:
      return enumErrors.serverError;
  }
};

export { generateEmailError, generatePassError, emailErrorGroup, passErrorGroup };
