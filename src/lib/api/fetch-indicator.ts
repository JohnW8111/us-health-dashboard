import { Indicator } from "../indicators";
import { fetchWorldBankIndicator } from "./worldbank";
import { fetchGHOIndicator } from "./who-gho";
import { fetchCMSIndicator } from "./cms";

export interface DataPoint {
  year: number;
  value: number;
}

export async function fetchIndicatorData(
  indicator: Indicator
): Promise<DataPoint[]> {
  let data = await fetchFromSource(indicator.apiSource, indicator.apiCode);

  if (data.length === 0 && indicator.backupSource && indicator.backupCode) {
    data = await fetchFromSource(indicator.backupSource, indicator.backupCode);
  }

  return data;
}

async function fetchFromSource(
  source: string,
  code: string
): Promise<DataPoint[]> {
  switch (source) {
    case "worldbank": {
      const wbData = await fetchWorldBankIndicator(code);
      return wbData
        .filter((d) => d.value !== null)
        .map((d) => ({ year: d.year, value: d.value! }));
    }
    case "who-gho": {
      const ghoData = await fetchGHOIndicator(code);
      return ghoData.map((d) => ({ year: d.year, value: d.value }));
    }
    case "cms": {
      const cmsData = await fetchCMSIndicator(code);
      return cmsData.map((d) => ({ year: d.year, value: d.value }));
    }
    default:
      return [];
  }
}
