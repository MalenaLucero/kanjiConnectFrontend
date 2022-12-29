export interface Tag{
  user:  string;
  name: string;
  description: string;
  color: number;
  _id: string;
}

export const emptyTag = {
  user: '',
  name: '',
  description: '',
  color: 1,
  _id: ''
}

export interface FormTag{
  name: string,
  description: string,
  color: number,
}

export interface UploadTag{
  name: string,
  description: string,
  user: string,
  color: number,
}
