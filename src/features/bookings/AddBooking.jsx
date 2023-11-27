import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import AddBookingForm from "./AddBookingForm";

function AddBooking() {
  return (
    <div>
      <Modal>
        <Modal.Open name="booking-form">
          <Button $variant="primary" $size="medium">
            Add new booking
          </Button>
        </Modal.Open>
        <Modal.Window openName="booking-form">
          <AddBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBooking;
