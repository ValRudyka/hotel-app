import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = +searchParams.get("last") || 7;

  const date = subDays(new Date(), numDays).toISOString();

  const { data, isLoading: isQuerying2 } = useQuery({
    queryFn: () => getStaysAfterDate(date),
    queryKey: ["stays", numDays],
  });

  const confirmedStays = data?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { confirmedStays, numDays, isQuerying2 };
}
