import { gql, useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { userSignIn } from "../apollo";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FacebookLogin from "../components/auth/FacebookLogin";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import routes from "../routes";

const HeaderContainer = styled.div`
  margin-bottom: 10px;
`;

const Notification = styled.div`
  color: #2ecc71;
  margin-bottom: 10px;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

const SignIn = () => {
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });

  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }

    if (token) {
      userSignIn(token);
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    const { username, password } = getValues();
    if (loading) {
      return;
    }
    login({
      variables: {
        username,
        password,
      },
    });
  };

  const clearSignInError = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign in" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </HeaderContainer>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "username should be longer than 5 chars.",
              },
            })}
            type="text"
            placeholder="Username"
            autoComplete="off"
            onFocus={clearSignInError}
            hasError={Boolean(formState.errors?.username?.message)}
          />
          <FormError message={formState.errors?.username?.message} />

          <Input
            {...register("password", {
              required: "Password is required.",
              minLength: 8,
            })}
            type="password"
            placeholder="Password"
            onFocus={clearSignInError}
            hasError={Boolean(formState.errors?.password?.message)}
          />
          <FormError message={formState.errors?.password?.message} />

          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign in"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState.errors?.result?.message} />
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
