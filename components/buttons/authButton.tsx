'use client';

import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import Image from "next/image";

type AuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  provider: 'google' | 'facebook';
  loading?: boolean;
};

const getProviderStyles = (provider: AuthButtonProps['provider']) => {
  switch(provider) {
    case 'google':
      return {
        iconPath: '/assets/auth/google.svg',
        iconAlt: 'Google'
      };
    case 'facebook':
      return {
        iconPath: '/assets/auth/facebook.svg',
        iconAlt: 'Facebook'
      };
  }
};

const StyledAuthButton = styled.button<{ $provider: 'google' | 'facebook' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  height: 3rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.1s ease;
  position: relative;
  cursor: pointer;
  border: 2px solid;
  
  ${({ $provider, theme }) => {
    if ($provider === 'google') {
      return `
        background-color: ${theme.colors.white};
        border-color: ${theme.colors.border};
        color: ${theme.colors.text};
      `;
    } else {
      return `
        background-color: #1877f2;
        border-color: #054aa5;
        color: ${theme.colors.white};
      `;
    }
  }}
  
  &:hover:not(:disabled) {
    filter: brightness(1.02);
  }
  
  &:active:not(:disabled) {
    transform: translateY(2px);
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

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
`;

const ButtonText = styled.span`
  line-height: 1;
  font-family: 'Proxima Nova', sans-serif;
  color: ${({ theme }) => theme.colors.text};
`;

export function AuthButton({ 
  provider, 
  loading = false, 
  children, 
  ...props 
}: AuthButtonProps) {
  const styles = getProviderStyles(provider);
  
  return (
    <StyledAuthButton
      $provider={provider}
      disabled={loading || props.disabled}
      {...props}
    >
      <IconWrapper>
        <Image 
          src={styles.iconPath} 
          alt={styles.iconAlt}
          width={20}
          height={20}
        />
      </IconWrapper>
      <ButtonText>
        {loading ? 'Please wait...' : children}
      </ButtonText>
    </StyledAuthButton>
  );
}