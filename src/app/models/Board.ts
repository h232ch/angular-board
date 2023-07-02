export interface Board {
  id: number;
  title: string;
  user: string;
  description: string;
  avg_ratings: number;
  no_of_ratings: number;
  pub_date: string;
  comments: [{user: string;
  id:number; movie:number; comment:string, pub_date:Date}];
}
