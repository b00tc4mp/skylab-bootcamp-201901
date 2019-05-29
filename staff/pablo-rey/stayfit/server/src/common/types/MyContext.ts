    
import { Request, Response } from "express";
import { User } from './../../models/User';

export interface MyContext {
  req: Request;
  user: User | null;
  res: Response;
}