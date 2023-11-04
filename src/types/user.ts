export interface TokenObjectType {
  accessToken: string;
  refreshToken: string;
}

export type Roles = {
  role: string;
};

export interface UserObjectType {
  _id: string;
  login: string;
  name: string;
  family: string;
  roles: Roles[];
  middleName: string;
  phone: string;
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
}
