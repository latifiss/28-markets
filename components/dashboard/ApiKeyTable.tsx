"use client";

import styled from "styled-components";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon, DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ApiKey {
  id: string;
  label: string;
  key: string;
  createdAt: string;
}

interface ApiKeyTableProps {
  apiKeys: ApiKey[];
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.boxBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grayText};
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TableCell = styled.td`
  padding: 1rem;
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
`;

const KeyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const KeyText = styled.span`
  font-family: monospace;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.grayText};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.grayText};
  cursor: pointer;
  padding: 0.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const DeleteButton = styled(ActionButton)`
  color: ${({ theme }) => theme.colors.red};

  &:hover {
    opacity: 0.8;
  }
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  font-family: 'Proxima Nova', sans-serif;
  color: ${({ theme }) => theme.colors.grayText};
`;

export default function ApiKeyTable({ apiKeys }: ApiKeyTableProps) {
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const toggleKeyVisibility = (id: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this API key?")) {
      console.log("Delete key:", id);
    }
  };

  if (apiKeys.length === 0) {
    return (
      <Container>
        <EmptyState>
          No API keys yet. Click "Add New Key" to create one.
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Label</TableHeader>
            <TableHeader>API Key</TableHeader>
            <TableHeader>Creation Date</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {apiKeys.map((apiKey) => (
            <TableRow key={apiKey.id}>
              <TableCell>{apiKey.label}</TableCell>
              <TableCell>
                <KeyContainer>
                  <KeyText>
                    {visibleKeys.has(apiKey.id) ? apiKey.key : "•".repeat(30)}
                  </KeyText>
                  <ActionButton
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                    title={visibleKeys.has(apiKey.id) ? "Hide" : "Show"}
                  >
                    {visibleKeys.has(apiKey.id) ? (
                      <EyeSlashIcon />
                    ) : (
                      <EyeIcon />
                    )}
                  </ActionButton>
                </KeyContainer>
              </TableCell>
              <TableCell>{apiKey.createdAt}</TableCell>
              <TableCell>
                <ActionGroup>
                  <ActionButton
                    onClick={() => copyToClipboard(apiKey.key)}
                    title="Copy"
                  >
                    <DocumentDuplicateIcon />
                  </ActionButton>
                  <DeleteButton
                    onClick={() => handleDelete(apiKey.id)}
                    title="Delete"
                  >
                    <TrashIcon />
                  </DeleteButton>
                </ActionGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}