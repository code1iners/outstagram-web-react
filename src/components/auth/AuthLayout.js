import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { disableDarkMode, enableDarkMode, isDarkModeVar } from "../../apollo";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Footer = styled.footer`
  margin-top: 20px;
`;

const DarkModeButton = styled.span`
  cursor: pointer;
`;

const AuthLayout = ({ children }) => {
  const isDarkMode = useReactiveVar(isDarkModeVar);
  return (
    <Container>
      <Wrapper>{children}</Wrapper>

      <Footer>
        <DarkModeButton onClick={isDarkMode ? disableDarkMode : enableDarkMode}>
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </DarkModeButton>
      </Footer>
    </Container>
  );
};

export default AuthLayout;
