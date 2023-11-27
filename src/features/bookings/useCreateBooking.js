import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateBooking() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: addBooking, isLoading: isAdding } = useMutation({
    mutationFn: (newBooking) => createBooking(newBooking),

    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"]);
      toast.success("A new booking was added successfully!");
      navigate("/bookings");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { addBooking, isAdding };
}
