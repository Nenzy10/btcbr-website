export default function Tokenomics() {
  return (
    <section className="bg-gray-800 text-white py-16 px-6">
      <h2 className="text-4xl font-bold text-center">Tokenomics</h2>
      <div className="mt-6 flex flex-wrap justify-center gap-8">
        <div className="p-4 bg-gray-700 rounded-lg text-center w-64">
          <h3 className="text-xl font-semibold">Total Supply</h3>
          <p className="text-lg">1,000,000,000 BTCBR</p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg text-center w-64">
          <h3 className="text-xl font-semibold">Liquidity</h3>
          <p className="text-lg">Locked for 5 Years</p>
        </div>
      </div>
    </section>
  );
}
