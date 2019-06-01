    
import { Request, Response } from "express";
import { User } from '../../data/models/user';
import { Provider } from '../../data/models/provider';

export interface MyContext {
  req: Request;
  res: Response;
  userId: string | null;
  user?: User | null;
  provider?: Provider | null;
}