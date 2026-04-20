'use client';

import { useState, useRef, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ClipLoader } from 'react-spinners';

type Option = {
  id: string | number;
  label: string;
};

type SearchDropdownProps = {
  placeholder?: string;
  value?: Option | null;
  onChange?: (value: Option) => void;
  onSearch: (query: string) => Promise<Option[]>;
  defaultResults?: Option[];
  showDefaultOnOpen?: boolean;
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
  width: 100%;
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

  &:hover {
    background-color: #f9fafb;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #262626;
    border-color: #404040;
    color: #f3f4f6;

    &:hover {
      background-color: #404040;
    }
  }
`;

const ButtonText = styled.span`
  truncate: true;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ChevronIcon = styled.svg<{ $open: boolean }>`
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  transition: transform 0.2s;
  transform: ${({ $open }) => $open ? 'rotate(180deg)' : 'rotate(0)'};
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  width: 100%;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 50;
  animation: ${fadeIn} 0.2s ease-out;

  @media (prefers-color-scheme: dark) {
    background-color: #171717;
    border-color: #404040;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: transparent;
  font-size: 0.875rem;
  font-weight: 700;
  outline: none;

  &::placeholder {
    color: #6b7280;
  }

  @media (prefers-color-scheme: dark) {
    border-color: #404040;
    color: #f3f4f6;

    &::placeholder {
      color: #9ca3af;
    }
  }
`;

const LoaderWrapper = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
`;

const ResultsList = styled.div`
  max-height: 240px;
  overflow-y: auto;
`;

const MessageContainer = styled.div`
  padding: 0.75rem 1rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
`;

const LoadingMessage = styled(MessageContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ResultButton = styled.button<{ $isActive: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.625rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: #f9fafb;
  }

  ${({ $isActive }) => $isActive && css`
    background-color: #ecfdf5;
    border-left: 2px solid #10b981;
    color: #047857;

    @media (prefers-color-scheme: dark) {
      background-color: rgba(16, 185, 129, 0.2);
      color: #6ee7b7;
    }
  `}

  ${({ $isActive }) => !$isActive && css`
    color: #374151;

    @media (prefers-color-scheme: dark) {
      color: #d1d5db;
    }
  `}

  @media (prefers-color-scheme: dark) {
    &:hover {
      background-color: #262626;
    }
  }
`;

const ResultContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ResultLabel = styled.div`
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CheckIcon = styled.svg`
  width: 1rem;
  height: 1rem;
  color: #10b981;
  flex-shrink: 0;
`;

export function AltSearchDropdown({
  placeholder = 'Search...',
  value: externalValue = null,
  onChange,
  onSearch,
  defaultResults = [],
  showDefaultOnOpen = true,
}: SearchDropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Option[]>(defaultResults);
  const [selected, setSelected] = useState<Option | null>(externalValue);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showDefaults, setShowDefaults] = useState(showDefaultOnOpen);

  useEffect(() => {
    setSelected(externalValue);
  }, [externalValue]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setShowDefaults(showDefaultOnOpen);
        setQuery('');
        setResults(defaultResults);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [defaultResults, showDefaultOnOpen]);

  useEffect(() => {
    if (!open) return;
    let active = true;

    if (!query.trim() && showDefaults && defaultResults.length > 0) {
      setResults(defaultResults);
      setLoading(false);
      return;
    }

    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setShowDefaults(false);

    onSearch(query)
      .then((data) => {
        if (active) setResults(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [query, open, onSearch, defaultResults, showDefaults]);

  const handleOpen = () => {
    setOpen(true);
    if (showDefaultOnOpen) {
      setResults(defaultResults);
      setShowDefaults(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (!value.trim() && showDefaultOnOpen) {
      setShowDefaults(true);
      setResults(defaultResults);
    }
  };

  const handleSelect = (option: Option) => {
    setSelected(option);
    onChange?.(option);
    setQuery(option.label);
    setOpen(false);
    setShowDefaults(showDefaultOnOpen);
    setResults(defaultResults);
  };

  const getDisplayText = () => selected?.label || placeholder;

  return (
    <Container ref={containerRef}>
      <TriggerButton type="button" onClick={handleOpen} $open={open}>
        <ButtonText>{getDisplayText()}</ButtonText>
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
          <InputWrapper>
            <SearchInput
              value={query}
              onChange={handleInputChange}
              autoFocus
              placeholder="Type to search..."
            />
            {loading && (
              <LoaderWrapper>
                <ClipLoader size={16} color="#6b7280" />
              </LoaderWrapper>
            )}
          </InputWrapper>

          <ResultsList>
            {loading && !showDefaults && (
              <LoadingMessage>
                <ClipLoader size={16} color="#10B981" />
                <span>Searching...</span>
              </LoadingMessage>
            )}

            {!loading && results.length === 0 && query && (
              <MessageContainer>
                No results found for "{query}"
              </MessageContainer>
            )}

            {!loading && results.length === 0 && !query && !showDefaults && (
              <MessageContainer>
                Start typing to search...
              </MessageContainer>
            )}

            {results.map((option) => {
              const isActive = selected?.id === option.id;
              return (
                <ResultButton
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option)}
                  $isActive={isActive}
                >
                  <ResultContent>
                    <ResultLabel>{option.label}</ResultLabel>
                  </ResultContent>
                  {isActive && (
                    <CheckIcon
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </CheckIcon>
                  )}
                </ResultButton>
              );
            })}
          </ResultsList>
        </Dropdown>
      )}
    </Container>
  );
}