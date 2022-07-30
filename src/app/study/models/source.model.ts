export interface Source {
  name: string,
  link?: string,
  _id: string
}

export const emptySource = {
  name: '',
  link: '',
  _id: ''
}

export interface FormSource {
  lessonId: string,
  name: string,
  link?: string
}

export interface UploadSource {
  name: string,
  link?: string
}
