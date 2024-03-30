export enum InputRegister {
  USERNAME = 'username',
  EMAIL = 'email',
  PASSWORD = 'password',
  REPASSWORD = 'repassword',
}

export const enum SORT_TYPE {
  RECENT = 'RECENT',
  RECENT_INVERT = 'RECENT_INVERT',
  A_Z = 'A-Z',
  Z_A = 'Z-A'
}

export const enum SP_TABLET {
  PROFILES = 'profiles',
}

export type OrderParameter = `${SORT_TYPE.RECENT}` | `${SORT_TYPE.RECENT_INVERT}` | `${SORT_TYPE.A_Z}` | `${SORT_TYPE.Z_A}`

export type InputRegisterType = typeof InputRegister
