export enum UserType {
  AUTHOR = 'AUTHOR',
  READER = 'READER',
}

export interface User {
  id: string;
  email: string;
  type: UserType;
  name: string; // Display name (First + Last or just Name)
  age: number;
  authorName?: string; // Only for authors
}

export interface Book {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  releaseDate: string;
  headline: string;
  articleContent: string;
  createdAt: number;
}

export enum ViewState {
  HOME = 'HOME',
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
}