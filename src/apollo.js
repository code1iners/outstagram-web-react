import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

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
export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
