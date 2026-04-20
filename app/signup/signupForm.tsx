'use client';

import styled from "styled-components";
import { IconInput } from "@/components/inputs/iconInput";
import Button from "@/components/buttons/button";
import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRegisterMutation } from "@/store/features/auth/authAPI";
import { ClipLoader } from "react-spinners";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
`;

const Subtitle = styled.p`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.grayText || "#666"};
  margin-top: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const ErrorAlert = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.boxBg || "#fef2f2"};
  border: 1px solid ${({ theme }) => theme.colors.red || "#fecaca"};
`;

const ErrorText = styled.p`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.red || "#dc2626"};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const HelperText = styled.p`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.grayText || "#666"};
  margin-top: 0.25rem;
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.grayText || "#9ca3af"};
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ButtonContainer = styled.div`
  padding-top: 0.5rem;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background: ${({ theme }) => theme.colors.yellow || "#2e7d32"};
  color: white;
  font-family: 'Proxima Nova', sans-serif;
  font-weight: 600;
  padding: 0.75rem 1rem;
  border: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Proxima Nova', sans-serif;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FooterText = styled.p`
  font-family: 'Proxima Nova', sans-serif;
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.grayText || "#666"};
`;

const FooterLink = styled(Link)`
  text-decoration: underline;
  font-weight: 600;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
`;

const LoginLink = styled(FooterLink)`
  color: ${({ theme }) => theme.colors.select || "#2e7d32"};
`;

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState("");
  const router = useRouter();
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError("");

    if (!formData.name.trim()) {
      setValidationError("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      setValidationError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setValidationError("Please enter a valid email address");
      return;
    }

    if (!formData.password) {
      setValidationError("Password is required");
      return;
    }

    if (formData.password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    try {
      const result = await register({ 
        email: formData.email, 
        password: formData.password,
        name: formData.name
      }).unwrap();
      
      if (result.token) {
        localStorage.setItem("auth_token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        
        router.push("/dashboard");
      } else {
        setValidationError("Registration failed: No token received");
      }
    } catch (err: any) {
      const message = err?.data?.error || err?.message || "Registration failed";
      setValidationError(message);
    }
  };

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const getErrorMessage = () => {
    if (validationError) return validationError;
    if (!error) return null;
    
    if ('data' in error && error.data) {
      const data = error.data as any;
      return data?.error || data?.message || 'Registration failed. Please try again.';
    }
    
    if ('status' in error) {
      switch (error.status) {
        case 400:
          return "User already exists or invalid registration data provided";
        case 409:
          return "A user with this email already exists";
        case 500:
          return "Server error. Please try again later.";
        default:
          return 'Registration failed. Please try again.';
      }
    }
    
    return 'Registration failed. Please try again.';
  };

  const errorMessage = getErrorMessage();

  return (
    <Container>
      <Header>
        <Title>Create an account</Title>
        <Subtitle>Sign up to get started</Subtitle>
      </Header>

      <Form onSubmit={handleSubmit}>
        {errorMessage && (
          <ErrorAlert>
            <ErrorText>{errorMessage}</ErrorText>
          </ErrorAlert>
        )}

        <InputGroup>
          <Label>Full Name</Label>
          <IconInput
            icon={UserIcon}
            placeholder="Enter your full name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange("name")}
            disabled={isLoading}
          />
          <HelperText>This will be your display name</HelperText>
        </InputGroup>

        <InputGroup>
          <Label>Email address</Label>
          <IconInput
            icon={EnvelopeIcon}
            placeholder="Enter your email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange("email")}
            disabled={isLoading}
            autoComplete="email"
          />
          <HelperText>Use a valid email address</HelperText>
        </InputGroup>

        <InputGroup>
          <Label>Password</Label>
          <PasswordContainer>
            <IconInput
              icon={LockClosedIcon}
              placeholder="Create a password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange("password")}
              disabled={isLoading}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </PasswordToggle>
          </PasswordContainer>
          <HelperText>Must be at least 6 characters</HelperText>
        </InputGroup>

        <InputGroup>
          <Label>Confirm Password</Label>
          <PasswordContainer>
            <IconInput
              icon={LockClosedIcon}
              placeholder="Confirm your password"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              disabled={isLoading}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </PasswordToggle>
          </PasswordContainer>
        </InputGroup>

        <ButtonContainer>
          <StyledButton 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingContent>
                <ClipLoader size={16} color="#fff" />
                Creating account...
              </LoadingContent>
            ) : (
              "Create Account"
            )}
          </StyledButton>
        </ButtonContainer>

        <Footer>
          <FooterText>
            Already have an account?{" "}
            <LoginLink href="/login">
              Login here
            </LoginLink>
          </FooterText>
        </Footer>
      </Form>
    </Container>
  );
}