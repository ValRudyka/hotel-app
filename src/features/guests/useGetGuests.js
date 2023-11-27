import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";

export function useGetGuests() {
  const { data: guests, isLoading: guestsLoading } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
  });

  return { guests, guestsLoading };
}
