import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";
import TableOperations from "../../ui/TableOperations";

function CabinsTableOperations() {
  return (
    <TableOperations>
      <Filter
        fieldName="discount"
        options={[
          { label: "All", value: "all" },
          { label: "No discount", value: "no-discount" },
          { label: "With discount", value: "with-discount" },
        ]}
      />
      <Sort
        options={[
          { label: "Sort by name (A-Z)", value: "name-asc" },
          { label: "Sort by name (Z-A)", value: "name-desc" },
          { label: "Sort by capacity (low-high)", value: "capacity-asc" },
          { label: "Sort by capacity (high-low)", value: "capacity-desc" },
          { label: "Sort by price (low-high)", value: "regularPrice-asc" },
          { label: "Sort by price (high-low)", value: "regularPrice-desc" },
          { label: "Sort by discount (low-high)", value: "discount-asc" },
          { label: "Sort by discount (high-low)", value: "discount-desc" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinsTableOperations;
