import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";

import { RiDeleteBin6Line } from "react-icons/ri";
import { PiCopySimpleFill } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isLoading, deleteCab } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  const { id, ...cabinInfo } = cabin;

  const duplicate = function () {
    createCabin({ ...cabinInfo, name: `${cabin.name}(copy)` });
  };

  return (
    <>
      <Table.Row>
        <Img src={cabin.image} alt="cabin" />
        <Cabin>{cabin.name}</Cabin>
        <div>Fits up to {cabin.capacity} people</div>
        <Price>{formatCurrency(cabin.regularPrice)}</Price>
        <Discount>{formatCurrency(cabin.discount)}</Discount>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Menus.Button onClick={duplicate} icon={<PiCopySimpleFill />}>
                  Duplicate
                </Menus.Button>
                <Modal.Open name="edit">
                  <Menus.Button icon={<MdEdit />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open name="delete">
                  <Menus.Button icon={<RiDeleteBin6Line />}>
                    Delete
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window openName="edit">
                <CreateCabinForm
                  key={cabin.id}
                  editId={cabin.id}
                  cabin={cabin}
                />
              </Modal.Window>

              <Modal.Window openName="delete">
                <ConfirmDelete
                  resourceName={cabin.name}
                  disabled={isLoading}
                  onConfirm={() => deleteCab(cabin.id)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
