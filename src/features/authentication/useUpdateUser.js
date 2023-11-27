import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: (updatedData) => updateCurrentUser(updatedData),

    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("Successully updated user's data");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateUser, isUpdating };
}
