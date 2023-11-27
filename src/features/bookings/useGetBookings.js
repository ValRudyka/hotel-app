import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { perPage } from "../../utils/constants";

function useGetBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const option = searchParams.get("status");

  const filterValue =
    !option || option === "all" ? null : { fieldName: "status", value: option };

  const sortOption = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortOption.split("-");
  const page = searchParams.get("page") ? +searchParams.get("page") : 1;

  const sort = { field, direction, page };

  const { data: { data, count } = {}, isLoading } = useQuery({
    //queryKey depends on filterValue object, whenever it changes we fetch the new data
    queryKey: ["bookings", filterValue, sort, page],
    queryFn: () => getBookings({ filter: filterValue, sort, page }),
  });

  const pageCount = Math.ceil(count / perPage);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sort, page + 1],
      queryFn: () => getBookings({ filter: filterValue, sort, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sort, page - 1],
      queryFn: () => getBookings({ filter: filterValue, sort, page: page - 1 }),
    });
  }

  return { data, count, isLoading };
}

export { useGetBookings };
