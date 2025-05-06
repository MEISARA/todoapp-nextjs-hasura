"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body.input;
    try {
        const checkUserQuery = `
      query CheckUser($email: String!) {
        users(where: { email: { _eq: $email } }) {
          id
        }
      }
    `;
        const checkUserResponse = await axios_1.default.post(HASURA_ENDPOINT, {
            query: checkUserQuery,
            variables: { email },
        }, {
            headers: {
                'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
            },
        });
        if (checkUserResponse.data.data.users.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const insertUserMutation = `
      mutation Register($email: String!, $password: String!) {
        insert_users_one(object: { email: $email, password: $password }) {
          id
          email
        }
      }
    `;
        const insertUserResponse = await axios_1.default.post(HASURA_ENDPOINT, {
            query: insertUserMutation,
            variables: { email, password: hashedPassword },
        }, {
            headers: {
                'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
            },
        });
        const user = insertUserResponse.data.data.insert_users_one;
        const token = jsonwebtoken_1.default.sign({
            sub: user.id.toString(),
            'https://hasura.io/jwt/claims': {
                'x-hasura-allowed-roles': ['user'],
                'x-hasura-default-role': 'user',
                'x-hasura-user-id': user.id.toString(),
            },
        }, JWT_SECRET, {
            expiresIn: '1h',
            algorithm: 'HS256',
        });
        return res.json({ accessToken: token, user });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// Login route
app.post('/api/login', async (req, res) => {
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
        const userResponse = await axios_1.default.post(HASURA_ENDPOINT, {
            query: getUserQuery,
            variables: { email },
        }, {
            headers: {
                'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
            },
        });
        const user = userResponse.data.data.users[0];
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({
            sub: user.id.toString(),
            'https://hasura.io/jwt/claims': {
                'x-hasura-allowed-roles': ['user'],
                'x-hasura-default-role': 'user',
                'x-hasura-user-id': user.id.toString(),
            },
        }, JWT_SECRET, {
            expiresIn: '1h',
            algorithm: 'HS256',
        });
        return res.json({ accessToken: token, user });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
});
