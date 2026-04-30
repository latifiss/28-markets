"use client";

import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/app/hooks";
import { selectCurrentUser } from "@/store/features/auth/authSlice";

const Header = styled.div`
  background-color: ${({ theme }) => theme.colors.boxBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PlanBanner = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.yellow}40 0%, ${({ theme }) => theme.colors.select}40 100%);
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const BannerContent = styled.div`
  flex: 1;
`;

const BannerTitle = styled.div`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const BannerText = styled.div`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.grayText};
  line-height: 1.6;
`;

const UserMeta = styled.div`
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const UserName = styled.div`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const UserEmail = styled.div`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.grayText};
`;

const UpgradeButton = styled.button`
  background-color: ${({ theme }) => theme.colors.select};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.625rem 1.25rem;
  border: none;
  font-family: 'Proxima Nova', sans-serif;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.875rem;
  white-space: nowrap;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0 2rem;
`;

const Tab = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  padding: 1rem 1.5rem;
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.875rem;
  font-weight: ${props => (props.active ? "600" : "500")};
  color: ${props => (props.active ? props.theme.colors.select : props.theme.colors.grayText)};
  border-bottom: 2px solid ${props => (props.active ? props.theme.colors.select : "transparent")};
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.select};
  }
`;

export default function DashboardHeader() {
  const [activeTab, setActiveTab] = useState<"api-keys" | "access">("api-keys");
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);
  const tier = user?.tier ?? "free";
  const isPaid = tier === "pro" || tier === "business";

  return (
    <Header>
      <PlanBanner>
        <BannerContent>
          <BannerTitle>{isPaid ? "Manage your plan" : "Enjoying our Demo API plan?"}</BannerTitle>
          <BannerText>
            {isPaid
              ? "Update billing, view invoices, or change your subscription tier any time."
              : "We would appreciate a link credit to our API from your project's website, because it will allow us to keep supplying you with high quality crypto market data. Upgrade to a paid plan today for other exclusive endpoints."}
          </BannerText>
          <UserMeta>
            <UserName>{user?.name ?? "Account"}</UserName>
            <UserEmail>{user?.email ?? "-"}</UserEmail>
          </UserMeta>
        </BannerContent>
        <UpgradeButton type="button" onClick={() => router.push("/pricing")}>
          {isPaid ? "View Pricing" : "Upgrade Plan"}
        </UpgradeButton>
      </PlanBanner>

      <TabsContainer>
        <Tab
          type="button"
          active={activeTab === "api-keys"}
          onClick={() => setActiveTab("api-keys")}
        >
          Usage Report & API Keys
        </Tab>
        <Tab
          type="button"
          active={activeTab === "access"}
          onClick={() => setActiveTab("access")}
        >
          Access
        </Tab>
      </TabsContainer>
    </Header>
  );
}