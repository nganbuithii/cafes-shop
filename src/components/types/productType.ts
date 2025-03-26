// export interface Product {
//     id: number;
//     name: string;
//     description?: string;
//     price: number;
//     image_url: string;
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
  
  export interface Message {
    sender: "user" | "bot";
    text: string;
  }