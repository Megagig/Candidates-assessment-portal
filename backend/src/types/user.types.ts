import { Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
