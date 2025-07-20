'use client';
import html2canvas from 'html2canvas';
import React, { useEffect, useRef, useState } from 'react';
import {
  createChart,
  CrosshairMode,
  LineStyle,
  Time,
  IChartApi,
  ISeriesApi,
} from 'lightweight-charts';
import { useGasStore } from '@/store/useGasStore';

const Chart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<IChartApi | null>(null);
  const ethereumSeries = useRef<ISeriesApi<'Line'> | null>(null);
  const polygonSeries = useRef<ISeriesApi<'Line'> | null>(null);
  const arbitrumSeries = useRef<ISeriesApi<'Line'> | null>(null);

  const { gasPriceHistory } = useGasStore();

  const [visibleChains, setVisibleChains] = useState({
    ethereum: true,
    polygon: true,
    arbitrum: true,
  });

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: '#111827' },
        textColor: '#ffffff',
      },
      grid: {
        vertLines: { color: '#2c2c2c' },
        horzLines: { color: '#2c2c2c' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
        tickMarkFormatter: (time) => {
      const date = new Date(time * 1000); 
      return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata', 
      });
        }
      },
    });

    ethereumSeries.current = chartInstance.current.addLineSeries({
      color: '#3b82f6',
      lineWidth: 2,
      lineStyle: LineStyle.Solid,
      title: 'Ethereum',
    });

    polygonSeries.current = chartInstance.current.addLineSeries({
      color: '#10b981',
      lineWidth: 2,
      lineStyle: LineStyle.Solid,
      title: 'Polygon',
    });

    arbitrumSeries.current = chartInstance.current.addLineSeries({
      color: '#f59e0b',
      lineWidth: 2,
      lineStyle: LineStyle.Solid,
      title: 'Arbitrum',
    });

    return () => {
      chartInstance.current?.remove();
    };
  }, []);

  useEffect(() => {
    const formatData = (data: { time: number; value: number }[]) =>
      data.map((point) => ({
        time: point.time as Time,
        value: point.value,
      }));

    if (ethereumSeries.current && visibleChains.ethereum) {
      ethereumSeries.current.setData(formatData(gasPriceHistory.ethereum));
    } else {
      ethereumSeries.current?.setData([]);
    }

    if (polygonSeries.current && visibleChains.polygon) {
      polygonSeries.current.setData(formatData(gasPriceHistory.polygon));
    } else {
      polygonSeries.current?.setData([]);
    }

    if (arbitrumSeries.current && visibleChains.arbitrum) {
      arbitrumSeries.current.setData(formatData(gasPriceHistory.arbitrum));
    } else {
      arbitrumSeries.current?.setData([]);
    }
  }, [gasPriceHistory, visibleChains]);

  const handleExport = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'gas-price-chart.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-4">
          {['ethereum', 'polygon', 'arbitrum'].map((chain) => (
            <label key={chain} className="flex items-center gap-1 text-sm capitalize">
              <input
                type="checkbox"
                checked={visibleChains[chain as keyof typeof visibleChains]}
                onChange={() =>
                  setVisibleChains((prev) => ({
                    ...prev,
                    [chain]: !prev[chain as keyof typeof visibleChains],
                  }))
                }
              />
              {chain}
            </label>
          ))}
        </div>
        <button
          onClick={handleExport}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Export Chart
        </button>
      </div>
      <div ref={chartRef} className="w-full h-[400px]" />
    </div>
  );
};

export default Chart;
