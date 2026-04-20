'use client';

import { InputHTMLAttributes } from "react";
import styled from "styled-components";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  placeholder?: string;
};

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 2.5rem;
  padding: 0.5rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s;
  width: 100%;

  &:focus-within {
    border: 2px solid ${({ theme }) => theme.colors.select};
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 1rem;
    height: 1rem;
    color: ${({ theme }) => theme.colors.grayText};
  }
`;

const StyledInput = styled.input`
  flex: 1;
  outline: none;
  font-family: 'Proxima Nova', sans-serif;
  font-size: 14px;
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
    font-size: 14px;
  }
`;

export function IconInput({ icon: Icon, className, ...props }: TextInputProps) {
  return (
    <InputContainer>
      {Icon && (
        <IconWrapper>
          <Icon />
        </IconWrapper>
      )}
      <StyledInput 
        {...props} 
        className={className}
        autoCorrect="off"
        autoCapitalize="off"
      />
    </InputContainer>
  );
}