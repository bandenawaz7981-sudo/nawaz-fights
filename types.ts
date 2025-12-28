
export interface Flight {
  id: string;
  airline: string;
  logo: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  type: 'Domestic' | 'International';
  stops: number;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  image: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export enum ImageSize {
  S1K = '1K',
  S2K = '2K',
  S4K = '4K'
}

export enum AspectRatio {
  A1_1 = '1:1',
  A3_4 = '3:4',
  A4_3 = '4:3',
  A9_16 = '9:16',
  A16_9 = '16:9'
}

export type View = 'flights' | 'hotels' | 'ai-assistant' | 'visualizer';
