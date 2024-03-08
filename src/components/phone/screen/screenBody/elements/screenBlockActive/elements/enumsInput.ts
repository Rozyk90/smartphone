export enum enumErrorsCodes {
    emailExists = "auth/email-already-in-use",
    emailWrong = "auth/invalid-email",
    missingPass = "auth/missing-password",
  }
  
  export enum enumErrors {
    clear = "",
    wrongEmail = "Wprowadz poprawny email",
    existsEmail = "Podany email jest już używany",
    wrongPass = "Wymagana długość to 6 znaków",
    serverError = "Błąd serwera",
    correctDetails = "Wprowadz poprawne dane",
  }
  
  export enum enumBtns {
    btnLogin = "login",
    btnRegistration = "registration",
  }