import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const AUTHORIZATION = "Authorization";

export const isLoggedInVar = makeVar(
  Boolean(localStorage.getItem(AUTHORIZATION))
);
export const userSignIn = (token) => {
  localStorage.setItem(AUTHORIZATION, token);
  isLoggedInVar(true);
};
export const userSignOut = () => {
  localStorage.removeItem(AUTHORIZATION);
  isLoggedInVar(false);
};

export const isDarkModeVar = makeVar(false);
export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
