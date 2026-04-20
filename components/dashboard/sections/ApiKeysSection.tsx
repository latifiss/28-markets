"use client";

import styled from "styled-components";
import { useState } from "react";
import ApiKeyTable from "../ApiKeyTable";
import CreateApiKeyModal from "../CreateApiKeyModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const AddKeyButton = styled.button`
  background-color: ${({ theme }) => theme.colors.select};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.625rem 1.25rem;
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.boxBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1.5rem;
`;

const StatLabel = styled.div`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.grayText};
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const StatChange = styled.div<{ positive?: boolean }>`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.875rem;
  color: ${props => props.positive ? props.theme.colors.select : props.theme.colors.grayText};
  margin-top: 0.5rem;
`;

export default function ApiKeysSection() {
  const [showModal, setShowModal] = useState(false);
  const [apiKeys, setApiKeys] = useState([
    {
      id: "1",
      label: "Demo Key",
      key: "CG-F8a***********************52k",
      createdAt: "2025-05-31",
    },
  ]);

  const handleCreateKey = (label: string) => {
    const newKey = {
      id: String(apiKeys.length + 1),
      label,
      key: `CG-${Math.random().toString(36).substring(2, 15)}*****`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setApiKeys([...apiKeys, newKey]);
    setShowModal(false);
  };

  return (
    <Container>
      <SectionHeader>
        <Title>My API Keys</Title>
        <AddKeyButton onClick={() => setShowModal(true)}>
          + Add New Key
        </AddKeyButton>
      </SectionHeader>

      <StatsGrid>
        <StatCard>
          <StatLabel>Total Monthly API Calls</StatLabel>
          <StatValue>0</StatValue>
          <StatChange>/ 10,000</StatChange>
        </StatCard>
        
        <StatCard>
          <StatLabel>Remaining monthly API Calls</StatLabel>
          <StatValue>10,000</StatValue>
          <StatChange positive>All available</StatChange>
        </StatCard>

        <StatCard>
          <StatLabel>Rate Limit - Request Per Minute</StatLabel>
          <StatValue>30</StatValue>
          <StatChange>requests/minute</StatChange>
        </StatCard>

        <StatCard>
          <StatLabel>Last Used</StatLabel>
          <StatValue>-</StatValue>
          <StatChange>No usage yet</StatChange>
        </StatCard>
      </StatsGrid>

      <ApiKeyTable apiKeys={apiKeys} />

      {showModal && (
        <CreateApiKeyModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateKey}
        />
      )}
    </Container>
  );
}