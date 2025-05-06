import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Function to check if the token is expired
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

// Function to get the payload from the token
function getTokenPayload(token: string): Record<string, unknown> | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
}

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'http://localhost:8080/v1/graphql',
});

// Middleware to add the authorization token and payload to headers
const authLink = setContext((_, { headers }) => {
  if (typeof window === 'undefined') return { headers };

  const token = localStorage.getItem('token');

  if (token && isTokenExpired(token)) {
    console.warn('Token expired. Logging out...');
    localStorage.removeItem('token');
    window.location.href = '/login';
    return { headers };
  }

  const payload = token ? getTokenPayload(token) : null;
  const claims = payload?.['https://hasura.io/jwt/claims'];
  const userId = claims?.['x-hasura-user-id'];
  const role = claims?.['x-hasura-default-role'] || 'anonymous';

  return {
    headers: {
      ...headers,
        authorization: token ? `Bearer ${token}` : '',
        'x-hasura-role': role,
        ...(userId && { 'x-hasura-user-id': userId }),
    },
  };
});

// Apollo Client setup
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
