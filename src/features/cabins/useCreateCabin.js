import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUpdateCabin } from "../../services/apiCabins";

export function useCreateCabin(reset) {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createUpdateCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset?.();
      toast.success("The cabin has been added!");
    },
    onError: (err) => {
      toast.error(`An error: ${err.message}`);
    },
  });

  return { isCreating, createCabin };
}
