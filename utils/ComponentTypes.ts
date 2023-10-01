export interface CommonPropsInt {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export interface MessageDataInt {
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
}