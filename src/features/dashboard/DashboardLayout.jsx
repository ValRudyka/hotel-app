import styled from "styled-components";
import { useRecentBookings } from "./useRecentBooking";
import { useRecentStays } from "./useRecentStays";
import Statistics from "./Statistics";
import { useGetCabins } from "../cabins/useGetCabins";
import Spinner from "../../ui/Spinner";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = function () {
  const { data: bookings, isQuerying } = useRecentBookings();

  const { confirmedStays, numDays, isQuerying2 } = useRecentStays();
  const { data: cabins } = useGetCabins();

  if (isQuerying || isQuerying2) {
    return <Spinner />;
  }

  return (
    <StyledDashboardLayout>
      <Statistics
        cabinCount={cabins?.length}
        numDays={numDays}
        stays={confirmedStays}
        bookings={bookings}
      />
      <Today />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart numDays={numDays} bookings={bookings} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
