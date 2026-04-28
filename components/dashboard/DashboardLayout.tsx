"use client";

import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import ApiKeysSection from "./sections/ApiKeysSection";
import { useAppSelector } from "@/store/app/hooks";
import { selectIsAuthenticated } from "@/store/features/auth/authSlice";
import { useGetProfileQuery } from "@/store/features/auth/authAPI";
import { useGetSubscriptionQuery } from "@/store/features/billing/billingAPI";
import { useGetProfileUsageQuery } from "@/store/features/usage/usageAPI";

const Container = styled.div`
  display: flex;
  height: 100vh;
  padding-top: 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Sidebar = styled.div`
  width: 250px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.boxBg};
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 0;
    display: none;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export default function DashboardLayout() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  useGetProfileQuery(undefined, { skip: !isAuthenticated });
  useGetSubscriptionQuery(undefined, { skip: !isAuthenticated });
  useGetProfileUsageQuery({ month, year }, { skip: !isAuthenticated });

  return (
    <Container>
      <Sidebar>
        <DashboardSidebar />
      </Sidebar>
      <MainContent>
        <DashboardHeader />
        <div style={{ flex: 1, padding: "2rem" }}>
          <ApiKeysSection />
        </div>
      </MainContent>
    </Container>
  );
}