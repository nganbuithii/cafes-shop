// export interface Product {
//     id: number;
//     name: string;
//     description?: string;
//     price: number;
//     image_url: string;

import { ReactNode } from "react";

// }
export interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
    image_url: string;
    category?: string;
    created_at?: string;
    sweet?: boolean;
    sour?: boolean;
    bitter?: boolean;
  }
  
  export interface Preferences {
    sweet: boolean;
    bitter: boolean;
    sour: boolean;
    noBitter: boolean;
  }
  
export type Message = {
    sender: "user" | "bot";
    text: string | ReactNode; 
};