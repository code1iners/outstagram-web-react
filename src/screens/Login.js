import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FacebookLogin from "../components/auth/FacebookLogin";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import routes from "../routes";

const HeaderContainer = styled.div`
  margin-bottom: 35px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const onUsernameChange = (event) => {
    setUsernameError("");
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "") {
      setUsernameError("Not empty please.");
    }
    if (username.length < 10) {
      setUsernameError("Too short");
    }
    console.log(username);
  };

  return (
    <AuthLayout>
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </HeaderContainer>
        <form onSubmit={handleSubmit}>
          {usernameError}
          <Input
            onChange={onUsernameChange}
            value={username}
            type="text"
            placeholder="Username"
          />
          <Input type="password" placeholder="Password" />
          <Button
            type="submit"
            value="Log in"
            disabled={username === "" && username.length < 10}
          />
        </form>

        <Separator />

        <FacebookLogin />
      </FormBox>

      <BottomBox
        cta={"Don't have an account?"}
        linkText={"Sign up"}
        link={routes.signUp}
      />
    </AuthLayout>
  );
};
export default Login;
