export interface ElementList {
  id: string
  fileType: 'image' | 'video'
  name: string
  height?: number
  width?: number
}

interface registerUserType {
  email: string
  password: string
  name?: string
}
