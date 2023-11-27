import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      queryClient.removeQueries(["user"]);
      navigate("/login");
      toast.success("Successfully logged out");
    },

    onError: (err) => {
      console.log(err);
      toast.error("Cannot logout you");
    },
  });

  return { logout, isLoading };
}
