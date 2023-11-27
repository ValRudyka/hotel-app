import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "./useGetBooking";
import { useNavigate } from "react-router-dom";
import CheckoutButton from "../check-in-out/CheckoutButton";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading, status } = useGetBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { removeBooking } = useDeleteBooking();

  const navigate = useNavigate();

  const moveBack = useMoveBack();

  if (isLoading || isCheckingOut) {
    return <Spinner />;
  }

  if (!booking) {
    return <Empty resource="booking" />;
  }

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row $direction="row">
        <HeadingGroup>
          <Heading as="h1">Booking {booking.id}</Heading>
          <Tag $type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button $variant="primary" $size="medium" onClick={moveBack}>
          Back
        </Button>

        {status === "unconfirmed" && (
          <Button
            $variant="primary"
            $size="medium"
            onClick={() => navigate(`/checkin/${booking.id}`)}
          >
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <CheckoutButton handleClick={() => checkout(booking.id)}>
            Check out
          </CheckoutButton>
        )}

        <Button
          $variant="danger"
          $size="medium"
          onClick={() => removeBooking(booking.id)}
        >
          Delete
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
