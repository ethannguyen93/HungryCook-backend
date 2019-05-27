import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../../models/users';

export default {
  users: async () => {
    try {
      const users = await User.find();
      return users.map(user => ({
        ...user._doc,
        password: null,
      }));
    } catch (err) {
      throw err;
    }
  },
  createUser: async ({ userInput: { email, name, password } }) => {
    try {
      const existingUser = await User.findOne({
        email,
      });
      if (existingUser) {
        throw new Error('User exists already');
      }
      const hashedPassword = await bcryptjs.hash(password, 12);
      const user = new User({
        email,
        name,
        password: hashedPassword,
      });
      const result = await user.save();
      return {
        ...result._doc,
        password: null,
      };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    const isEqual = await bcryptjs.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      'somesupersecretkey',
      {
        expiresIn: '1h',
      },
    );
    return {
      userId: user.id,
      token,
      tokenExpiration: 1,
    };
  },
};
