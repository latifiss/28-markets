"use client";

import { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
};

const getVariantStyles = (variant: ButtonProps['variant'] = "primary") => {
  const variants = {
    primary: css`
      background-color: ${({ theme }) => theme.colors.yellow};
      border: 2px solid ${({ theme }) => theme.colors.yellow};
      color: ${({ theme }) => theme.colors.text};
    `,
    secondary: css`
      background-color: ${({ theme }) => theme.colors.boxBg};
      border: 2px solid ${({ theme }) => theme.colors.border};
      color: ${({ theme }) => theme.colors.text};
    `,
    outline: css`
      background-color: transparent;
      border: 2px solid ${({ theme }) => theme.colors.select};
      color: ${({ theme }) => theme.colors.select};
    `,
    ghost: css`
      background-color: transparent;
      border: 2px solid transparent;
      color: ${({ theme }) => theme.colors.text};
    `,
  };

  return variants[variant] || variants.primary;
};

const getSizeStyles = (size: ButtonProps['size'] = "md") => {
  const sizes = {
    sm: css`
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
    `,
    md: css`
      padding: 0.5rem 1rem;
      font-size: 1rem;
    `,
    lg: css`
      padding: 0.75rem 1.25rem;
      font-size: 1.125rem;
    `,
  };

  return sizes[size] || sizes.md;
};

const StyledButton = styled.button<ButtonProps>`
  font-family: 'Proxima Nova', sans-serif;
  font-weight: 600;
  transition: all 0.1s ease;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  &:focus {
    outline: none;
  }

  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}
`;

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={loading || props.disabled}
      className={className}
      {...props}
    >
      {loading ? "Loading..." : children}
    </StyledButton>
  );
}