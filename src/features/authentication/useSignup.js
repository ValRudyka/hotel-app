import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signupAPI, isLoading: isSignup } = useMutation({
    mutationFn: (credentials) => signupUser(credentials),

    onSuccess: () => {
      toast.success("Successfull registration");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signupAPI, isSignup };
}
