import styled from "styled-components";

export const Container = styled.div<{ $maxWidth?: number }>`
  width: min(${({ $maxWidth = 1120 }) => $maxWidth}px, calc(100% - 32px));
  margin: 0 auto;
`;
