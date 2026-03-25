"use client";

import Link from "next/link";
import { StatusBadge } from "./StatusBadge";

interface IndicatorCardProps {
  id: string;
  name: string;
  unit: string;
  latestValue: number | null;
  latestYear: number | null;
  oecdBenchmark?: number;
  higherIsBetter: boolean;
  apiSource: string;
}

const SOURCE_LABELS: Record<string, string> = {
  worldbank: "World Bank",
  "who-gho": "WHO GHO",
  cms: "CMS",
};

export function IndicatorCard({
  id,
  name,
  unit,
  latestValue,
  latestYear,
  oecdBenchmark,
  higherIsBetter,
  apiSource,
}: IndicatorCardProps) {
  return (
    <Link href={`/indicator/${id}`}>
      <div className="group bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer h-full">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-900 leading-tight pr-2">
            {name}
          </h3>
          <StatusBadge
            value={latestValue}
            benchmark={oecdBenchmark}
            higherIsBetter={higherIsBetter}
          />
        </div>

        <div className="mt-3">
          {latestValue !== null ? (
            <div>
              <span className="text-2xl font-bold text-gray-900">
                {formatValue(latestValue, unit)}
              </span>
              <span className="ml-1 text-sm text-gray-500">{unit}</span>
            </div>
          ) : (
            <span className="text-sm text-gray-400">Data unavailable</span>
          )}

          {latestYear && (
            <p className="text-xs text-gray-400 mt-1">
              Latest: {latestYear}
            </p>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
            {SOURCE_LABELS[apiSource] || apiSource}
          </span>
          <span className="text-xs text-gray-400 group-hover:text-blue-500 transition-colors flex items-center gap-1">
            View trend
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function formatValue(value: number, unit: string): string {
  if (unit === "%" || unit === "years") return value.toFixed(1);
  if (unit === "USD") return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  if (unit.startsWith("index")) return value.toFixed(0);
  if (value >= 1000) return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return value.toFixed(1);
}
