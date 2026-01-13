export interface User {
  id: string;
}

export interface Chat {
  userId: string;
  message: string;
}

export interface Socket<T> {
  type: "user" | "chat";
  payload: T;
}
