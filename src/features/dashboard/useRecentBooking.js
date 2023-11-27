import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = +searchParams.get("last") || 7;

  const date = subDays(new Date(), numDays).toISOString();

  const { data, isLoading: isQuerying } = useQuery({
    queryFn: () => getBookingsAfterDate(date),
    queryKey: ["bookings", numDays],
  });

  return { data, isQuerying };
}
