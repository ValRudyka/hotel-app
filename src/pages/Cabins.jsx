import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinsTableOperations from "../features/cabins/CabinsTableOperations";

function Cabins() {
  return (
    <>
      <Row $direction="row">
        <Heading as="h1">All cabins</Heading>
        <CabinsTableOperations />
      </Row>
      <Row $direction="column">
        <CabinTable />
      </Row>

      <AddCabin />
    </>
  );
}

export default Cabins;
