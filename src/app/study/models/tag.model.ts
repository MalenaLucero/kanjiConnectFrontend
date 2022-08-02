export interface Tag{
  user:  string;
  name: string;
  description: string;
  _id: string;
}

export const emptyTag = {
  user: '',
  name: '',
  description: '',
  _id: ''
}

export interface FormTag{
  name: string,
  description: string,
}

export interface UploadTag{
  name: string,
  description: string,
  user: string
}
