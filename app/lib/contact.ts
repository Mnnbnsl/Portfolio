export interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface ContactState {
  status: 'idle' | 'success' | 'error';
  message: string;
  fieldErrors?: FieldErrors;
}

export const initialContactState: ContactState = {
  status: 'idle',
  message: '',
};
