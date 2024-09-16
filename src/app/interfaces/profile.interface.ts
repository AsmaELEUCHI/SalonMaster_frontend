
//données de profile dans l'espace personel
export interface UserProfileDto {
    salonName: string;
    salonAddress: string;
    numberOfEmployees: number;
    openingDate: string; 
    region: string;
    departement: string;
  }
  
  export interface UpdateResponse {
    message: string;
    salon: {
      salonName: string;
      salonAddress: string;
      numberOfEmployees: number;
      openingDate: string;
      region: string;
      departement: string;
    };
  }
  