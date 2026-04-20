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

const TriggerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Proxima Nova', sans-serif;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.boxBg};
  }

  &:focus {
    outline: none;
  }
`;

const ButtonText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: 'Proxima Nova', sans-serif;
`;

const ChevronIcon = styled.svg<{ $open: boolean }>`
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  transition: transform 0.2s;
  transform: ${({ $open }) => $open ? 'rotate(180deg)' : 'rotate(0)'};
  color: ${({ theme }) => theme.colors.grayText};
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  z-index: 50;
  animation: ${fadeIn} 0.2s ease-out;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: transparent;
  font-family: 'Proxima Nova', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayText};
  }

  &:focus {
    font-size: 16px;
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
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grayText};
`;

const LoadingMessage = styled(MessageContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const DefaultSectionHeader = styled.div`
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const SectionTitle = styled.div`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grayText};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.25rem;
`;

const ResultButton = styled.button<{ $isActive: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.625rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  background: transparent;
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.boxBg};
  }

  ${({ $isActive, theme }) => $isActive && css`
    background-color: ${theme.colors.selectBg};
    border-left: 2px solid ${theme.colors.select};
    color: ${theme.colors.selectText};
  `}

  ${({ $isActive, theme }) => !$isActive && css`
    color: ${theme.colors.text};
  `}
`;

const ResultContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ResultLabel = styled.div`
  font-family: 'Proxima Nova', sans-serif;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CheckIcon = styled.svg`
  width: 1rem;
  height: 1rem;
  color: ${({ theme }) => theme.colors.select};
  flex-shrink: 0;
`;

export function SearchDropdown({
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
      <TriggerButton type="button" onClick={handleOpen}>
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
              autoCorrect="off"
              autoCapitalize="off"
            />
            {loading && (
              <LoaderWrapper>
                <ClipLoader size={16} color={theme?.colors?.grayText || '#6b7280'} />
              </LoaderWrapper>
            )}
          </InputWrapper>

          <ResultsList>
            {loading && !showDefaults && (
              <LoadingMessage>
                <ClipLoader size={16} color={theme?.colors?.select || '#10b981'} />
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

            {showDefaults && !query && defaultResults.length > 0 && (
              <DefaultSectionHeader>
                <SectionTitle>
                  Latest Sections
                </SectionTitle>
              </DefaultSectionHeader>
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