'use client';

import { InputHTMLAttributes } from "react";
import styled from "styled-components";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  placeholder?: string;
};

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s;
  width: 100%;

  &:focus-within {
    border: 2px solid ${({ theme }) => theme.colors.select};
  }
`;

const StyledInput = styled.input`
  flex: 1;
  outline: none;
  font-family: 'Proxima Nova', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  background-color: transparent;
  border: none;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayText};
  }

  &:focus {
    font-size: 16px;
  }
`;

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <InputContainer>
      <StyledInput 
        {...props} 
        className={className}
        autoCorrect="off"
        autoCapitalize="off"
      />
    </InputContainer>
  );
}