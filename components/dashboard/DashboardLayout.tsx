"use client";

import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import ApiKeysSection from "./sections/ApiKeysSection";

const Container = styled.div`
  display: flex;
  height: 100vh;
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