"use client";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.h2`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.boxBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
`;

const Text = styled.p`
  font-family: 'Proxima Nova', sans-serif;
  color: ${({ theme }) => theme.colors.grayText};
  line-height: 1.6;
`;

export default function AccessSection() {
  return (
    <Container>
      <Title>Access Settings</Title>
      
      <Card>
        <Text>
          Access settings and permissions will appear here. You can manage your API key permissions, IP whitelisting, and other security settings.
        </Text>
      </Card>
    </Container>
  );
}