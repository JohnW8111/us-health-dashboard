"use client";

import { useEffect, useState } from "react";
import { Dimension, DIMENSION_LABELS } from "@/lib/indicators";
import { DimensionSection } from "@/components/DimensionSection";
import { LoadingGrid } from "@/components/LoadingGrid";

interface IndicatorSummary {
  id: string;
  name: string;
  dimension: Dimension;
  unit: string;
  higherIsBetter: boolean;
  oecdBenchmark?: number;
  latestValue: number | null;
  latestYear: number | null;
  apiSource: string;
  error?: boolean;
}

export default function HomePage() {
  const [data, setData] = useState<IndicatorSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/indicators")
      .then((res) => res.json())
      .then((json) => {
        setData(json.indicators || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const dimensions: Dimension[] = [
    "population-health",
    "experience-of-care",
    "per-capita-cost",
  ];

  const loadedCount = data.filter((d) => d.latestValue !== null).length;
  const errorCount = data.filter((d) => d.error).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          United States — Health Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          26 indicators across the 3 dimensions of the Triple Aim framework,
          benchmarked against OECD averages.
        </p>
        <p className="text-sm text-blue-600 mt-2">
          Click any indicator to view its historical trend chart.
        </p>
        {!loading && (
          <div className="flex gap-4 mt-3">
            <span className="text-sm text-gray-500">
              {loadedCount} indicators with data
            </span>
            {errorCount > 0 && (
              <span className="text-sm text-red-500">
                {errorCount} failed to load
              </span>
            )}
          </div>
        )}
      </div>

      {!loading && data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {dimensions.map((dim) => {
            const dimIndicators = data.filter((d) => d.dimension === dim);
            const withData = dimIndicators.filter((d) => d.latestValue !== null);
            return (
              <a
                key={dim}
                href={`/dimension/${dim}`}
                className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition"
              >
                <h3 className="text-sm font-medium text-gray-500">
                  {DIMENSION_LABELS[dim]}
                </h3>
                <p className="text-3xl font-bold mt-1">
                  {withData.length}
                  <span className="text-lg text-gray-400 font-normal">
                    /{dimIndicators.length}
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  indicators reporting data
                </p>
              </a>
            );
          })}
        </div>
      )}

      {loading && <LoadingGrid count={12} />}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 text-sm">Failed to load: {error}</p>
        </div>
      )}

      {!loading &&
        dimensions.map((dim) => (
          <DimensionSection
            key={dim}
            dimension={dim}
            indicators={data.filter((d) => d.dimension === dim)}
          />
        ))}
    </div>
  );
}
