"use client";

import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SidebarContainer = styled.div`
  padding: 1.5rem 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  padding: 0 1rem;
  margin-bottom: 2rem;

  &:last-child {
    margin-top: auto;
  }
`;

const SectionTitle = styled.div`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ToggleIcon = styled.span<{ open: boolean }>`
  transition: transform 0.2s;
  transform: ${props => (props.open ? "rotate(0deg)" : "rotate(-90deg)")};
  display: inline-block;
`;

const SectionContent = styled.div<{ open: boolean }>`
  display: ${props => (props.open ? "block" : "none")};
  max-height: ${props => (props.open ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const NavLink = styled(Link)`
  display: block;
  padding: 0.5rem 0;
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.select};
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem 0;
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.875rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.grayText};
`;

const StatValue = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 0.625rem 1rem;
  background-color: ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  font-family: 'Proxima Nova', sans-serif;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.875rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function DashboardSidebar() {
  const [usefulLinksOpen, setUsefulLinksOpen] = useState(true);
  const [usageReportOpen, setUsageReportOpen] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <SidebarContainer>
      <Section>
        <SectionTitle onClick={() => setUsefulLinksOpen(!usefulLinksOpen)}>
          <span>Useful Links</span>
          <ToggleIcon open={usefulLinksOpen}>▼</ToggleIcon>
        </SectionTitle>
        <SectionContent open={usefulLinksOpen}>
          <NavLink href="#">User guide to get started</NavLink>
          <NavLink href="#">API Documentation</NavLink>
          <NavLink href="#">View Tips, FAQ & Contact Support</NavLink>
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle onClick={() => setUsageReportOpen(!usageReportOpen)}>
          <span>Usage Report</span>
          <ToggleIcon open={usageReportOpen}>▼</ToggleIcon>
        </SectionTitle>
        <SectionContent open={usageReportOpen}>
          <StatRow>
            <StatLabel>Monthly API Calls</StatLabel>
            <StatValue>0 / 10,000</StatValue>
          </StatRow>
          <StatRow>
            <StatLabel>Remaining Calls</StatLabel>
            <StatValue>10,000</StatValue>
          </StatRow>
          <StatRow>
            <StatLabel>Rate Limit (rpm)</StatLabel>
            <StatValue>30</StatValue>
          </StatRow>
          <StatRow>
            <StatLabel>Last Used</StatLabel>
            <StatValue>-</StatValue>
          </StatRow>
        </SectionContent>
      </Section>

      <Section>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Section>
    </SidebarContainer>
  );
}