export interface iCities {
  data: ICity[];
  limit: number;
}

export interface ICity {
  data: {
    id: string;
    name: string;
    main?: {
      temp: number;
      temp_max: number;
      temp_min: number;
      humidity: number;
    };
  };
}
