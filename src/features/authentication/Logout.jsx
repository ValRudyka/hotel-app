import ButtonIcon from "../../ui/ButtonIcon";
import { BiLogOutCircle } from "react-icons/bi";
import { useLogout } from "./useLogout";

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      <BiLogOutCircle />
    </ButtonIcon>
  );
}

export default Logout;
