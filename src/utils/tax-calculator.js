// Tax calculation utilities for different jurisdictions
// Provides accurate tax calculations based on current tax laws

/**
 * USA Tax Calculator
 */
export const calculateUSATax = {
  // 2024 Federal Tax Brackets (Single)
  federalBrackets: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],

  calculateIncomeTax(income, filingStatus = "single") {
    let tax = 0;
    let remainingIncome = income;

    for (const bracket of this.federalBrackets) {
      if (remainingIncome <= 0) break;

      const taxableInBracket = Math.min(
        remainingIncome,
        bracket.max - bracket.min,
      );
      tax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
    }

    return Math.round(tax * 100) / 100;
  },

  calculateSelfEmploymentTax(netEarnings) {
    // Self-employment tax is 15.3% (12.4% Social Security + 2.9% Medicare)
    const seTax = netEarnings * 0.9235 * 0.153;
    return Math.round(seTax * 100) / 100;
  },

  calculateQBIDeduction(businessIncome, taxableIncome) {
    // Qualified Business Income deduction (20% of QBI)
    const qbi = Math.min(businessIncome * 0.2, taxableIncome * 0.2);
    return Math.round(qbi * 100) / 100;
  },

  standardDeduction: {
    single: 14600,
    married: 29200,
    headOfHousehold: 21900,
  },
};

/**
 * Canada Tax Calculator
 */
export const calculateCanadaTax = {
  // 2024 Federal Tax Brackets
  federalBrackets: [
    { min: 0, max: 55867, rate: 0.15 },
    { min: 55867, max: 111733, rate: 0.205 },
    { min: 111733, max: 173205, rate: 0.26 },
    { min: 173205, max: 246752, rate: 0.29 },
    { min: 246752, max: Infinity, rate: 0.33 },
  ],

  calculateFederalTax(income) {
    let tax = 0;
    let remainingIncome = income;

    for (const bracket of this.federalBrackets) {
      if (remainingIncome <= 0) break;

      const taxableInBracket = Math.min(
        remainingIncome,
        bracket.max - bracket.min,
      );
      tax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
    }

    return Math.round(tax * 100) / 100;
  },

  calculateProvincialTax(income, province = "ON") {
    // Ontario rates as example
    const ontarioBrackets = [
      { min: 0, max: 51446, rate: 0.0505 },
      { min: 51446, max: 102894, rate: 0.0915 },
      { min: 102894, max: 150000, rate: 0.1116 },
      { min: 150000, max: 220000, rate: 0.1216 },
      { min: 220000, max: Infinity, rate: 0.1316 },
    ];

    let tax = 0;
    let remainingIncome = income;

    for (const bracket of ontarioBrackets) {
      if (remainingIncome <= 0) break;

      const taxableInBracket = Math.min(
        remainingIncome,
        bracket.max - bracket.min,
      );
      tax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
    }

    return Math.round(tax * 100) / 100;
  },

  calculateCPP(income) {
    const maxPensionableEarnings = 68500;
    const basicExemption = 3500;
    const rate = 0.0595;

    const pensionableEarnings = Math.min(income, maxPensionableEarnings);
    const cpp = Math.max(0, (pensionableEarnings - basicExemption) * rate);

    return Math.round(cpp * 100) / 100;
  },

  calculateEI(income) {
    const maxInsurableEarnings = 63200;
    const rate = 0.0163;

    const ei = Math.min(income, maxInsurableEarnings) * rate;
    return Math.round(ei * 100) / 100;
  },
};

/**
 * Saudi Arabia Tax Calculator
 */
export const calculateKSATax = {
  calculateVAT(amount, rate = 0.15) {
    // Standard VAT rate is 15%
    const vat = amount * rate;
    return Math.round(vat * 100) / 100;
  },

  calculateCIT(taxableIncome) {
    // Corporate Income Tax is 20% flat rate
    const cit = taxableIncome * 0.2;
    return Math.round(cit * 100) / 100;
  },

  calculateZakat(zakatBase) {
    // Zakat is 2.5% of the zakat base
    const zakat = zakatBase * 0.025;
    return Math.round(zakat * 100) / 100;
  },

  isEInvoicingRequired(annualRevenue) {
    // E-invoicing Phase 2 thresholds
    const thresholds = [40000000, 30000000, 10000000, 3000000];
    return annualRevenue >= thresholds[thresholds.length - 1];
  },
};

/**
 * Pakistan Tax Calculator
 */
export const calculatePakistanTax = {
  // 2024 Tax Year Brackets (Filer)
  filerBrackets: [
    { min: 0, max: 600000, rate: 0.0 },
    { min: 600000, max: 1200000, rate: 0.025 },
    { min: 1200000, max: 2400000, rate: 0.125 },
    { min: 2400000, max: 3600000, rate: 0.175 },
    { min: 3600000, max: 6000000, rate: 0.225 },
    { min: 6000000, max: 12000000, rate: 0.275 },
    { min: 12000000, max: Infinity, rate: 0.35 },
  ],

  // Non-filer rates are higher
  nonFilerBrackets: [
    { min: 0, max: 600000, rate: 0.0 },
    { min: 600000, max: 1200000, rate: 0.05 },
    { min: 1200000, max: 2400000, rate: 0.15 },
    { min: 2400000, max: 3600000, rate: 0.20 },
    { min: 3600000, max: 6000000, rate: 0.25 },
    { min: 6000000, max: 12000000, rate: 0.30 },
    { min: 12000000, max: Infinity, rate: 0.40 },
  ],

  calculateIncomeTax(income, isFiler = true) {
    const brackets = isFiler ? this.filerBrackets : this.nonFilerBrackets;
    let tax = 0;
    let remainingIncome = income;

    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;

      const taxableInBracket = Math.min(
        remainingIncome,
        bracket.max - bracket.min,
      );
      tax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
    }

    return Math.round(tax);
  },

  calculateSalesTax(amount, rate = 0.18) {
    // Standard sales tax rate is 18%
    const salesTax = amount * rate;
    return Math.round(salesTax);
  },

  calculateWithholdingTax(amount, type = "bank_transfer", isFiler = true) {
    const rates = {
      bank_transfer: { filer: 0.006, nonFiler: 0.012 },
      property_sale: { filer: 0.01, nonFiler: 0.02 },
      dividend: { filer: 0.15, nonFiler: 0.15 },
      contract: { filer: 0.07, nonFiler: 0.14 },
    };

    const rate = isFiler ? rates[type].filer : rates[type].nonFiler;
    return Math.round(amount * rate);
  },
};

/**
 * Helper function to format currency
 */
export function formatCurrency(amount, currency = "USD") {
  const symbols = {
    USD: "$",
    CAD: "C$",
    SAR: "SAR ",
    PKR: "Rs. ",
  };

  return `${symbols[currency] || ""}${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Helper function to get tax summary
 */
export function getTaxSummary(jurisdiction, income, options = {}) {
  let summary = {};

  switch (jurisdiction) {
    case "USA":
      summary = {
        grossIncome: income,
        standardDeduction:
          calculateUSATax.standardDeduction[options.filingStatus || "single"],
        taxableIncome:
          income -
          calculateUSATax.standardDeduction[options.filingStatus || "single"],
        federalTax: calculateUSATax.calculateIncomeTax(
          income -
            calculateUSATax.standardDeduction[
              options.filingStatus || "single"
            ],
        ),
        selfEmploymentTax: options.selfEmployed
          ? calculateUSATax.calculateSelfEmploymentTax(income)
          : 0,
      };
      summary.totalTax = summary.federalTax + summary.selfEmploymentTax;
      break;

    case "Canada":
      summary = {
        grossIncome: income,
        federalTax: calculateCanadaTax.calculateFederalTax(income),
        provincialTax: calculateCanadaTax.calculateProvincialTax(
          income,
          options.province,
        ),
        cpp: calculateCanadaTax.calculateCPP(income),
        ei: calculateCanadaTax.calculateEI(income),
      };
      summary.totalTax =
        summary.federalTax + summary.provincialTax + summary.cpp + summary.ei;
      break;

    case "KSA":
      summary = {
        revenue: income,
        vat: calculateKSATax.calculateVAT(income),
        cit: options.isCorporate ? calculateKSATax.calculateCIT(income) : 0,
        zakat: options.isZakatApplicable
          ? calculateKSATax.calculateZakat(income)
          : 0,
        eInvoicingRequired: calculateKSATax.isEInvoicingRequired(income),
      };
      summary.totalTax = summary.vat + summary.cit + summary.zakat;
      break;

    case "Pakistan":
      summary = {
        grossIncome: income,
        incomeTax: calculatePakistanTax.calculateIncomeTax(
          income,
          options.isFiler !== false,
        ),
        filerStatus: options.isFiler !== false ? "Filer" : "Non-Filer",
      };
      summary.totalTax = summary.incomeTax;
      break;
  }

  return summary;
}
