"use client";

import { useState } from "react";
import Link from "next/link";
import {
  indicators,
  DIMENSION_LABELS,
  DIMENSION_COLORS,
  Dimension,
} from "@/lib/indicators";

const SOURCE_INFO: Record<
  string,
  { name: string; api: string; description: string }
> = {
  worldbank: {
    name: "World Bank WDI",
    api: "https://api.worldbank.org/v2/",
    description: "World Development Indicators — comprehensive health, economic, and demographic data for 200+ countries",
  },
  "who-gho": {
    name: "WHO Global Health Observatory",
    api: "https://ghoapi.azureedge.net/api/",
    description: "WHO's repository of health statistics for 194 member states, including NCD risk factors and mortality data",
  },
  cms: {
    name: "CMS Provider Data Catalog",
    api: "https://data.cms.gov/provider-data/",
    description: "Centers for Medicare & Medicaid Services — hospital quality measures, readmission rates, and spending data via Socrata API",
  },
};

const DIMENSIONS: Dimension[] = [
  "population-health",
  "experience-of-care",
  "per-capita-cost",
];

export default function AboutPage() {
  const [openDimension, setOpenDimension] = useState<Dimension | null>(
    "population-health"
  );
  const [openIndicator, setOpenIndicator] = useState<string | null>(null);

  return (
    <div className="max-w-4xl">
      <a
        href="/"
        className="text-sm text-blue-600 hover:text-blue-800 mb-4 inline-block"
      >
        &larr; Back to Dashboard
      </a>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        About the Indicators
      </h1>
      <p className="text-gray-500 mb-8">
        26 health indicators organized by the Triple Aim framework (Berwick,
        Nolan, Whittington, 2008). Unlike the DRC and Bolivia dashboards which
        use modified versions of the framework, this US dashboard uses the
        original Triple Aim dimensions as designed.
      </p>

      {/* Framework explanation */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5 mb-8">
        <h2 className="text-sm font-semibold text-indigo-900 mb-2">
          The Triple Aim Framework
        </h2>
        <p className="text-sm text-indigo-800 mb-3">
          The Triple Aim (2008) describes three simultaneous objectives for
          health system performance. The US health system context — with
          established insurance infrastructure, patient experience surveys
          (CAHPS), and comprehensive cost data — allows us to use the original
          framework without modification:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DIMENSIONS.map((dim) => (
            <div
              key={dim}
              className="bg-white rounded-lg p-3 border border-indigo-100"
            >
              <div
                className="w-2 h-2 rounded-full mb-1"
                style={{ backgroundColor: DIMENSION_COLORS[dim] }}
              />
              <p className="text-xs font-semibold text-gray-900">
                {DIMENSION_LABELS[dim]}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {dim === "population-health" &&
                  "Mortality, NCDs, behavioral factors, and prevention — including US-specific crises (opioids, suicide)"}
                {dim === "experience-of-care" &&
                  "Original dimension — workforce, UHC coverage, care quality, CMS readmission and spending measures"}
                {dim === "per-capita-cost" &&
                  "Original dimension — health expenditure, GDP share, out-of-pocket burden, public vs private spending"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Indicator accordions */}
      <div className="space-y-4 mb-10">
        {DIMENSIONS.map((dim) => {
          const dimIndicators = indicators.filter((i) => i.dimension === dim);
          const isOpen = openDimension === dim;

          return (
            <div
              key={dim}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenDimension(isOpen ? null : dim)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-1 h-6 rounded-full"
                    style={{ backgroundColor: DIMENSION_COLORS[dim] }}
                  />
                  <div className="text-left">
                    <h2 className="text-base font-semibold text-gray-900">
                      {DIMENSION_LABELS[dim]}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {dimIndicators.length} indicators
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className="border-t border-gray-200">
                  {dimIndicators.map((ind) => {
                    const isIndOpen = openIndicator === ind.id;
                    const source = SOURCE_INFO[ind.apiSource];

                    return (
                      <div
                        key={ind.id}
                        className="border-b border-gray-100 last:border-b-0"
                      >
                        <button
                          onClick={() =>
                            setOpenIndicator(isIndOpen ? null : ind.id)
                          }
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
                        >
                          <span className="text-sm font-medium text-gray-800">
                            {ind.name}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-400">
                              {ind.unit}
                            </span>
                            <svg
                              className={`w-4 h-4 text-gray-400 transition-transform ${
                                isIndOpen ? "rotate-180" : ""
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </button>

                        {isIndOpen && (
                          <div className="px-4 pb-4 bg-gray-50">
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                              <div className="sm:col-span-2">
                                <dt className="text-xs font-medium text-gray-500 mb-0.5">
                                  Definition
                                </dt>
                                <dd className="text-gray-700">
                                  {ind.definition}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-xs font-medium text-gray-500 mb-0.5">
                                  Data Source
                                </dt>
                                <dd className="text-gray-700">
                                  {source?.name || ind.apiSource}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-xs font-medium text-gray-500 mb-0.5">
                                  API Indicator Code
                                </dt>
                                <dd className="font-mono text-xs text-gray-600 bg-white px-2 py-1 rounded border border-gray-200 inline-block">
                                  {ind.apiCode}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-xs font-medium text-gray-500 mb-0.5">
                                  OECD Benchmark
                                </dt>
                                <dd className="text-gray-700">
                                  {ind.oecdBenchmark !== undefined
                                    ? `${ind.oecdBenchmark} ${ind.unit}`
                                    : "Not available"}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-xs font-medium text-gray-500 mb-0.5">
                                  Direction
                                </dt>
                                <dd className="text-gray-700">
                                  {ind.higherIsBetter
                                    ? "Higher is better"
                                    : "Lower is better"}
                                </dd>
                              </div>
                            </dl>
                            <div className="mt-3 flex gap-3">
                              <Link
                                href={`/indicator/${ind.id}`}
                                className="text-xs text-blue-600 hover:text-blue-800"
                              >
                                View chart &rarr;
                              </Link>
                              <a
                                href={ind.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-gray-500 hover:text-gray-700"
                              >
                                Source URL &nearr;
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Data Sources */}
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Data Sources</h2>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2 font-medium text-gray-600">Source</th>
              <th className="text-left px-4 py-2 font-medium text-gray-600">Indicators</th>
              <th className="text-left px-4 py-2 font-medium text-gray-600">Description</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(SOURCE_INFO).map(([key, src]) => {
              const count = indicators.filter((i) => i.apiSource === key).length;
              if (count === 0) return null;
              return (
                <tr key={key} className="border-b border-gray-100">
                  <td className="px-4 py-2">
                    <a href={src.api} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      {src.name}
                    </a>
                  </td>
                  <td className="px-4 py-2">{count}</td>
                  <td className="px-4 py-2 text-gray-600 text-xs">{src.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Citation */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-2">Framework Citation</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Berwick DM, Nolan TW, Whittington J. &ldquo;The Triple Aim: Care,
          Health, and Cost.&rdquo; <em>Health Affairs</em>. 2008
          May-Jun;27(3):759-69. DOI: 10.1377/hlthaff.27.3.759.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Measurement guide: Stiefel M, Nolan K. <em>A Guide to Measuring the
          Triple Aim: Population Health, Experience of Care, and Per Capita
          Cost.</em> IHI Innovation Series white paper. Cambridge, MA: Institute
          for Healthcare Improvement; 2012.
        </p>
      </div>
    </div>
  );
}
