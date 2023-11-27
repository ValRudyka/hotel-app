import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),

    onSuccess: (data) => {
      queryClient.invalidateQueries();
      toast.success(`Booking №${data.id} successfully checked out`);
      navigate("/");
    },

    onError: () => {
      toast.error("An error during the check out process");
    },
  });

  return { checkout, isCheckingOut };
}
