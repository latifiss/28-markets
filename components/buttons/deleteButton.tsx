'use client';

import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { TrashIcon } from "@heroicons/react/24/solid";

type DeleteButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const StyledDeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  height: 2.25rem;
  background-color: ${({ theme }) => theme.colors.red};
  border: 2px solid ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  transition: all 0.1s ease;
  cursor: pointer;
  
  svg {
    width: 0.75rem;
    height: 0.75rem;
  }
  
  &:focus {
    outline: none;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export function DeleteButton({ className, ...props }: DeleteButtonProps) {
  return (
    <StyledDeleteButton className={className} {...props}>
      <TrashIcon />
      <span>Delete</span>
    </StyledDeleteButton>
  );
}