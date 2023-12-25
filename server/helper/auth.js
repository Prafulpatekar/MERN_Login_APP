import jwt from 'jsonwebtoken';
const key = process.env.ACCESS_TOKEN_SECRET || '__very_secret_key';

export const accessTokenGenrator = async (user) => {
  return await jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user.id
      },
    },
    key,
    { expiresIn: "30m" }
  );
};

