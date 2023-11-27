import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useResetPassword() {
  const { mutate: forgotPassword, isLoading: isResetting } = useMutation({
    mutationFn: (email) => resetPassword(email),

    onSuccess: () => {
      toast.success("Email has been sent to reset password. Go and check!");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { forgotPassword, isResetting };
}
