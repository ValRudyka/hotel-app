import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { CiMenuKebab } from "react-icons/ci";
import { createPortal } from "react-dom";
import { useClickOutside } from "../hooks/useClickOutside";

const MenusContext = createContext();

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

function Menus({ children }) {
  const [listId, setListId] = useState(null);
  const [positions, setPositions] = useState({ x: 0, y: 0 });

  const close = () => setListId(null);
  const open = setListId;

  return (
    <MenusContext.Provider
      value={{ listId, close, open, positions, setPositions }}
    >
      <div>{children}</div>
    </MenusContext.Provider>
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  const handleClick = function () {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

function List({ id, children }) {
  const { listId, positions, close } = useContext(MenusContext);
  const listRef = useClickOutside(close);

  if (id !== listId) {
    return null;
  }

  return createPortal(
    <StyledList ref={listRef} position={positions}>
      {children}
    </StyledList>,
    document.body
  );
}

function Toggle({ id }) {
  const { listId, open, close, setPositions } = useContext(MenusContext);

  const handleClick = function (e) {
    const rect = e.target.closest("button").getBoundingClientRect();

    // console.log(position);
    setPositions({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    id !== listId || listId === null ? open(id) : close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <CiMenuKebab />
    </StyledToggle>
  );
}

Menus.Menu = StyledMenu;
Menus.Button = Button;
Menus.List = List;
Menus.Toggle = Toggle;

export default Menus;
