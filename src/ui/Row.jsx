import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.$direction === "row" &&
    css`
      justify-content: space-between;
      align-items: items;
    `}

  ${(props) =>
    props.$direction === "column" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

export default Row;
