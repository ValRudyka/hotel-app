import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useGetCabins } from "./useGetCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, data = [] } = useGetCabins();
  const [searchParams] = useSearchParams();

  let filteredData = data;

  switch (searchParams.get("discount")) {
    case "all":
      filteredData = data;
      break;

    case "no-discount":
      filteredData = data.filter((cabin) => cabin.discount === 0);
      break;

    case "with-discount":
      filteredData = data.filter((cabin) => cabin.discount > 0);
      break;

    default:
      break;
  }

  const [field, type] =
    searchParams.get("sortBy")?.split("-") || "name-asc".split("-");
  const modifier = type === "asc" ? 1 : -1;

  const compareNames = function (first, second) {
    if (first["name"].toLowerCase() > second["name"].toLowerCase()) {
      return -1 * modifier;
    } else if (first["name"].toLowerCase() < second["name"].toLowerCase()) {
      return modifier;
    }

    return 0;
  };

  const sortedData =
    field === "name"
      ? filteredData.sort(compareNames)
      : filteredData.sort(
          (first, second) => (first[field] - second[field]) * modifier
        );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        {/* makes more reusable, because we will use these components in bookings then */}
        <Table.Body
          data={sortedData}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
