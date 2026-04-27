import StockPageClient from './client';
import type { Metadata } from 'next';
import stocksApi from '@/lib/api/stocks';

type Props = {
  params: Promise<{ company_id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { company_id } = await params;
  
  try {
    const [profileRes, statisticsRes] = await Promise.allSettled([
      stocksApi.getProfileByCompanyId(company_id),
      stocksApi.getStatisticsByCompanyId(company_id)
    ]);

    const profile = profileRes.status === 'fulfilled' 
      ? (profileRes.value?.data?.profile || profileRes.value?.profile || profileRes.value?.data || profileRes.value)
      : null;
    
    const statistics = statisticsRes.status === 'fulfilled'
      ? (statisticsRes.value?.data?.statistics || statisticsRes.value?.statistics || statisticsRes.value?.data || statisticsRes.value)
      : null;

    const companyName = profile?.company_name || profile?.name || 'Company';
    const ticker = profile?.ticker_symbol || company_id;
    const currentPrice = statistics?.key_statistics?.current_price || '0.00';
    const priceChange = statistics?.key_statistics?.percentage_change || 0;
    const changeText = priceChange >= 0 ? `+${priceChange}%` : `${priceChange}%`;

    return {
      title: `${ticker} | ${companyName} | Ghanapolitan`,
      description: `Stock information for ${companyName} (${ticker}) - Current price: ${currentPrice} (${changeText}). View financials, earnings, dividends, and ownership data.`,
      openGraph: {
        title: `${ticker} | ${companyName} | Ghanapolitan`,
        description: `Stock information for ${companyName} (${ticker}) - Current price: ${currentPrice} (${changeText})`,
        type: 'website',
      },
      twitter: {
        card: 'summary',
        title: `${ticker} | ${companyName} | Ghanapolitan`,
        description: `Stock information for ${companyName} (${ticker}) - Current price: ${currentPrice} (${changeText})`,
      },
      keywords: [companyName, ticker, 'stock', 'Ghana Stock Exchange', 'GSE', 'investing', 'shares', 'trading'],
    };
  } catch {
    return {
      title: 'Stock | Ghanapolitan',
      description: 'Stock information on Ghana Stock Exchange',
    };
  }
}

export default async function Page({ params }: Props) {
  const { company_id } = await params;
  
  return <StockPageClient companyId={company_id} initialData={null} />;
}