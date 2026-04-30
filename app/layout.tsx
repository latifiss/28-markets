'use client'

import Providers from "../store/providers";
import ThemeInitializer from "../store/themeInitializer";
import AuthInitializer from "../store/authInitializer";
import GlobalStyles from "../styles/GlobalStyles";
import ProgressBar from "@/components/progressBar";
import StyledComponentsRegistry from "./registry";
import ScrollToTop from "@/hooks/scrollToTop";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ 
        maxWidth: '100%', 
        overflowX: 'hidden', 
        position: 'relative',
        margin: 0,
        padding: 0
      }}>
        <StyledComponentsRegistry>
          <Providers>
            <ProgressBar />
            <ThemeInitializer />
            <AuthInitializer />
            <GlobalStyles />
            <ScrollToTop />
            <Header />
            {children}
            <Footer/>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
