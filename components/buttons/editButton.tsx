'use client';

import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

type EditButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const StyledEditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  height: 2.25rem;
  background-color: ${({ theme }) => theme.colors.boxBg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  transition: all 0.1s ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export function EditButton({ className, ...props }: EditButtonProps) {
  return (
    <StyledEditButton className={className} {...props}>
      Edit this article
    </StyledEditButton>
  );
}