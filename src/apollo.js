import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const AUTHORIZATION = "AUTHORIZATION";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(
  Boolean(localStorage.getItem(AUTHORIZATION))
);
export const userSignIn = (token) => {
  localStorage.setItem(AUTHORIZATION, token);
  isLoggedInVar(true);
};
export const userSignOut = (history) => {
  localStorage.removeItem(AUTHORIZATION);
  isLoggedInVar(false);

  history?.replace();
};

export const isDarkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  isDarkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  isDarkModeVar(false);
};

/**
 * auth link start.
 * Add Authorization (token) information in Request headers.
 */
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem(AUTHORIZATION),
    },
  };
});
// auth link end.

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
