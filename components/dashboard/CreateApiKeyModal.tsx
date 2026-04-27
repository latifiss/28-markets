"use client";

import styled from "styled-components";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface CreateApiKeyModalProps {
  onClose: () => void;
  onCreate: (label: string) => void | Promise<void>;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: ${({ theme }) => theme.colors.boxBg};
  max-width: 500px;
  width: 90%;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.h2`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.grayText};
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.875rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.colors.select};
  }
`;

const HelperText = styled.p`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.grayText};
  margin-top: 0.25rem;
`;

const Footer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  flex: 1;
  padding: 0.625rem 1rem;
  border: none;
  font-family: 'Proxima Nova', sans-serif;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.875rem;

  ${props =>
    props.variant === "primary"
      ? `
    background-color: ${props.theme.colors.select};
    color: ${props.theme.colors.white};
  `
      : `
    background-color: ${props.theme.colors.border};
    color: ${props.theme.colors.text};
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function CreateApiKeyModal({
  onClose,
  onCreate,
}: CreateApiKeyModalProps) {
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;

    setLoading(true);
    try {
      await onCreate(label);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Create New API Key</Title>
          <CloseButton type="button" onClick={onClose}>
            <XMarkIcon className="w-6 h-6" />
          </CloseButton>
        </Header>

        <form onSubmit={handleSubmit}>
          <Content>
            <FormGroup>
              <Label htmlFor="label">Key Label</Label>
              <Input
                id="label"
                type="text"
                placeholder="e.g., My Website, Mobile App"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                autoFocus
              />
              <HelperText>
                Give your API key a descriptive name for easy identification
              </HelperText>
            </FormGroup>
          </Content>

          <Footer>
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={!label.trim() || loading}
            >
              {loading ? "Creating..." : "Create Key"}
            </Button>
          </Footer>
        </form>
      </Modal>
    </Overlay>
  );
}