export class UpdateUserRequest {
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  username: string;
  password?: string;
  image?: string;
}
