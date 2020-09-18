export interface ICurriculum {
  title: string;
  date: string;
  subtitle: string;
  country: string;
  countryCode: string;
}

export interface IExperience extends ICurriculum {
  list: string[];
}




