"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import ApiKeyTable from "../ApiKeyTable";
import CreateApiKeyModal from "../CreateApiKeyModal";
import { useAppSelector } from "@/store/app/hooks";
import { selectCurrentUser } from "@/store/features/auth/authSlice";
import { selectProfileUsage } from "@/store/features/usage/usageSlice";
import { useGetApiKeysQuery, useGenerateApiKeyMutation, useDeleteApiKeyMutation } from "@/store/features/auth/authAPI";
import { useGetProfileUsageQuery } from "@/store/features/usage/usageAPI";

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
  text-transform: capitalize;
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

const DEFAULT_TIER_LIMITS: Record<string, { perMinute?: number; monthlyRequests?: number }> = {
  free: { perMinute: 30, monthlyRequests: 10_000 },
  pro: { perMinute: 100 },
  business: { perMinute: 120 },
};

const formatNumber = (n: number) => new Intl.NumberFormat().format(n);
const formatDate = (isoOrDate: string | Date) => {
  const d = typeof isoOrDate === "string" ? new Date(isoOrDate) : isoOrDate;
  if (Number.isNaN(d.getTime())) return "-";
  return d.toISOString().slice(0, 10);
};

export default function ApiKeysSection() {
  const [showModal, setShowModal] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const profileUsage = useAppSelector(selectProfileUsage);

  const isAuthed = !!user;

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  useGetProfileUsageQuery(
    { month, year },
    { skip: !isAuthed },
  );

  const { data: apiKeysData, isFetching: isFetchingKeys, refetch } = useGetApiKeysQuery(undefined, { skip: !isAuthed });
  const [generateApiKey, { isLoading: isCreatingKey }] = useGenerateApiKeyMutation();
  const [deleteApiKey, { isLoading: isDeletingKey }] = useDeleteApiKeyMutation();

  const tier = (user?.tier ?? "free") as string;
  const tierLimits = DEFAULT_TIER_LIMITS[tier] ?? DEFAULT_TIER_LIMITS.free;
  const isPaidTier = tier === "pro" || tier === "business";
  const currentPeriodEnd = user?.currentPeriodEnd ?? null;

  const monthlyUsed = (profileUsage?.usage ?? []).reduce((sum, u) => sum + (u.count ?? 0), 0);
  const monthlyLimit = user?.usage?.limit ?? tierLimits.monthlyRequests ?? null;
  const remaining = monthlyLimit != null ? Math.max(0, monthlyLimit - monthlyUsed) : null;

  const apiKeys = (apiKeysData?.apiKeys ?? []).map((k) => ({
    id: k.key, // backend delete route expects an id-like param; we pass the key string consistently
    label: k.name,
    key: k.key,
    createdAt: (k.createdAt ?? "").slice(0, 10),
  }));

  const lastUsed =
    (apiKeysData?.apiKeys ?? [])
      .map((k) => k.lastUsed)
      .filter(Boolean)
      .sort()
      .at(-1) ?? null;

  const handleCreateKey = async (label: string) => {
    await generateApiKey({ name: label }).unwrap();
    await refetch();
    setShowModal(false);
  };

  const handleDeleteKey = async (id: string) => {
    await deleteApiKey({ keyId: id }).unwrap();
  };

  useEffect(() => {
    if (!showModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showModal]);

  return (
    <Container>
      <SectionHeader>
        <Title>My API Keys</Title>
        <AddKeyButton
          type="button"
          onClick={() => setShowModal(true)}
          disabled={isFetchingKeys || isCreatingKey || isDeletingKey}
        >
          + Add New Key
        </AddKeyButton>
      </SectionHeader>

      <StatsGrid>
        <StatCard>
          <StatLabel>Total Monthly API Calls</StatLabel>
          <StatValue>{formatNumber(monthlyUsed)}</StatValue>
          <StatChange>{monthlyLimit != null ? `/ ${formatNumber(monthlyLimit)}` : "/ Unlimited"}</StatChange>
        </StatCard>
        
        <StatCard>
          <StatLabel>Remaining monthly API Calls</StatLabel>
          <StatValue>{monthlyLimit != null ? formatNumber(remaining ?? 0) : "Unlimited"}</StatValue>
          <StatChange positive={monthlyLimit == null || (remaining ?? 0) > 0}>
            {monthlyLimit != null ? ((remaining ?? 0) === monthlyLimit ? "All available" : "") : "No monthly cap"}
          </StatChange>
        </StatCard>

        <StatCard>
          <StatLabel>Current plan</StatLabel>
          <StatValue>{tier}</StatValue>
          <StatChange>
            {isPaidTier
              ? `Expires: ${currentPeriodEnd ? formatDate(currentPeriodEnd) : "-"}`
              : `Reset date: ${currentPeriodEnd ? formatDate(currentPeriodEnd) : "-"}`}
          </StatChange>
        </StatCard>
      </StatsGrid>

      <ApiKeyTable apiKeys={apiKeys} onDelete={handleDeleteKey} />

      {showModal && (
        <CreateApiKeyModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateKey}
        />
      )}
    </Container>
  );
}