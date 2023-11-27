import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ bookingId, newData = {} }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...newData,
      }),

    onSuccess: (data) => {
      toast.success(`Booking №${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/dashboard");
    },

    onError: () => {
      toast.error("An error during the check in process");
    },
  });

  return { mutate, isLoading };
}
