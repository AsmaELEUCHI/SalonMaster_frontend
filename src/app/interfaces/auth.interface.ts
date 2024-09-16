
//Données d'enregistrement
export interface RegisterData{
    salonName: string;
    representativeFirstName: string;
    representativeLastName: string;
    salonAddress: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
//Données d'authentification
  export interface LoginData{
    email:string;
    password:string;
  }

  //Données de demande de rénitialisation de mot de passe
  export interface ResetPasswordData {
    resetEmail: string;
  }

  export interface AuthResponse {
    token?: string; //Propriété optionelle
    message?: string;//Propriété optionelle
  }