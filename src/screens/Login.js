import {
  faFacebook,
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import { isDarkModeVar, isLoggedInVar } from "../apollo";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
`;

const TopBox = styled(WhiteBox)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 35px 40px 25px 40px;
  margin-bottom: 15px;
  form {
    width: 100%;
    margin-top: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    input {
      width: 100%;
      margin-top: 5px;
      padding: 7px 7px;
      background-color: #fafafa;
      border: 0.5px solid rgb(219, 219, 219);
      border-radius: 3px;
      box-sizing: border-box;
      &::placeholder {
        font-size: 12px;
      }
      &:last-child {
        margin-top: 12px;
        padding: 8px 0px;
        background-color: #0095f6;
        color: white;
        text-align: center;
        border: none;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
      }
    }
  }
`;

const BottomBox = styled(WhiteBox)`
  padding: 20px 0pc;
  text-align: center;
  a {
    font-weight: 600;
    color: #0095f6;
  }
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Separator = styled.div`
  width: 100%;
  margin: 15px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: rgb(219, 219, 219);
  }
  span {
    margin: 0px 10px;
    color: #8e8e8e;
    font-weight: 600;
  }
`;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <TopBox>
          <div>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </div>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="submit" placeholder="Log in" value="Log in" />
          </form>

          <Separator>
            <div></div>
            <span>Or</span>
            <div></div>
          </Separator>
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare} />
            <span>Log in with Facebook</span>
          </FacebookLogin>
        </TopBox>

        <BottomBox>
          <span>Don't have an account?</span>
          <a href="#">Sign up</a>
        </BottomBox>
      </Wrapper>
    </Container>
  );
};
export default Login;
