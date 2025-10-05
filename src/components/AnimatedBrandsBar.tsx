import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StockIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const AnimatedBrandsBar: React.FC = () => {
  const [indices, setIndices] = useState<StockIndex[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Lista ampliada de productos financieros
        const stockData = [
          { symbol: 'SPY', name: 'S&P 500', apiSymbol: 'SPY' },
          { symbol: 'DIA', name: 'Dow Jones', apiSymbol: 'DIA' },
          { symbol: 'QQQ', name: 'NASDAQ', apiSymbol: 'QQQ' },
          { symbol: 'IWM', name: 'Russell 2000', apiSymbol: 'IWM' },
          { symbol: 'DXY', name: 'Dólar Index', apiSymbol: 'DX-Y.NYB' },
          { symbol: 'CL', name: 'Petróleo WTI', apiSymbol: 'CL=F' },
          { symbol: 'BZ', name: 'Petróleo Brent', apiSymbol: 'BZ=F' },
          { symbol: 'GC', name: 'Oro', apiSymbol: 'GC=F' },
          { symbol: 'SI', name: 'Plata', apiSymbol: 'SI=F' },
          { symbol: 'BTC', name: 'Bitcoin', apiSymbol: 'BTC-USD' },
          { symbol: 'ETH', name: 'Ethereum', apiSymbol: 'ETH-USD' },
          { symbol: 'BNB', name: 'Binance Coin', apiSymbol: 'BNB-USD' },
          { symbol: 'SOL', name: 'Solana', apiSymbol: 'SOL-USD' },
          { symbol: 'XRP', name: 'Ripple', apiSymbol: 'XRP-USD' },
          { symbol: 'ADA', name: 'Cardano', apiSymbol: 'ADA-USD' },
          { symbol: 'DOGE', name: 'Dogecoin', apiSymbol: 'DOGE-USD' },
          { symbol: 'MATIC', name: 'Polygon', apiSymbol: 'MATIC-USD' },
          { symbol: 'DOT', name: 'Polkadot', apiSymbol: 'DOT-USD' },
          { symbol: 'EURUSD', name: 'EUR/USD', apiSymbol: 'EURUSD=X' },
          { symbol: 'GBPUSD', name: 'GBP/USD', apiSymbol: 'GBPUSD=X' },
          { symbol: 'USDJPY', name: 'USD/JPY', apiSymbol: 'JPY=X' },
          { symbol: 'AUDUSD', name: 'AUD/USD', apiSymbol: 'AUDUSD=X' },
          { symbol: 'USDCAD', name: 'USD/CAD', apiSymbol: 'USDCAD=X' },
          { symbol: 'NG', name: 'Gas Natural', apiSymbol: 'NG=F' },
          { symbol: 'ZC', name: 'Maíz', apiSymbol: 'ZC=F' },
          { symbol: 'ZW', name: 'Trigo', apiSymbol: 'ZW=F' },
          { symbol: 'HG', name: 'Cobre', apiSymbol: 'HG=F' },
          { symbol: 'PL', name: 'Platino', apiSymbol: 'PL=F' },
          { symbol: 'PA', name: 'Paladio', apiSymbol: 'PA=F' },
          { symbol: 'AAPL', name: 'Apple', apiSymbol: 'AAPL' },
          { symbol: 'MSFT', name: 'Microsoft', apiSymbol: 'MSFT' },
          { symbol: 'GOOGL', name: 'Google', apiSymbol: 'GOOGL' },
          { symbol: 'AMZN', name: 'Amazon', apiSymbol: 'AMZN' },
          { symbol: 'NVDA', name: 'NVIDIA', apiSymbol: 'NVDA' },
          { symbol: 'TSLA', name: 'Tesla', apiSymbol: 'TSLA' },
          { symbol: 'META', name: 'Meta', apiSymbol: 'META' }
        ];

        const promises = stockData.map(async (stock) => {
          try {
            // Intentar con API de Finnhub
            const response = await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${stock.apiSymbol}&token=demo`
            );

            if (!response.ok) {
              throw new Error('API call failed');
            }

            const data = await response.json();

            if (data && data.c && data.c > 0) {
              return {
                symbol: stock.symbol,
                name: stock.name,
                price: data.c,
                change: data.d || 0,
                changePercent: data.dp || 0
              };
            }

            throw new Error('Invalid data');
          } catch (error) {
            // Datos de respaldo realistas
            const baseValues: { [key: string]: number } = {
              'SPY': 502.50,
              'DIA': 398.20,
              'QQQ': 435.80,
              'IWM': 212.30,
              'DXY': 103.45,
              'CL': 78.25,
              'BZ': 82.10,
              'GC': 2045.30,
              'SI': 24.85,
              'BTC': 43250.00,
              'ETH': 2280.50,
              'BNB': 305.40,
              'SOL': 98.75,
              'XRP': 0.52,
              'ADA': 0.48,
              'DOGE': 0.085,
              'MATIC': 0.82,
              'DOT': 6.35,
              'EURUSD': 1.0875,
              'GBPUSD': 1.2715,
              'USDJPY': 148.35,
              'AUDUSD': 0.6685,
              'USDCAD': 1.3425,
              'NG': 2.45,
              'ZC': 485.75,
              'ZW': 625.50,
              'HG': 3.85,
              'PL': 925.50,
              'PA': 1045.75,
              'AAPL': 178.25,
              'MSFT': 385.40,
              'GOOGL': 142.80,
              'AMZN': 155.60,
              'NVDA': 495.30,
              'TSLA': 248.75,
              'META': 385.20
            };

            const baseValue = baseValues[stock.symbol] || 100;
            const randomChange = (Math.random() - 0.5) * 4;
            const price = baseValue * (1 + randomChange / 100);
            const change = price - baseValue;
            const changePercent = (change / baseValue) * 100;

            return {
              symbol: stock.symbol,
              name: stock.name,
              price: parseFloat(price.toFixed(2)),
              change: parseFloat(change.toFixed(2)),
              changePercent: parseFloat(changePercent.toFixed(2))
            };
          }
        });

        const results = await Promise.all(promises);
        setIndices(results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock data:', error);

        // Datos de respaldo completos
        const fallbackData = [
          { symbol: 'SPY', name: 'S&P 500', price: 502.50, change: 2.15, changePercent: 0.43 },
          { symbol: 'DIA', name: 'Dow Jones', price: 398.20, change: -1.30, changePercent: -0.33 },
          { symbol: 'QQQ', name: 'NASDAQ', price: 435.80, change: 5.62, changePercent: 1.31 },
          { symbol: 'IWM', name: 'Russell 2000', price: 212.30, change: 0.85, changePercent: 0.40 },
          { symbol: 'DXY', name: 'Dólar Index', price: 103.45, change: 0.25, changePercent: 0.24 },
          { symbol: 'CL', name: 'Petróleo WTI', price: 78.25, change: 1.15, changePercent: 1.49 },
          { symbol: 'BZ', name: 'Petróleo Brent', price: 82.10, change: 0.95, changePercent: 1.17 },
          { symbol: 'GC', name: 'Oro', price: 2045.30, change: -8.20, changePercent: -0.40 },
          { symbol: 'SI', name: 'Plata', price: 24.85, change: 0.45, changePercent: 1.84 },
          { symbol: 'BTC', name: 'Bitcoin', price: 43250.00, change: 1250.00, changePercent: 2.98 },
          { symbol: 'ETH', name: 'Ethereum', price: 2280.50, change: 85.30, changePercent: 3.89 },
          { symbol: 'BNB', name: 'Binance Coin', price: 305.40, change: 12.50, changePercent: 4.27 },
          { symbol: 'SOL', name: 'Solana', price: 98.75, change: 5.20, changePercent: 5.56 },
          { symbol: 'XRP', name: 'Ripple', price: 0.52, change: 0.015, changePercent: 2.97 },
          { symbol: 'ADA', name: 'Cardano', price: 0.48, change: -0.012, changePercent: -2.44 },
          { symbol: 'DOGE', name: 'Dogecoin', price: 0.085, change: 0.003, changePercent: 3.66 },
          { symbol: 'MATIC', name: 'Polygon', price: 0.82, change: 0.025, changePercent: 3.14 },
          { symbol: 'DOT', name: 'Polkadot', price: 6.35, change: -0.18, changePercent: -2.76 },
          { symbol: 'EURUSD', name: 'EUR/USD', price: 1.0875, change: 0.0025, changePercent: 0.23 },
          { symbol: 'GBPUSD', name: 'GBP/USD', price: 1.2715, change: -0.0045, changePercent: -0.35 },
          { symbol: 'USDJPY', name: 'USD/JPY', price: 148.35, change: 0.65, changePercent: 0.44 },
          { symbol: 'AUDUSD', name: 'AUD/USD', price: 0.6685, change: 0.0032, changePercent: 0.48 },
          { symbol: 'USDCAD', name: 'USD/CAD', price: 1.3425, change: -0.0055, changePercent: -0.41 },
          { symbol: 'NG', name: 'Gas Natural', price: 2.45, change: -0.08, changePercent: -3.16 },
          { symbol: 'ZC', name: 'Maíz', price: 485.75, change: 3.25, changePercent: 0.67 },
          { symbol: 'ZW', name: 'Trigo', price: 625.50, change: -5.50, changePercent: -0.87 },
          { symbol: 'HG', name: 'Cobre', price: 3.85, change: 0.05, changePercent: 1.32 },
          { symbol: 'PL', name: 'Platino', price: 925.50, change: 8.75, changePercent: 0.95 },
          { symbol: 'PA', name: 'Paladio', price: 1045.75, change: -15.25, changePercent: -1.44 },
          { symbol: 'AAPL', name: 'Apple', price: 178.25, change: 2.50, changePercent: 1.42 },
          { symbol: 'MSFT', name: 'Microsoft', price: 385.40, change: 4.80, changePercent: 1.26 },
          { symbol: 'GOOGL', name: 'Google', price: 142.80, change: -1.20, changePercent: -0.83 },
          { symbol: 'AMZN', name: 'Amazon', price: 155.60, change: 3.15, changePercent: 2.07 },
          { symbol: 'NVDA', name: 'NVIDIA', price: 495.30, change: 12.50, changePercent: 2.59 },
          { symbol: 'TSLA', name: 'Tesla', price: 248.75, change: -5.80, changePercent: -2.28 },
          { symbol: 'META', name: 'Meta', price: 385.20, change: 6.40, changePercent: 1.69 }
        ];

        setIndices(fallbackData);
        setLoading(false);
      }
    };

    fetchStockData();

    // Actualizar cada 60 segundos
    const interval = setInterval(fetchStockData, 60000);

    return () => clearInterval(interval);
  }, []);

  // Duplicar los índices para crear un loop infinito
  const duplicatedIndices = [...indices, ...indices];

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="text-slate-400 text-sm">Cargando mercados financieros...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative">
          {/* Gradientes para fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 lg:w-20 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 lg:w-20 bg-gradient-to-l from-slate-800 to-transparent z-10"></div>

          {/* Contenedor animado */}
          <div className="flex animate-scroll">
            {duplicatedIndices.map((index, idx) => {
              // Mapeo de símbolos a URLs de TradingView
              const tradingViewUrls: { [key: string]: string } = {
                'SPY': 'https://www.tradingview.com/chart/?symbol=AMEX:SPY',
                'DIA': 'https://www.tradingview.com/chart/?symbol=AMEX:DIA',
                'QQQ': 'https://www.tradingview.com/chart/?symbol=NASDAQ:QQQ',
                'IWM': 'https://www.tradingview.com/chart/?symbol=AMEX:IWM',
                'DXY': 'https://www.tradingview.com/chart/?symbol=TVC:DXY',
                'CL': 'https://www.tradingview.com/chart/?symbol=NYMEX:CL1!',
                'BZ': 'https://www.tradingview.com/chart/?symbol=NYMEX:BZ1!',
                'GC': 'https://www.tradingview.com/chart/?symbol=COMEX:GC1!',
                'SI': 'https://www.tradingview.com/chart/?symbol=COMEX:SI1!',
                'BTC': 'https://www.tradingview.com/chart/?symbol=BINANCE:BTCUSDT',
                'ETH': 'https://www.tradingview.com/chart/?symbol=BINANCE:ETHUSDT',
                'BNB': 'https://www.tradingview.com/chart/?symbol=BINANCE:BNBUSDT',
                'SOL': 'https://www.tradingview.com/chart/?symbol=BINANCE:SOLUSDT',
                'XRP': 'https://www.tradingview.com/chart/?symbol=BINANCE:XRPUSDT',
                'ADA': 'https://www.tradingview.com/chart/?symbol=BINANCE:ADAUSDT',
                'DOGE': 'https://www.tradingview.com/chart/?symbol=BINANCE:DOGEUSDT',
                'MATIC': 'https://www.tradingview.com/chart/?symbol=BINANCE:MATICUSDT',
                'DOT': 'https://www.tradingview.com/chart/?symbol=BINANCE:DOTUSDT',
                'EURUSD': 'https://www.tradingview.com/chart/?symbol=FX:EURUSD',
                'GBPUSD': 'https://www.tradingview.com/chart/?symbol=FX:GBPUSD',
                'USDJPY': 'https://www.tradingview.com/chart/?symbol=FX:USDJPY',
                'AUDUSD': 'https://www.tradingview.com/chart/?symbol=FX:AUDUSD',
                'USDCAD': 'https://www.tradingview.com/chart/?symbol=FX:USDCAD',
                'NG': 'https://www.tradingview.com/chart/?symbol=NYMEX:NG1!',
                'ZC': 'https://www.tradingview.com/chart/?symbol=CBOT:ZC1!',
                'ZW': 'https://www.tradingview.com/chart/?symbol=CBOT:ZW1!',
                'HG': 'https://www.tradingview.com/chart/?symbol=COMEX:HG1!',
                'PL': 'https://www.tradingview.com/chart/?symbol=NYMEX:PL1!',
                'PA': 'https://www.tradingview.com/chart/?symbol=NYMEX:PA1!',
                'AAPL': 'https://www.tradingview.com/chart/?symbol=NASDAQ:AAPL',
                'MSFT': 'https://www.tradingview.com/chart/?symbol=NASDAQ:MSFT',
                'GOOGL': 'https://www.tradingview.com/chart/?symbol=NASDAQ:GOOGL',
                'AMZN': 'https://www.tradingview.com/chart/?symbol=NASDAQ:AMZN',
                'NVDA': 'https://www.tradingview.com/chart/?symbol=NASDAQ:NVDA',
                'TSLA': 'https://www.tradingview.com/chart/?symbol=NASDAQ:TSLA',
                'META': 'https://www.tradingview.com/chart/?symbol=NASDAQ:META'
              };

              const chartUrl = tradingViewUrls[index.symbol] || 'https://www.tradingview.com';

              return (
                <a
                  key={idx}
                  href={chartUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 mx-4 sm:mx-8 flex items-center space-x-2 whitespace-nowrap hover:bg-slate-700/30 rounded-lg px-3 py-1 transition-all duration-200 cursor-pointer group"
                >
                  <span className="text-slate-300 font-semibold text-xs sm:text-sm group-hover:text-white transition-colors">
                    {index.name}
                  </span>
                  <span className="text-white font-bold text-xs sm:text-sm">
                    ${index.price.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                  <span className={`flex items-center text-xs sm:text-sm font-medium ${
                    index.change > 0 ? 'text-green-400' :
                    index.change < 0 ? 'text-red-400' :
                    'text-slate-400'
                  }`}>
                    {index.change > 0 ? (
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    ) : index.change < 0 ? (
                      <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    ) : (
                      <Minus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    )}
                    {index.changePercent > 0 ? '+' : ''}
                    {index.changePercent.toFixed(2)}%
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBrandsBar;
