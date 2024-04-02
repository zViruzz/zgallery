export interface FileType {
  id: string
  fileType: 'image' | 'video'
  favorite: boolean
  name: string
  fileName: string
  height: number
  width: number
  size: number
}

export interface ExtendedFileType extends FileType {
  url: string
  thumbnailUrl?: string
}

export interface registerUserType {
  email: string
  password: string
  name?: string
}

export interface resolutionType {
  width: number
  height: number
}
