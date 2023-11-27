import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: removeBooking, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBooking,

    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success(`Booking was successfully removed`);
      navigate("/bookings");
    },

    onError: () => {
      toast.error(`There is an error during delete process`);
    },
  });

  return { removeBooking, isDeleting };
}
