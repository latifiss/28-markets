'use client';

import { useState, useRef, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

type Option = {
  id: string | number;
  label: string;
};

type SelectDropdownProps = {
  options: Option[];
  placeholder?: string;
  onChange?: (value: Option) => void;
  value?: Option | null;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  position: relative;
  width: 310px;
`;

const TriggerButton = styled.button<{ $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  background-color: #fcfcfc;
  border: 0.8px solid #e0e0e0;
  color: #111827;
  font-weight: 700;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:focus-within {
    border: 2px solid #10b981;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #262626;
    border-color: #404040;
    color: #f3f4f6;
  }
`;

const ButtonText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ChevronIcon = styled.svg<{ $open: boolean }>`
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s;
  transform: ${({ $open }) => $open ? 'rotate(180deg)' : 'rotate(0)'};
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  width: 100%;
  font-weight: 700;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 50;
  animation: ${fadeIn} 0.2s ease-out forwards;

  @media (prefers-color-scheme: dark) {
    background-color: #171717;
    border-color: #404040;
  }
`;

const OptionButton = styled.button<{ $isActive: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  transition: all 0.2s;

  ${({ $isActive }) => $isActive && css`
    background-color: #e5e7eb;

    @media (prefers-color-scheme: dark) {
      background-color: #404040;
    }
  `}

  ${({ $isActive }) => !$isActive && css`
    &:hover {
      background-color: #f3f4f6;
    }

    @media (prefers-color-scheme: dark) {
      &:hover {
        background-color: #262626;
      }
    }
  `}
`;

export function SelectDropdown({
  options,
  placeholder = "Select...",
  onChange,
  value: externalValue = null,
}: SelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(externalValue);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(externalValue);
  }, [externalValue]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    setSelected(option);
    onChange?.(option);
    setOpen(false);
  };

  return (
    <Container ref={containerRef}>
      <TriggerButton
        type="button"
        onClick={() => setOpen(!open)}
        $open={open}
      >
        <ButtonText>{selected?.label || placeholder}</ButtonText>
        <ChevronIcon
          $open={open}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </ChevronIcon>
      </TriggerButton>

      {open && (
        <Dropdown>
          {options.map((option) => {
            const isActive = selected?.id === option.id;
            return (
              <OptionButton
                type="button"
                key={option.id}
                onClick={() => handleSelect(option)}
                $isActive={isActive}
              >
                {option.label}
              </OptionButton>
            );
          })}
        </Dropdown>
      )}
    </Container>
  );
}