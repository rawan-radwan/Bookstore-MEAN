export interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    price: number;
    coverImage: string;
    ratings?: number[];
    comments?: { content: string, user: string, date: Date }[];
  }

  