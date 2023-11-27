import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

function SignupForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();

  const { signupAPI, isSignup } = useSignup();

  const signup = function ({ fullName, email, password }) {
    signupAPI({ email, fullName, password }, { onSuccess: reset });
  };

  return (
    <Form onSubmit={handleSubmit(signup)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "Add your fullname please" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "Add your email please",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email is not valid, try again",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Min length of password is 8",
            },
          })}
        />
      </FormRow>
      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Confirming your password is required",
            validate: (currState) => {
              return (
                getValues().password === currState || "Passwords have to match"
              );
            },
          })}
        />
      </FormRow>
      <FormRow>
        <Button $variant="secondary" $size="medium" type="reset">
          Cancel
        </Button>
        <Button disabled={isSignup} $variant="primary" $size="medium">
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
