import { User } from '../models/User';
import * as bcrypt from 'bcryptjs';
import { ValidationError } from './errors';

export default {
  async create(name: string, surname: string, email: string, password: string) {
    const _users = await User.find({ email });
    if (_users.length) throw new ValidationError('email already registered');
    if (!password || !password.trim()) throw new ValidationError('password is required')

    const hashPassword = await bcrypt.hash(password, 12);
    try {
      const user = await User.create({ name, surname, email, password: hashPassword });
      return { id: user._id, name: user.name, surname: user.surname, email: user.email };
    } catch (err) {
      const { errors } = err;
      const keys = Object.keys(err.errors);
      const { name, path, kind, message } = errors[keys[0]];
      if (name === 'ValidatorError') {
        if (kind === 'required') throw new ValidationError(`${path} is required`)
        else throw new ValidationError(message);
      } 
      throw err;
    }
  },
};
