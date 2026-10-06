import type { ReactNode } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui";

const Frame = styled.div`
  padding: 40px 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  background: ${({ theme }) => theme.colors.card};
  text-align: center;
`;

const Title = styled.h2`
  margin: 0 0 8px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
`;

const Copy = styled.p`
  margin: 0 auto;
  max-width: 440px;
  color: ${({ theme }) => theme.colors.muted.foreground};
  line-height: 1.7;
`;

const Action = styled.div`
  margin-top: 20px;
`;

export interface StateMessageProps {
  title: string;
  message?: ReactNode;
  actionTo?: string;
  actionLabel?: string;
}

// One treatment for loading / empty / error / not-found states across the app.
export function StateMessage({ title, message, actionTo, actionLabel }: StateMessageProps) {
  return (
    <Frame role="status">
      <Title>{title}</Title>
      {message && <Copy>{message}</Copy>}
      {actionTo && actionLabel && (
        <Action>
          <Button asChild>
            <Link to={actionTo}>{actionLabel}</Link>
          </Button>
        </Action>
      )}
    </Frame>
  );
}
