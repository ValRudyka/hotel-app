import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import Logo from "../../ui/Logo";
import Heading from "../../ui/Heading";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { Link } from "react-router-dom";
import { useResetPassword } from "./useResetPassword";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useLogin();
  const { forgotPassword } = useResetPassword();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    login({ email, password });
  }

  function handleReset(e) {
    e.preventDefault();

    forgotPassword(email);
  }

  return (
    <>
      <Logo />
      <Heading style={{ textAlign: "center" }} as="h1">
        Login to yout account
      </Heading>
      <Form onSubmit={handleSubmit}>
        <FormRowVertical label="Email address">
          <Input
            type="email"
            id="email"
            // This makes this form better for password managers
            autoComplete="username"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button $variant="primary" $size="large">
            {isLoading ? <SpinnerMini /> : "Login"}
          </Button>
        </FormRowVertical>

        <Link onClick={handleReset}>Forgot password?</Link>
      </Form>
    </>
  );
}

export default LoginForm;
