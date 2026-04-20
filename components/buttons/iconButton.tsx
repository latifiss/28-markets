'use client'

import { ButtonHTMLAttributes, ElementType } from 'react'
import styled, { css } from 'styled-components'

type ButtonIconProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ElementType
  text: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const getVariantStyles = (variant: ButtonIconProps['variant'] = 'primary') => {
  const variants = {
    primary: css`
      background-color: ${({ theme }) => theme.colors.boxBg};
      border: 2px solid ${({ theme }) => theme.colors.border};
      color: ${({ theme }) => theme.colors.text};
    `,
    secondary: css`
      background-color: ${({ theme }) => theme.colors.selectBg};
      border: 2px solid ${({ theme }) => theme.colors.selectStroke};
      color: ${({ theme }) => theme.colors.selectText};
    `,
    outline: css`
      background-color: transparent;
      border: 2px solid ${({ theme }) => theme.colors.border};
      color: ${({ theme }) => theme.colors.text};
    `,
    ghost: css`
      background-color: transparent;
      border: 2px solid transparent;
      color: ${({ theme }) => theme.colors.text};
    `,
  }

  return variants[variant] || variants.primary
}

const getSizeStyles = (size: ButtonIconProps['size'] = 'md') => {
  const sizes = {
    sm: css`
      padding: 0.25rem 0.75rem;
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
  }

  return sizes[size] || sizes.md
}

const StyledButton = styled.button<{
  variant?: ButtonIconProps['variant']
  size?: ButtonIconProps['size']
}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  height: 49px;
  font-family: 'Proxima Nova', sans-serif;
  font-weight: 600;
  transition: all 0.1s ease;
  cursor: pointer;
  
  svg {
    width: 18px;
    height: 18px;
    color: ${({ theme }) => theme.colors.grayText};
  }
  
  &:focus {
    outline: none;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}
`

export default function ButtonIcon({
  icon: Icon,
  text,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonIconProps) {
  return (
    <StyledButton
      variant={variant}
      size={size}
      className={className}
      {...props as any}
    >
      <Icon />
      {text}
    </StyledButton>
  )
}