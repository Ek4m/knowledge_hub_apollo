import { IUser } from "@/app/user/contexts";

export interface IComment {
  id: number;
  content: string;
  createdAt: string;
  user: IUser;
}
