import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FacebookLogin from "../components/auth/FacebookLogin";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import routes from "../routes";

const HeaderContainer = styled.div`
  margin-bottom: 35px;
`;

const SignIn = () => {
  return (
    <AuthLayout>
      <PageTitle title="Sign in" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </HeaderContainer>
        <form>
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" value="Sign in" />
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
export default SignIn;
