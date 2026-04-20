export interface WaterfallDataItem {
  category: string;
  amount: number;
}

export interface WaterfallChartData {
  annualData: WaterfallDataItem[];
  semiannualData: WaterfallDataItem[];
}


export const generateWaterfallData = (rawData: WaterfallDataItem[]) => {
  let accumulatedValue = 0;
  const result: any[] = [];
  
  rawData.forEach((item) => {
    if (item.category === 'Revenue') {
      result.push({
        ...item,
        start: 0,
        value: item.amount,
        fill: '#4DC6B5'
      });
      accumulatedValue = item.amount;
    } else if (item.category === 'COGS') {
      result.push({
        ...item,
        start: accumulatedValue,
        value: -item.amount,
        fill: '#FF6B8B'
      });
      accumulatedValue -= item.amount;
    } else if (item.category === 'Gross profit') {
      result.push({
        ...item,
        start: 0,
        value: accumulatedValue,
        fill: '#4285F4'
      });
    } else if (item.category === 'Op expenses') {
      result.push({
        ...item,
        start: accumulatedValue,
        value: -item.amount,
        fill: '#FF6B8B'
      });
      accumulatedValue -= item.amount;
    } else if (item.category === 'Op income') {
      result.push({
        ...item,
        start: 0,
        value: accumulatedValue,
        fill: '#4285F4'
      });
    } else if (item.category === 'Non-Op income/expenses') {
      result.push({
        ...item,
        start: accumulatedValue,
        value: -item.amount,
        fill: '#FF6B8B'
      });
      accumulatedValue -= item.amount;
    } else if (item.category === 'Taxes & Other') {
      result.push({
        ...item,
        start: accumulatedValue,
        value: -item.amount,
        fill: '#FF6B8B'
      });
      accumulatedValue -= item.amount;
    } else if (item.category === 'Net income') {
      result.push({
        ...item,
        start: 0,
        value: accumulatedValue,
        fill: '#4285F4'
      });
    }
  });
  
  return result;
};