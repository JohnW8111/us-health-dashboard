"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { DIMENSION_LABELS, DIMENSION_COLORS, Dimension } from "@/lib/indicators";
import { TrendChart } from "@/components/TrendChart";
import { StatusBadge } from "@/components/StatusBadge";
import { LoadingChart } from "@/components/LoadingGrid";

interface IndicatorMeta {
  id: string;
  name: string;
  dimension: Dimension;
  unit: string;
  definition: string;
  higherIsBetter: boolean;
  oecdBenchmark?: number;
  sourceUrl: string;
  apiSource: string;
}

interface DataPoint {
  year: number;
  value: number;
}

const SOURCE_LABELS: Record<string, string> = {
  worldbank: "World Bank",
  "who-gho": "WHO Global Health Observatory",
  cms: "CMS (Centers for Medicare & Medicaid Services)",
};

export default function IndicatorDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [indicator, setIndicator] = useState<IndicatorMeta | null>(null);
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/indicators?id=${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setError(json.error);
        } else {
          setIndicator(json.indicator);
          setData(json.data || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div>
        <div className="h-4 bg-gray-200 rounded w-24 mb-4 animate-pulse" />
        <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse" />
        <LoadingChart />
      </div>
    );
  }

  if (error || !indicator) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-red-800">Error</h2>
        <p className="text-red-600 mt-1">{error || "Indicator not found"}</p>
        <a href="/" className="text-blue-600 text-sm mt-3 inline-block">
          &larr; Back to Overview
        </a>
      </div>
    );
  }

  const latestValue = data.length > 0 ? data[data.length - 1].value : null;
  const latestYear = data.length > 0 ? data[data.length - 1].year : null;
  const color = DIMENSION_COLORS[indicator.dimension];

  return (
    <div>
      <a
        href={`/dimension/${indicator.dimension}`}
        className="text-sm text-blue-600 hover:text-blue-800 mb-3 inline-block"
      >
        &larr; {DIMENSION_LABELS[indicator.dimension]}
      </a>

      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {indicator.name}
            </h1>
            <p className="text-gray-500 mt-1">{indicator.definition}</p>
          </div>
          <StatusBadge
            value={latestValue}
            benchmark={indicator.oecdBenchmark}
            higherIsBetter={indicator.higherIsBetter}
          />
        </div>

        <div className="flex items-center gap-4 mt-4">
          {latestValue !== null && (
            <div>
              <span className="text-4xl font-bold">
                {formatValue(latestValue, indicator.unit)}
              </span>
              <span className="ml-2 text-gray-500">{indicator.unit}</span>
              {latestYear && (
                <span className="ml-2 text-sm text-gray-400">
                  ({latestYear})
                </span>
              )}
            </div>
          )}
          {indicator.oecdBenchmark !== undefined && (
            <div className="text-sm text-gray-400 border-l border-gray-200 pl-4">
              OECD Average: {indicator.oecdBenchmark} {indicator.unit}
            </div>
          )}
        </div>
      </div>

      {/* Trend chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Trend Over Time</h2>
        <TrendChart
          data={data}
          unit={indicator.unit}
          color={color}
          benchmark={indicator.oecdBenchmark}
          benchmarkLabel="OECD Average"
        />
      </div>

      {/* Metadata */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-3">Data Source</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-gray-500">Source</dt>
            <dd className="font-medium">
              {SOURCE_LABELS[indicator.apiSource] || indicator.apiSource}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500">Data points</dt>
            <dd className="font-medium">{data.length} observations</dd>
          </div>
          <div>
            <dt className="text-gray-500">Source URL</dt>
            <dd>
              <a
                href={indicator.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 break-all"
              >
                {indicator.sourceUrl}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function formatValue(value: number, unit: string): string {
  if (unit === "%" || unit === "years") return value.toFixed(1);
  if (unit === "USD")
    return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  if (unit.startsWith("index")) return value.toFixed(0);
  if (value >= 1000)
    return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return value.toFixed(1);
}
