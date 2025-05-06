import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const app = express();
app.use(bodyParser.json());

const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT!;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET!;
const JWT_SECRET = process.env.JWT_SECRET!;

app.post('/api/register', async (req: Request, res: Response) => {
  const { email, password } = req.body.input;

  try {
    const checkUserQuery = `
      query CheckUser($email: String!) {
        users(where: { email: { _eq: $email } }) {
          id
        }
      }
    `;

    const checkUserResponse = await axios.post(
      HASURA_ENDPOINT,
      {
        query: checkUserQuery,
        variables: { email },
      },
      {
        headers: {
          'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
        },
      }
    );

    if (checkUserResponse.data.data.users.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserMutation = `
      mutation Register($email: String!, $password: String!) {
        insert_users_one(object: { email: $email, password: $password }) {
          id
          email
        }
      }
    `;

    const insertUserResponse = await axios.post(
      HASURA_ENDPOINT,
      {
        query: insertUserMutation,
        variables: { email, password: hashedPassword },
      },
      {
        headers: {
          'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
        },
      }
    );

    const user = insertUserResponse.data.data.insert_users_one;

    const token = jwt.sign(
      {
        sub: user.id.toString(),
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': ['user'],
          'x-hasura-default-role': 'user',
          'x-hasura-user-id': user.id.toString(),
        },
      },
      JWT_SECRET,
      {
        expiresIn: '1h',
        algorithm: 'HS256',
      }
    );

    return res.json({ accessToken: token, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
app.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body.input;

  try {
    const getUserQuery = `
      query GetUser($email: String!) {
        users(where: { email: { _eq: $email } }) {
          id
          email
          password
        }
      }
    `;

    const userResponse = await axios.post(
      HASURA_ENDPOINT,
      {
        query: getUserQuery,
        variables: { email },
      },
      {
        headers: {
          'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
        },
      }
    );

    const user = userResponse.data.data.users[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        sub: user.id.toString(),
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': ['user'],
          'x-hasura-default-role': 'user',
          'x-hasura-user-id': user.id.toString(),
        },
      },
      JWT_SECRET,
      {
        expiresIn: '1h',
        algorithm: 'HS256',
      }
    );

    return res.json({ accessToken: token, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
