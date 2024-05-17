import React, { useMemo } from 'react';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Assuming this property exists
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface WalletRowProps {
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({ amount, usdValue, formattedAmount }) => (
  <div>
    {/* Render wallet row content */}
  </div>
);

const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100;
    case 'Ethereum':
      return 50;
    case 'Arbitrum':
      return 30;
    case 'Zilliqa':
    case 'Neo': // Combine Zilliqa and Neo with the same priority
      return 20;
    default:
      return -99;
  }
};

const WalletPage: React.FC = () => {
  const balances: WalletBalance[] = useWalletBalances();
  const prices: Record<string, number> = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => balance.amount > 0)
      .sort((lhs, rhs) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority; // Descending order
      });
  }, [balances, prices]);

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div>{rows}</div>;
};

export default WalletPage;
