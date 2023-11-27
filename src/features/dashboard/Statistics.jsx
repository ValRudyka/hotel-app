import Stat from "./Stat";
import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Statistics({ stays = [], bookings = [], numDays, cabinCount }) {
  const sales = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

  const occupation = stays.reduce(
    (totalNights, stay) => stay.numNights + totalNights,
    0
  );

  const occupancyRate = occupation / (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        value={bookings.length}
        color="blue"
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Stays(checked-in)"
        icon={<HiOutlineCalendar />}
        value={stays.length}
        color="indigo"
      />
      <Stat
        title="Occupancy rate"
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={Math.round(occupancyRate * 100) + "%"}
      />
    </>
  );
}

export default Statistics;
