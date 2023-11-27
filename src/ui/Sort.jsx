import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function Sort({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = function (e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return <Select options={options} change={handleChange} />;
}

export default Sort;
