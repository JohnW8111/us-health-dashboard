export type Dimension =
  | "population-health"
  | "experience-of-care"
  | "per-capita-cost";

export type ApiSource = "worldbank" | "who-gho" | "cms";

export interface Indicator {
  id: string;
  name: string;
  dimension: Dimension;
  unit: string;
  definition: string;
  apiSource: ApiSource;
  apiCode: string;
  backupSource?: ApiSource;
  backupCode?: string;
  hasSubnational: boolean;
  higherIsBetter: boolean;
  oecdBenchmark?: number;
  sourceUrl: string;
}

export const DIMENSION_LABELS: Record<Dimension, string> = {
  "population-health": "Population Health",
  "experience-of-care": "Experience of Care",
  "per-capita-cost": "Per Capita Cost",
};

export const DIMENSION_COLORS: Record<Dimension, string> = {
  "population-health": "#2563eb",
  "experience-of-care": "#059669",
  "per-capita-cost": "#d97706",
};

export const indicators: Indicator[] = [
  // ── Population Health (12) ──
  {
    id: "life-expectancy",
    name: "Life Expectancy at Birth",
    dimension: "population-health",
    unit: "years",
    definition:
      "Average number of years a newborn is expected to live if current mortality rates continue.",
    apiSource: "worldbank",
    apiCode: "SP.DYN.LE00.IN",
    hasSubnational: false,
    higherIsBetter: true,
    oecdBenchmark: 80.3,
    sourceUrl:
      "https://data.worldbank.org/indicator/SP.DYN.LE00.IN?locations=US",
  },
  {
    id: "infant-mortality",
    name: "Infant Mortality Rate",
    dimension: "population-health",
    unit: "per 1,000 live births",
    definition:
      "Probability of dying between birth and exactly 1 year of age, per 1,000 live births.",
    apiSource: "worldbank",
    apiCode: "SP.DYN.IMRT.IN",
    hasSubnational: false,
    higherIsBetter: false,
    oecdBenchmark: 3.9,
    sourceUrl:
      "https://data.worldbank.org/indicator/SP.DYN.IMRT.IN?locations=US",
  },
  {
    id: "maternal-mortality",
    name: "Maternal Mortality Ratio",
    dimension: "population-health",
    unit: "per 100,000 live births",
    definition:
      "Number of maternal deaths per 100,000 live births. The US has the highest rate among developed nations.",
    apiSource: "worldbank",
    apiCode: "SH.STA.MMRT",
    hasSubnational: false,
    higherIsBetter: false,
    oecdBenchmark: 10,
    sourceUrl:
      "https://data.worldbank.org/indicator/SH.STA.MMRT?locations=US",
  },
  {
    id: "age-adjusted-mortality",
    name: "Age-Adjusted Death Rate",
    dimension: "population-health",
    unit: "per 100,000",
    definition:
      "Age-standardized mortality rate per 100,000 population, adjusting for differences in population age structure.",
    apiSource: "who-gho",
    apiCode: "WHOSIS_000004",
    hasSubnational: false,
    higherIsBetter: false,
    oecdBenchmark: 500,
    sourceUrl: "https://www.who.int/data/gho",
  },
  {
    id: "adult-mortality",
    name: "Adult Mortality Rate",
    dimension: "population-health",
    unit: "per 1,000",
    definition:
      "Probability of dying between ages 15 and 60 per 1,000 population. Captures premature adult mortality from all causes including chronic disease, injury, and overdose.",
    apiSource: "who-gho",
    apiCode: "WHOSIS_000004",
    hasSubnational: false,
    higherIsBetter: false,
    oecdBenchmark: 75,
    sourceUrl: "https://www.who.int/data/gho",
  },
  {
    id: "obesity-prevalence",
    name: "Obesity Prevalence (Adults)",
    dimension: "population-health",
    unit: "%",
    definition:
      "Age-standardized prevalence of obesity (BMI >= 30) among adults aged 18+ years.",
    apiSource: "who-gho",
    apiCode: "NCD_BMI_30A",
    hasSubnational: false,
    higherIsBetter: false,
    oecdBenchmark: 24,
    sourceUrl: "https://www.who.int/data/gho",
  },
  {
    id: "diabetes-prevalence",
    name: "Diabetes Prevalence",
    dimension: "population-health",
    unit: "%",
    definition:
      "Percentage of population ages 20-79 who have type 1 or type 2 diabetes.",
    apiSource: "worldbank",
    apiCode: "SH.STA.DIAB.ZS",
    hasSubnational: false,
    higherIsBetter: false,
    oecdBenchmark: 7.0,
    sourceUrl:
      "https://data.worldbank.org/indicator/SH.STA.DIAB.ZS?locations=US",
  },
  {
    id: "smoking-prevalence",
    name: "Smoking Prevalence",
    dimension: "population-health",
    unit: "%",
    definition:
      "Prevalence of current tobacco smoking among adults aged 15+.",
    apiSource: "worldbank",
    apiCode: "SH.PRV.SMOK",
    hasSubnational: false,
    higherIsBetter: false,
    oecdBenchmark: 16,
    sourceUrl:
      "https://data.worldbank.org/indicator/SH.PRV.SMOK?locations=US",
  },
  {
    id: "drug-overdose",
    name: "Drug Overdose Death Rate",
    dimension: "population-health",
    unit: "per 100,000",
    definition:
      "Age-standardized mortality rate from drug use disorders and accidental poisoning, per 100,000 population. Reflects the US opioid/fentanyl crisis.",
    apiSource: "who-gho",
    apiCode: "SA_0000001688",
    hasSubnational: false,
    higherIsBetter: false,
    sourceUrl: "https://www.who.int/data/gho",
  },
  {
    id: "suicide-rate",
    name: "Suicide Mortality Rate",
    dimension: "population-health",
    unit: "per 100,000",
    definition:
      "Age-standardized suicide mortality rate per 100,000 population.",
    apiSource: "worldbank",
    apiCode: "SH.STA.SUIC.P5",
    hasSubnational: false,
    higherIsBetter: false,
    oecdBenchmark: 11,
    sourceUrl:
      "https://data.worldbank.org/indicator/SH.STA.SUIC.P5?locations=US",
  },
  {
    id: "dpt-immunization",
    name: "DPT Immunization Coverage",
    dimension: "population-health",
    unit: "%",
    definition:
      "Percentage of children ages 12-23 months who received 3 doses of DPT-containing vaccine.",
    apiSource: "worldbank",
    apiCode: "SH.IMM.IDPT",
    hasSubnational: false,
    higherIsBetter: true,
    oecdBenchmark: 93,
    sourceUrl:
      "https://data.worldbank.org/indicator/SH.IMM.IDPT?locations=US",
  },
  {
    id: "healthy-life-expectancy",
    name: "Healthy Life Expectancy (HALE)",
    dimension: "population-health",
    unit: "years",
    definition:
      "Average number of years a person can expect to live in full health, adjusting for years lived with disability. Recommended in the IHI Triple Aim measurement guide as the ideal composite measure.",
    apiSource: "who-gho",
    apiCode: "WHOSIS_000002",
    hasSubnational: false,
    higherIsBetter: true,
    oecdBenchmark: 70,
    sourceUrl: "https://www.who.int/data/gho",
  },

  // ── Experience of Care (8) ──
  {
    id: "hospital-beds",
    name: "Hospital Bed Density",
    dimension: "experience-of-care",
    unit: "per 1,000 pop",
    definition:
      "Number of hospital beds per 1,000 population. Measures system capacity for inpatient care.",
    apiSource: "worldbank",
    apiCode: "SH.MED.BEDS.ZS",
    hasSubnational: false,
    higherIsBetter: true,
    oecdBenchmark: 4.3,
    sourceUrl:
      "https://data.worldbank.org/indicator/SH.MED.BEDS.ZS?locations=US",
  },
  {
    id: "physician-density",
    name: "Physician Density",
    dimension: "experience-of-care",
    unit: "per 1,000 pop",
    definition:
      "Number of physicians per 1,000 population.",
    apiSource: "worldbank",
    apiCode: "SH.MED.PHYS.ZS",
    hasSubnational: false,
    higherIsBetter: true,
    oecdBenchmark: 3.6,
    sourceUrl:
      "https://data.worldbank.org/indicator/SH.MED.PHYS.ZS?locations=US",
  },
  {
    id: "nurse-density",
    name: "Nurse & Midwife Density",
    dimension: "experience-of-care",
    unit: "per 1,000 pop",
    definition:
      "Number of nurses and midwives per 1,000 population.",
    apiSource: "worldbank",
    apiCode: "SH.MED.NUMW.P3",
    hasSubnational: false,
    higherIsBetter: true,
    oecdBenchmark: 8.8,
    sourceUrl:
      "https://data.worldbank.org/indicator/SH.MED.NUMW.P3?locations=US",
  },
  {
    id: "uhc-coverage",
    name: "UHC Service Coverage Index",
    dimension: "experience-of-care",
    unit: "index (0-100)",
    definition:
      "Coverage of essential health services across reproductive, maternal, child health, infectious diseases, NCDs, and service capacity.",
    apiSource: "who-gho",
    apiCode: "UHC_INDEX_REPORTED",
    hasSubnational: false,
    higherIsBetter: true,
    oecdBenchmark: 80,
    sourceUrl: "https://www.who.int/data/gho",
  },
  {
    id: "amenable-mortality",
    name: "Mortality Amenable to Healthcare",
    dimension: "experience-of-care",
    unit: "per 100,000",
    definition:
      "Deaths from causes that are considered preventable with timely and effective healthcare. A key measure of health system quality.",
    apiSource: "who-gho",
    apiCode: "SDGPM25",
    hasSubnational: false,
    higherIsBetter: false,
    oecdBenchmark: 115,
    sourceUrl: "https://www.who.int/data/gho",
  },
  {
    id: "neonatal-mortality",
    name: "Neonatal Mortality Rate",
    dimension: "experience-of-care",
    unit: "per 1,000 live births",
    definition:
      "Probability of dying within the first 28 days of life, per 1,000 live births. Reflects quality of perinatal and neonatal care.",
    apiSource: "worldbank",
    apiCode: "SH.DYN.NMRT",
    hasSubnational: false,
    higherIsBetter: false,
    oecdBenchmark: 2.6,
    sourceUrl:
      "https://data.worldbank.org/indicator/SH.DYN.NMRT?locations=US",
  },
  {
    id: "readmission-rate",
    name: "Hospital Readmission Rate",
    dimension: "experience-of-care",
    unit: "%",
    definition:
      "National average 30-day unplanned hospital readmission rate for Medicare patients. A CMS quality measure reflecting care coordination and discharge planning.",
    apiSource: "cms",
    apiCode: "hospital_readmissions",
    hasSubnational: false,
    higherIsBetter: false,
    oecdBenchmark: 12,
    sourceUrl: "https://data.cms.gov/provider-data/",
  },
  {
    id: "medicare-spending",
    name: "Medicare Spending per Beneficiary",
    dimension: "experience-of-care",
    unit: "USD",
    definition:
      "Average Medicare spending per beneficiary during a hospital episode, including 3 days prior through 30 days post-discharge. Bridges experience and cost dimensions.",
    apiSource: "cms",
    apiCode: "medicare_spending",
    hasSubnational: false,
    higherIsBetter: false,
    sourceUrl: "https://data.cms.gov/provider-data/",
  },

  // ── Per Capita Cost (6) ──
  {
    id: "health-expenditure-capita",
    name: "Health Expenditure per Capita",
    dimension: "per-capita-cost",
    unit: "USD",
    definition:
      "Current health expenditure per capita in current US dollars. The US spends more per capita than any other country.",
    apiSource: "worldbank",
    apiCode: "SH.XPD.CHEX.PC.CD",
    hasSubnational: false,
    higherIsBetter: false,
    oecdBenchmark: 4986,
    sourceUrl:
      "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD?locations=US",
  },
  {
    id: "health-spending-gdp",
    name: "Health Spending as % of GDP",
    dimension: "per-capita-cost",
    unit: "%",
    definition:
      "Current health expenditure as a percentage of gross domestic product.",
    apiSource: "worldbank",
    apiCode: "SH.XPD.CHEX.GD.ZS",
    hasSubnational: false,
    higherIsBetter: false,
    oecdBenchmark: 9.2,
    sourceUrl:
      "https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS?locations=US",
  },
  {
    id: "oop-expenditure",
    name: "Out-of-Pocket Expenditure (% of Health Spending)",
    dimension: "per-capita-cost",
    unit: "%",
    definition:
      "Out-of-pocket payments as a percentage of current health expenditure. Reflects direct financial burden on consumers.",
    apiSource: "worldbank",
    apiCode: "SH.XPD.OOPC.CH.ZS",
    hasSubnational: false,
    higherIsBetter: false,
    oecdBenchmark: 20,
    sourceUrl:
      "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=US",
  },
  {
    id: "govt-health-expenditure",
    name: "Government Health Expenditure (% of GDP)",
    dimension: "per-capita-cost",
    unit: "%",
    definition:
      "Domestic general government health expenditure as a percentage of GDP.",
    apiSource: "worldbank",
    apiCode: "SH.XPD.GHED.GD.ZS",
    hasSubnational: false,
    higherIsBetter: true,
    oecdBenchmark: 6.6,
    sourceUrl:
      "https://data.worldbank.org/indicator/SH.XPD.GHED.GD.ZS?locations=US",
  },
  {
    id: "private-health-expenditure",
    name: "Domestic Private Health Expenditure (% of Total)",
    dimension: "per-capita-cost",
    unit: "%",
    definition:
      "Domestic private health expenditure as a percentage of current health expenditure. Reflects the role of private insurance and out-of-pocket spending.",
    apiSource: "worldbank",
    apiCode: "SH.XPD.PVTD.CH.ZS",
    hasSubnational: false,
    higherIsBetter: false,
    oecdBenchmark: 26,
    sourceUrl:
      "https://data.worldbank.org/indicator/SH.XPD.PVTD.CH.ZS?locations=US",
  },
  {
    id: "external-health-expenditure",
    name: "External Health Expenditure (% of Total)",
    dimension: "per-capita-cost",
    unit: "%",
    definition:
      "External health expenditure as a percentage of current health expenditure. Should be near zero for the US.",
    apiSource: "worldbank",
    apiCode: "SH.XPD.EHEX.CH.ZS",
    hasSubnational: false,
    higherIsBetter: false,
    oecdBenchmark: 0.1,
    sourceUrl:
      "https://data.worldbank.org/indicator/SH.XPD.EHEX.CH.ZS?locations=US",
  },
];

export function getIndicatorsByDimension(dimension: Dimension): Indicator[] {
  return indicators.filter((i) => i.dimension === dimension);
}

export function getIndicatorById(id: string): Indicator | undefined {
  return indicators.find((i) => i.id === id);
}
