export interface FileType {
  id: string
  fileType: 'image' | 'video'
  favorite: boolean
  name: string
  height: number
  width: number
}

export interface ExtendedFileType extends FileType {
  url: string
  thumbnailUrl?: string
}

interface registerUserType {
  email: string
  password: string
  name?: string
}
