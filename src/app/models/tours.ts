export interface ITours {
    description: string,
    id: string,
    name: string,
    img: string,
    price:number,
    tourOperator:string;
    type: string;
    date: string
}
export type TourType ='Одиночный'|'Групповой';

export interface ITourTypeSelect {
  label?: string,
  value?: string,
  date?: string
}
export interface INearestTour extends ITours{
  locationId: string
}

export interface ITourLocation{
  name: string,
  id: string
}
export interface ICustomTicketData extends INearestTour{
  region: ITourLocation;
}
