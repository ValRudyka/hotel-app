import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "../bookings/useGetBooking";
import { useSettings } from "../settings/useSettings";

import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmed, setConfirmed] = useState(false);
  const [hasBreakfast, setHasBreakfast] = useState(false);

  const { booking, isLoading } = useGetBooking();
  const { mutate: checkIn, isLoading: isCheckingIn } = useCheckin();
  const { data: { breakfastPrice } = {} } = useSettings();

  useEffect(() => {
    setConfirmed(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  if (isLoading || isCheckingIn) {
    return <Spinner />;
  }
  const {
    id: bookingId,
    numNights,
    numGuests,
    totalPrice,
    Guests: { fullName },
  } = booking;

  const calculatedBreakfastPrice = breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmed) {
      return;
    }

    if (hasBreakfast) {
      checkIn({
        bookingId,
        newData: {
          totalPrice: totalPrice + calculatedBreakfastPrice,
          hasBreakfast,
          extraPrice: calculatedBreakfastPrice,
        },
      });
    } else {
      checkIn({ bookingId });
    }
  }

  return (
    <>
      <Row $direction="row">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          id="breakfast"
          checked={hasBreakfast || booking.hasBreakfast}
          disabled={hasBreakfast || booking.hasBreakfast}
          onChange={() => {
            setHasBreakfast((has) => !has);
            setConfirmed(false);
          }}
        >
          Do you want to add breakfast for{" "}
          {formatCurrency(calculatedBreakfastPrice)}?
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          id="confirm"
          checked={confirmed}
          onChange={() => setConfirmed((confirmPaid) => !confirmPaid)}
          disabled={confirmed}
        >
          I confirm that {fullName} has paid the total amount of{" "}
          {!hasBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + calculatedBreakfastPrice
              )} (${formatCurrency(totalPrice)} +
          ${formatCurrency(calculatedBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          disabled={isCheckingIn}
          $variant="primary"
          $size="medium"
          onClick={handleCheckin}
        >
          Check in booking #{bookingId}
        </Button>
        <Button $variant="secondary" $size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
