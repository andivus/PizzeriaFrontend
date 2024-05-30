export default interface UserDTO {
  uuid: string
  username: string
  firstName: string
  secondName: string
  email: string
}

export interface UserCreateRequest {
  password: string
  username: string
  firstName: string
  secondName: string
  email: string
}

export interface UserCreateResponse {
  userDTO: UserDTO | null
  status: UserCreateResponseStatusType | null
}

export enum UserCreateResponseStatusType {
  USERNAME_ALREADY_IN_USE,
  EMAIL_ALREADY_IN_USE,
  BAD_USERNAME,
  BAD_MAIL,
  BAD_PASSWORD,
  BAD_NAME
}

export interface UserUpdateRequest {
  username: string | null
  firstName: string | null
  secondName: string | null
  email: string | null
  password: string | null
}

export interface UserUpdateResponse {
  userDTO: UserDTO | null
  status: UserUpdateResponseStatusType | null
}

export enum UserUpdateResponseStatusType {
  USERNAME_ALREADY_IN_USE,
  EMAIL_ALREADY_IN_USE,
  BAD_USERNAME,
  BAD_MAIL,
  BAD_PASSWORD,
  BAD_NAME,
  NOT_FOUND
}

export interface UserLoginRequest {
  login: string
  password: string
}

export interface UserLoginResponse {
  token: string,
  userDTO: UserDTO
}

export interface GetTokenValidityResponse {
  validTime: Date,
  userId: string | null
}
