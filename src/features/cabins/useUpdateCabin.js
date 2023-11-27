import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUpdateCabin } from "../../services/apiCabins";

export function useUpdateCabin(closeForm) {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ newData, id = 0 }) => createUpdateCabin(newData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      closeForm();
      toast.success("The cabin has been updated!");
    },
    onError: (err) => {
      toast.error(`An error: ${err.message}`);
    },
  });

  return { isUpdating, updateCabin };
}
