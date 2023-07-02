export interface Boards {
  count: number;
  next: string;
  previous: string;
  results: [{
    id: number;
    title: string;
    description: string;
    avg_ratings: number;
    no_of_ratings: number;
    pub_date: string;
  }]
}
