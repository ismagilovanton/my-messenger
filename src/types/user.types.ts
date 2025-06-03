export interface User {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string,
  login: string,
  avatar: string,
  email: string
}



export interface UpdateProfileRequest {
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string
}


export interface UpdatePasswordRequest {
  oldPassword: string,
  newPassword: string
}

