"use client";

import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/app/hooks";
import { selectIsAuthenticated, selectCurrentUser } from "@/store/features/auth/authSlice";
import { selectSubscription } from "@/store/features/billing/billingSlice";
import { useGetProfileQuery } from "@/store/features/auth/authAPI";
import { useGetSubscriptionQuery, useCreateCheckoutSessionMutation, useCreatePortalSessionMutation } from "@/store/features/billing/billingAPI";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 60px 24px 80px;

  @media (max-width: 768px) {
    padding: 40px 16px 60px;
  }
`;

const Title = styled.h1`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 26px;
  line-height: 31.2px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 48px;
  letter-spacing: -0.02em;

  @media (max-width: 480px) {
    margin-bottom: 32px;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 480px;
  }
`;

interface CardProps {
  $featured?: boolean;
}

const Card = styled.div<CardProps>`
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 2px solid ${({ $featured, theme }) => $featured ? "#2e7d32" : theme.colors.border};
  background: ${({ $featured, theme }) => $featured ? theme.colors.boxBg : theme.colors.background};
  box-shadow: ${({ $featured }) =>
    $featured
      ? "0 8px 32px rgba(46,125,50,0.12)"
      : "0 2px 12px rgba(0,0,0,0.06)"};
  position: relative;

  @media (max-width: 480px) {
    padding: 24px 20px;
  }
`;

const PopularBadge = styled.span`
  position: absolute;
  top: -13px;
  left: 50%;
  transform: translateX(-50%);
  background: #2e7d32;
  color: #fff;
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  padding: 4px 14px;
  border-radius: 20px;
  white-space: nowrap;
  text-transform: uppercase;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PlanName = styled.h2`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  letter-spacing: 0.01em;
`;

const PriceBox = styled.div<CardProps>`
  background: ${({ $featured }) => ($featured ? "#2e7d32" : "#1a1a1a")};
  color: ${({ theme }) => theme.colors.white};
  padding: 14px 20px;
  text-align: center;
`;

const Price = styled.p`
  font-family: 'Proxima Nova', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.03em;
`;

const FeatureList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

const FeatureRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-start;
    width: 100%;
    padding: 2px 0px;
`

const FeatureItemIcon = styled(Image)`
    width: 28px;
    height: 28px;
    object-fit: contain;
`

const FeatureLabel = styled.p`
  font-size: 16px;
  line-height: 14px;
  font-weight: 500;
  margin: 0;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }

  @media only screen and (min-width: 769px) and (max-width: 992px) {
    font-size: 16px;
  }
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

interface ButtonProps {
  $variant?: "primary" | "outline";
}

const Button = styled.a<ButtonProps>`
  display: inline-block;
  padding: 8px 28px 4px 28px;
  height: 38px;
  border-radius: 2px;
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  width: 100%;

  ${({ $variant }) =>
    $variant === "primary"
      ? `
        background: #f59e0b;
        color: #1a1a1a;
        border: 2px solid #f59e0b;
      `
      : `
        background: transparent;
        color: #2e7d32;
        border: 2px solid #2e7d32;
      `}
`;

const AnnualNote = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  font-family: inherit;
  font-weight: 700;
  margin-top: 2px;

  a {
    color: ${({ theme }) => theme.colors.select};
    text-decoration: none;
    cursor: pointer;
  }
`;

const BottomSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  margin-top: 48px;

  @media (max-width: 480px) {
    margin-top: 32px;
  }
`;

const PaymentIcons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const PaymentIcon = styled(Image)`
    height: 28px;
    width: auto;
    object-fit: contain;
`;

const SpecialOfferBox = styled.div`
  text-align: center;
`;

const SpecialOfferLabel = styled.p`
  font-family: 'Proxima Nova', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.red};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

type PlanTier = "free" | "pro" | "business";

interface FeatureProps {
    label: string;
}

const FeatureComponent = ({ label }: FeatureProps) => {
    return (
        <FeatureRow>
            <FeatureItemIcon src="/assets/icons/bullet-arrow.png" alt="Included" width={28} height={28}/>
            <FeatureLabel>{label}</FeatureLabel>
        </FeatureRow>
    )
}

export default function PricingPage() {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);
  const subscription = useAppSelector(selectSubscription);
  const currentTier = (subscription?.tier ?? user?.tier ?? "free") as PlanTier;

  useGetProfileQuery(undefined, { skip: !isAuthenticated });
  useGetSubscriptionQuery(undefined, { skip: !isAuthenticated });

  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const [createPortalSession] = useCreatePortalSessionMutation();

  const plans = [
    {
      tier: "free" as const,
      name: "Free Sports API",
      price: "$0 /mo",
      featured: currentTier === "free",
      features: [
        "Search for sports players names",
        "Search sports events",
        "List League",
        "30 requests per minute",
        "List Seasons",
      ],
      ctaLabel: isAuthenticated ? (currentTier === "free" ? "Current Plan" : "Switch to Free") : "Get Free API",
      ctaVariant: "outline" as const,
      annualNote: null,
    },
    {
      tier: "pro" as const,
      name: "Single Developer",
      price: "$9 /mo",
      featured: currentTier === "pro",
      features: [
        "2 min livescore (Soccer, NFL, NBA, MLB, NHL)",
        "Full Premium JSON sports data",
        "Higher data limits",
        "100 requests per minute",
        "YouTube sports highlight links",
      ],
      ctaLabel: currentTier === "pro" ? "Current Plan" : "Premium $9 /mo",
      ctaVariant: "primary" as const,
      annualNote: "$90 a year (save 10%)",
    },
    {
      tier: "business" as const,
      name: "Small Business",
      price: "$20 /mo",
      featured: currentTier === "business",
      features: [
        "2 min livescore (Soccer, NFL, NBA, MLB, NHL)",
        "No limit on returned data",
        "Dedicated email support",
        "120 requests per minute",
        "Private API Key",
      ],
      ctaLabel: currentTier === "business" ? "Current Plan" : "Business $20 /mo",
      ctaVariant: "primary" as const,
      annualNote: "$200 a year (save 10%)",
    },
  ];

  const handlePlanClick = async (tier: PlanTier) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (tier === currentTier) {
      const portalRes = await createPortalSession().unwrap();
      const portalUrl = portalRes?.url;
      if (!portalUrl) {
        window.alert("Billing portal link was not returned. Please try again.");
        return;
      }
      window.location.href = portalUrl;
      return;
    }

    if (tier === "free") {
      router.push("/dashboard");
      return;
    }

    const res = await createCheckoutSession({
      tier,
      successUrl: `${window.location.origin}/billing/callback`,
      cancelUrl: `${window.location.origin}/pricing`,
    }).unwrap();
    const checkoutUrl = res?.authorization_url;
    if (!checkoutUrl) {
      // This helps identify the backend response shape quickly.
      // eslint-disable-next-line no-console
      console.warn("Checkout session response missing authorization_url:", res);
      window.alert("Checkout link was not returned. Please try again.");
      return;
    }

    window.location.href = checkoutUrl;
  };

  return (
    <>
      <PageWrapper>
        <Main>
          <Title>API Pricing</Title>

          <CardsGrid>
            {plans.map((plan) => (
              <Card key={plan.name} $featured={plan.featured}>
                {plan.featured && <PopularBadge>Most popular</PopularBadge>}

                <CardHeader>
                  <PlanName>{plan.name}</PlanName>
                  <PriceBox $featured={plan.featured}>
                    <Price>{plan.price}</Price>
                  </PriceBox>
                </CardHeader>

                <FeatureList>
                  {plan.features.map((f) => (
                    <FeatureComponent key={f} label={f} />
                  ))}
                </FeatureList>

                <CardFooter>
                  <Button
                    $variant={plan.ctaVariant}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePlanClick(plan.tier);
                    }}
                  >
                    {plan.ctaLabel}
                  </Button>
                  {plan.annualNote && (
                    <AnnualNote>
                      or <a href="#">{plan.annualNote}</a>
                    </AnnualNote>
                  )}
                </CardFooter>
              </Card>
            ))}
          </CardsGrid>

          <BottomSection>
            <PaymentIcons>
              <PaymentIcon src="/assets/icons/payment_options.png" alt="payment" width={48} height={28} />
            </PaymentIcons>

            <SpecialOfferBox>
              <SpecialOfferLabel>Special Offer</SpecialOfferLabel>
            </SpecialOfferBox>
          </BottomSection>
        </Main>
      </PageWrapper>
    </>
  );
}