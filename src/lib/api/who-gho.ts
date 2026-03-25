import { getCached, setCache } from "../cache";

export interface GHODataPoint {
  year: number;
  value: number;
}

const BASE_URL = "https://ghoapi.azureedge.net/api";
const COUNTRY_CODE = "USA";

export async function fetchGHOIndicator(
  indicatorCode: string
): Promise<GHODataPoint[]> {
  const cacheKey = `gho_${indicatorCode}`;
  const cached = getCached<GHODataPoint[]>(cacheKey);
  if (cached) return cached;

  const url = `${BASE_URL}/${indicatorCode}?$filter=SpatialDim eq '${COUNTRY_CODE}'&$orderby=TimeDim`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error(`WHO GHO API error: ${response.status} for ${indicatorCode}`);
    return [];
  }

  const json = await response.json();

  if (!json.value || !Array.isArray(json.value)) {
    return [];
  }

  // Filter and deduplicate by year
  // First try "Both sexes" aggregates, then fall back to "Total" or any first value
  const allValues = json.value.filter(
    (d: { NumericValue: number | null }) => d.NumericValue !== null
  );

  // Group by year, pick preferred Dim1 value
  const yearBest = new Map<number, number>();
  const PREFERRED_DIM1 = ["BTSX", "SEX_BTSX", "Both sexes", "RESIDENCEAREATYPE_TOTL", "TOTL", ""];

  for (const d of allValues) {
    const year = d.TimeDim;
    const dim1 = d.Dim1 || "";
    if (!yearBest.has(year)) {
      yearBest.set(year, d.NumericValue);
    } else if (PREFERRED_DIM1.includes(dim1)) {
      yearBest.set(year, d.NumericValue);
    }
  }

  const data: GHODataPoint[] = Array.from(yearBest.entries())
    .map(([year, value]) => ({ year, value }))
    .sort((a, b) => a.year - b.year);

  setCache(cacheKey, data);
  return data;
}
