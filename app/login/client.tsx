'use client';

import LoginForm from "@/app/login/loginForm";
import styled from "styled-components";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
    padding: 24px 16px 80px 16px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  max-width: 28rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
`;

export default function LoginPageClient() {
  return (
    <PageContainer>
      <Card>
        <LoginForm />
      </Card>
    </PageContainer>
  );
}
