    
import { Request, Response } from "express";
import { User } from './../../models/User';

export interface MyContext {
  req: Request;
  res: Response;
  userId: string | null;
  user?: User | null;
}