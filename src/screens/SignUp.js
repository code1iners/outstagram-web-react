import { gql, useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FacebookLogin from "../components/auth/FacebookLogin";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const SIGNUP_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;

    if (!ok) {
      console.error(error);
      return;
    }

    history.push(routes.home, {
      message: "Account created successfully try Sign in please.",
      username,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation(SIGNUP_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, formState, getValues } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>

        <FacebookLogin />

        <Separator />

        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstName", {
              required: "First name is required.",
            })}
            type="text"
            placeholder="First name"
            autoComplete="off"
          />
          <Input
            {...register("lastName")}
            type="text"
            placeholder="Last name"
            autoComplete="off"
          />
          <Input
            {...register("email", {
              required: "Email is required.",
            })}
            type="email"
            placeholder="Email"
            autoComplete="off"
          />
          <Input
            {...register("username", {
              required: "Username is required",
            })}
            type="text"
            placeholder="Username"
            autoComplete="off"
          />
          <Input
            {...register("password", {
              required: "Password is required",
            })}
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>

      <BottomBox
        cta={"Have an account?"}
        linkText={"Sign in"}
        link={routes.home}
      />
    </AuthLayout>
  );
};
export default SignUp;
