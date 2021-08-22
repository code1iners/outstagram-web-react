import { useState } from "react";
import styled from "styled-components";
import { isDarkModeVar, isLoggedInVar } from "../apollo";

const Container = styled.div``;

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

const Login = () => {
  return (
    <Container>
      <Title>Login</Title>
    </Container>
  );
};
export default Login;
