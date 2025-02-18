import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { connectWallet } from '../utils/ethereum'; // Ensure this function is set up properly
import { getContract, getTokenBalance, migrateTokens } from '../utils/contracts';

const TokenBalances = () => {
  const [balanceV1, setBalanceV1] = useState("0");
  const [balanceV2, setBalanceV2] = useState("0");
  const [amountToMigrate, setAmountToMigrate] = useState("0");
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    const setupProvider = async () => {
      const { provider, address } = await connectWallet();
      setProvider(provider);
      const v1Contract = getContract(provider, '0xfa7b521420D560213A4390d74A3135Ad705f3DbB', abi); // Replace with actual ABI and address
      const v2Contract = getContract(provider, '0x6c03Ca7592A4c561af4663a79cD8bBc9730DA7c0', abi);

      const v1Balance = await getTokenBalance(v1Contract, address);
      setBalanceV1(v1Balance);
      const v2Balance = await getTokenBalance(v2Contract, address);
      setBalanceV2(v2Balance);
    };
    setupProvider();
  }, [provider]);

  const handleMigrate = async () => {
    if (provider) {
      const v1Contract = getContract(provider, 'V1_CONTRACT_ADDRESS', abi);
      const v2Contract = getContract(provider, 'V2_CONTRACT_ADDRESS', abi);
      await migrateTokens(v1Contract, v2Contract, amountToMigrate);
    }
  };

  return (
    <div className="token-balances">
      <h2>Your Token Balances</h2>
      <div>
        <p>V1 Token Balance: {balanceV1}</p>
        <p>V2 Token Balance: {balanceV2}</p>
      </div>

      <div>
        <input
          type="number"
          value={amountToMigrate}
          onChange={(e) => setAmountToMigrate(e.target.value)}
          placeholder="Amount to Migrate"
        />
        <button onClick={handleMigrate}>Migrate Tokens</button>
      </div>
    </div>
  );
};

export default TokenBalances;
