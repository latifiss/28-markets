'use client';

import { TextareaHTMLAttributes, useRef, useEffect } from "react";
import styled from "styled-components";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  placeholder?: string;
  error?: boolean;
};

const Container = styled.div<{ $error?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid;
  transition: all 0.2s;
  width: 310px;

  border-color: ${({ $error, theme }) => $error ? theme.colors.red : theme.colors.border};

  &:focus-within {
    border: 2px solid ${({ theme }) => theme.colors.select};
  }
`;

const StyledTextarea = styled.textarea`
  flex: 1;
  resize: none;
  outline: none;
  font-family: 'Proxima Nova', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  background-color: transparent;
  border: none;
  min-height: 40px;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayText};
  }

  &:focus {
    font-size: 16px;
  }
`;

export function Textarea({ className, error, ...props }: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleInput = () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    };

    handleInput(); 
    textarea.addEventListener('input', handleInput);

    return () => textarea.removeEventListener('input', handleInput);
  }, []);

  return (
    <Container $error={error}>
      <StyledTextarea
        ref={textareaRef}
        className={className}
        {...props}
        rows={1}
        autoCorrect="off"
        autoCapitalize="off"
      />
    </Container>
  );
}