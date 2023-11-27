import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open name="cabin-form">
          <Button $variant="primary" $size="medium">
            Add new cabin
          </Button>
        </Modal.Open>
        <Modal.Window openName="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        <Modal.Open name="table">
          <Button $variant="primary" $size="medium">
            Show table
          </Button>
        </Modal.Open>
        <Modal.Window openName="table">
          <CabinTable />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
