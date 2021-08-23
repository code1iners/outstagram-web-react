import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 0px;
  background-color: ${(props) => props.theme.accent};
  border-radius: 3px;
  color: white;
  cursor: pointer;
  span {
    margin-left: 10px;
    font-weight: 500;
    font-size: 12px;
  }
`;

const FacebookLogin = () => {
  return (
    <Container>
      <FontAwesomeIcon icon={faFacebookSquare} />
      <span>Sign in with Facebook</span>
    </Container>
  );
};

export default FacebookLogin;
