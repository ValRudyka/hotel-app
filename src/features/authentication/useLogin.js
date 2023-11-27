import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: (credentials) => loginUser(credentials),

    onSuccess: () => {
      navigate("/", { replace: true });
      toast.success("Welcome to the app!");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isLoading };
}
