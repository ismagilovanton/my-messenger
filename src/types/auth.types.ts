export interface SignUpRequest {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string,
  repeat_password: string
}


export interface SignInRequest {
  login: string,
  password: string
}


export interface SignUpResponse {
  id: number,
}
