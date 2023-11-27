import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ handleClick, bookingId }) {
  const { checkout } = useCheckout();

  return (
    <Button
      onClick={() => checkout(bookingId)}
      $variant="primary"
      $size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
