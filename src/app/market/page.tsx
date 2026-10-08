import type { Crypto } from "../../localStorage/types/crypto";

export const dynamic = "force-dynamic";

export default async function MarketPage() {
  const res = await fetch(
    "https://api.binance.com/api/v3/ticker/24hr?symbols=[%22BTCUSDT%22,%22ETHUSDT%22,%22BNBUSDT%22,%22SOLUSDT%22,%22DOGEUSDT%22,%22XRPUSDT%22]",
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(`Lỗi máy chủ (market): ${res.status}`);
  }

  const coinDetails: Crypto[] = await res.json();

  const serverTime = new Date().toLocaleTimeString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
  });

  return (
    <div>
      <div className="my-4 rounded-lg bg-blue-50 p-3 text-blue-800">
        Dữ liệu được cập nhật từ máy chủ lúc: {serverTime} (Nhấn F5 để kiểm tra)
      </div>
      <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr] items-center border-2 rounded-[10px] border-white p-2.5">
        <div> Rank</div>
        <div> Symbol </div>
        <div> Price </div>
        <div> 24h Change %</div>
        <div> 24h Volume</div>
      </div>
      {coinDetails.map((coin, index) => (
        <div
          key={coin.symbol}
          className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr] items-center border-2  border-white p-2.5"
        >
          <div>{index + 1}</div>
          <div className="flex items-center gap-2">
            <img
              src={`https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/${coin.symbol.replace("USDT", "").toLowerCase()}.svg`}
              alt={coin.symbol}
              className="size-6"
            />
            {coin.symbol}
          </div>
          <div>
            {Number(coin.lastPrice).toLocaleString("en-US", {
              maximumFractionDigits: 8,
            })}
            $
          </div>
          <div
            className={
              Number(coin.priceChangePercent) >= 0
                ? " text-emerald-600"
                : " text-rose-600"
            }
          >
            {Number(coin.priceChangePercent).toFixed(2)}%
          </div>
          <div>{(Number(coin.quoteVolume) / 1000000000).toFixed(2)}B</div>
        </div>
      ))}
    </div>
  );
}
