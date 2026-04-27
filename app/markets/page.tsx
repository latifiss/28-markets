import MarketsPageClient from './client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markets | Ghanapolitan',
  description: 'Live market data including forex, commodities, stock indexes, cryptocurrencies, and Ghana stock exchange data.',
  openGraph: {
    title: 'Markets | Ghanapolitan',
    description: 'Live market data including forex, commodities, stock indexes, cryptocurrencies, and Ghana stock exchange data.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Markets | Ghanapolitan',
    description: 'Live market data including forex, commodities, stock indexes, cryptocurrencies, and Ghana stock exchange data.',
  },
  keywords: ['markets', 'forex', 'commodities', 'stocks', 'Ghana Stock Exchange', 'GSE', 'crypto', 'cryptocurrencies'],
};

export default async function Page() {
  // Return empty initial data - client will handle progressive loading
  return <MarketsPageClient initialData={null} />;
}