export interface User {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    avatar?: string;
    role: string;
    isBlocked?: boolean;
    favorites?: any[];
    purchaseHistory?: any[];
  }