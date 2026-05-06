'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { IoInformationCircleOutline, IoClose } from 'react-icons/io5';
import { toggleTheme } from "@/store/themeSlice";
import { LuMoon, LuSun, LuMenu } from "react-icons/lu";
import Button from './buttons/button';
import { useAppDispatch, useAppSelector } from '@/store/app/hooks';
import { logout, selectIsAuthenticated } from '@/store/features/auth/authSlice';

const HeadWrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 16px;
  width: 100%;
  position: relative;
`;

const AdContainer = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-bottom: 2px;
  padding: 0 12px;
`;

const InfoIcon = styled(IoInformationCircleOutline)`
  width: 12px;
  height: 12px;
  color: ${({ theme }) => theme.colors.grayText};
`;

const AdLabel = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grayText};
`;

const InsideAdWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 12px 12px;

  @media (max-width: 768px) {
    padding: 12px 8px;
  }
`;

const AdWrapper = styled.div`
  width: 100%;
  height: 250px;
  background-color: ${({ theme }) => theme.colors.adBg};
  margin-bottom: 12px;
`;

const Component = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.base};
  padding: 8px 0 0 0;
  width: 100%;

  @media (max-width: 768px) {
    align-items: center;
    padding: 0 16px;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0px 30px;

  @media (max-width: 576px) {
    padding: 0px 0px;
  }

  @media (min-width: 577px) and (max-width: 768px) {
    padding: 0px 16px;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const Logo = styled(Image)`
  height: 55px;
  width: auto;
  object-fit: contain;

  @media (max-width: 576px) {
    height: 28px;
  }

  @media (min-width: 577px) and (max-width: 768px) {
    height: 45px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PricingButton = styled(Button)`
  padding: 8px 20px;
  height: 38px;
  font-size: 14px;
  font-weight: 600;
`;

const OtherSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TabRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 12px 20px;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;

  @media only screen and (max-width: 576px) {
    justify-content: flex-start;
    padding: 8px 8px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    justify-content: flex-start;
    padding: 8px 16px;
  }
`;

const TabComponent = styled.div<{ $isActive: boolean; $tabType: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  height: 32px;
  cursor: pointer;
  text-decoration: none;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.dust : theme.colors.deep};
  border: 1px solid ${({ $isActive, theme }) =>
    $isActive ? theme.colors.dust : theme.colors.stroke};
  border-radius: 99px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.altBg : 'transparent'};
  }

  @media (max-width: 576px) {
    padding: 0 6px;
    height: 40px;
  }
`;

const Alink = styled(Link)`
  text-decoration: none;
`;

const TabText = styled.p<{ $isActive: boolean }>`
  font-size: 15px;
  font-weight: 500;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.white : theme.colors.text};
  font-family: 'DIN Next LT Pro', sans-serif;
  text-decoration: none;
  margin-left: 3px;
  margin-top: 4px;
  white-space: nowrap;
`;

const IconButton = styled.button`
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 50%;
  border: 1px solid transparent;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

const MoonIcon = styled(LuMoon)`
  width: 18px;
  height: 18px;
  color: ${({ theme }) => theme.colors.grayText};
`;

const SunIcon = styled(LuSun)`
  width: 18px;
  height: 18px;
  color: ${({ theme }) => theme.colors.grayText};
`;

const MenuIcon = styled(LuMenu)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.text};
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const ModalContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.boxBg};
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

const CloseIcon = styled(IoClose)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.text};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 16px;
`;

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

const LoginButtonWrapper = styled.div`
  padding: 12px 16px;
  margin-bottom: -18px;
`;

const SignupButtonWrapper = styled.div`
  padding: 12px 16px;
`;

const StyledLoginButton = styled(Button)`
  width: 100%;
  justify-content: center;
`;

const StyledSignupButton = styled(Button)`
  width: 100%;
  justify-content: center;
`;

const ThemeToggle = () => {
  const themeMode = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  return (
    <IconButton onClick={() => dispatch(toggleTheme())}>
      {themeMode === "light" ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};

interface TabProps {
  label: string;
  isActive: boolean;
  href: string;
  TabImage: string;
}

const Tab = ({ label, isActive, href, TabImage }: TabProps) => (
  <Alink href={href} passHref>
    <TabComponent $isActive={isActive} $tabType={label}>
      <Image src={TabImage} alt={label} width={18} height={18} />
      <TabText $isActive={isActive}>{label}</TabText>
    </TabComponent>
  </Alink>
);

const Header = () => {
  const themeMode = useAppSelector((state) => state.theme.theme);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const logoSrc = themeMode === "light" 
    ? "/assets/logo/logo-black.svg" 
    : "/assets/logo/logo-white.svg";

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = useCallback(() => {
    dispatch(logout());
    handleCloseMenu();
  }, [dispatch]);

  // Navigation handler for login/signup
  const handleNavigation = (path: string) => {
    handleCloseMenu();
    window.location.href = path;
  };

  return (
    <>
      <HeadWrapper>
        <AdContainer>
          <LabelContainer>
            <InfoIcon />
            <AdLabel>Advertisement</AdLabel>
          </LabelContainer>
          <InsideAdWrapper>
            <AdWrapper />
          </InsideAdWrapper>
        </AdContainer>

        <Component>
          <TopRow>
            <LogoLink href="/">
              <Logo 
                src={logoSrc} 
                alt="logo" 
                width={322} 
                height={55} 
                priority
              />
            </LogoLink>
            <RightSection>
              <ThemeToggle />
              <MenuButton onClick={handleMenuToggle}>
                <MenuIcon />
              </MenuButton>
            </RightSection>
          </TopRow>
        </Component>
      </HeadWrapper>

      <Overlay $isOpen={isMenuOpen} onClick={handleCloseMenu} />
      
      <ModalContainer $isOpen={isMenuOpen}>
        <ModalHeader>
          <CloseButton onClick={handleCloseMenu}>
            <CloseIcon />
          </CloseButton>
        </ModalHeader>
        <ModalContent>
          {!isAuthenticated ? (
            <>
              <LoginButtonWrapper>
                <StyledLoginButton 
                  variant="primary" 
                  onClick={() => handleNavigation('/login')}
                >
                  Login
                </StyledLoginButton>
              </LoginButtonWrapper>
              <SignupButtonWrapper>
                <StyledSignupButton 
                  variant="outline" 
                  onClick={() => handleNavigation('/signup')}
                >
                  Sign Up
                </StyledSignupButton>
              </SignupButtonWrapper>
            </>
          ) : (
            <LoginButtonWrapper>
              <StyledLoginButton variant="outline" onClick={handleLogout}>
                Logout
              </StyledLoginButton>
            </LoginButtonWrapper>
          )}
          <MenuLink href="/api" onClick={handleCloseMenu}>
            API
          </MenuLink>
          <MenuLink href="/docs" onClick={handleCloseMenu}>
            Documentation
          </MenuLink>
          <MenuLink href="/pricing" onClick={handleCloseMenu}>
            Pricing
          </MenuLink>
          {isAuthenticated && (
            <MenuLink href="/dashboard" onClick={handleCloseMenu}>
              Developer
            </MenuLink>
          )}
        </ModalContent>
      </ModalContainer>
    </>
  );
};

export default Header;