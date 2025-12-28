import sql from "@/app/api/utils/sql";

// Generate a filled PDF form based on conversation
export async function POST(request) {
  try {
    const { conversationId, jurisdiction, formType, messages } =
      await request.json();

    if (!formType || !jurisdiction) {
      return Response.json(
        { error: "Form type and jurisdiction are required" },
        { status: 400 },
      );
    }

    // Use AI to extract form data from conversation
    const formData = await extractFormDataFromConversation(
      messages,
      jurisdiction,
      formType,
    );

    // Generate HTML based on jurisdiction and form type
    let html = generateFormHTML(jurisdiction, formType, formData);

    // Generate PDF
    const pdfResponse = await fetch("/integrations/pdf-generation/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: { html },
      }),
    });

    if (!pdfResponse.ok) {
      throw new Error("Failed to generate PDF");
    }

    const pdfBlob = await pdfResponse.blob();
    const pdfBuffer = await pdfBlob.arrayBuffer();
    const base64Pdf = Buffer.from(pdfBuffer).toString("base64");
    const pdfDataUrl = `data:application/pdf;base64,${base64Pdf}`;

    // Save to database if conversationId provided
    if (conversationId) {
      await sql`
        INSERT INTO generated_forms (conversation_id, form_type, form_data, pdf_url, created_at)
        VALUES (${conversationId}, ${formType}, ${JSON.stringify(formData)}, ${pdfDataUrl}, NOW())
      `;
    }

    return Response.json({
      pdfUrl: pdfDataUrl,
      formType,
      jurisdiction,
    });
  } catch (error) {
    console.error("Error generating form:", error);
    return Response.json({ error: "Failed to generate form" }, { status: 500 });
  }
}

// Extract form data from conversation using AI
async function extractFormDataFromConversation(
  messages,
  jurisdiction,
  formType,
) {
  const extractionPrompt = `Based on the following conversation, extract the specific information needed for ${formType} in ${jurisdiction}.

Conversation:
${messages.map((m) => `${m.role}: ${m.content}`).join("\n\n")}

Extract and return ONLY a JSON object with the form fields. Use null for any missing information.
Do not include any explanatory text, only the JSON object.`;

  try {
    const response = await fetch("/integrations/chat-gpt/conversationgpt4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "You are a data extraction assistant. Extract form data from tax conversations and return ONLY valid JSON.",
          },
          { role: "user", content: extractionPrompt },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to extract form data");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Try to parse JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return {};
  } catch (error) {
    console.error("Error extracting form data:", error);
    return { taxYear: new Date().getFullYear() - 1 };
  }
}

function generateFormHTML(jurisdiction, formType, data) {
  const styles = `
    <style>
      body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
      .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #000; padding-bottom: 20px; }
      .header h1 { margin: 0; font-size: 24px; }
      .header p { margin: 5px 0; color: #666; }
      .section { margin: 20px 0; }
      .section h2 { font-size: 16px; background: #f0f0f0; padding: 10px; margin-bottom: 15px; }
      .field { margin: 10px 0; display: flex; justify-content: space-between; }
      .field label { font-weight: bold; width: 40%; }
      .field .value { width: 55%; border-bottom: 1px solid #ccc; padding-bottom: 2px; }
      .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #000; font-size: 12px; color: #666; }
    </style>
  `;

  // USA Forms
  if (jurisdiction === "USA") {
    if (formType.includes("1040")) {
      return generateUSA1040(data, styles);
    } else if (formType.includes("1120")) {
      return generateUSA1120(data, styles);
    } else if (formType.includes("1065")) {
      return generateUSA1065(data, styles);
    } else if (formType.includes("Schedule C")) {
      return generateUSAScheduleC(data, styles);
    }
  }

  // Canada Forms
  if (jurisdiction === "Canada") {
    if (formType.includes("T1")) {
      return generateCanadaT1(data, styles);
    } else if (formType.includes("T2")) {
      return generateCanadaT2(data, styles);
    } else if (formType.includes("GST/HST")) {
      return generateCanadaGSTHST(data, styles);
    }
  }

  // Saudi Arabia Forms
  if (jurisdiction === "KSA") {
    if (formType.includes("VAT")) {
      return generateKSAVAT(data, styles);
    } else if (formType.includes("CIT")) {
      return generateKSACIT(data, styles);
    } else if (formType.includes("Zakat")) {
      return generateKSAZakat(data, styles);
    }
  }

  // Pakistan Forms
  if (jurisdiction === "Pakistan") {
    if (formType.includes("114")) {
      return generatePakistan114(data, styles);
    } else if (formType.includes("116")) {
      return generatePakistan116(data, styles);
    } else if (formType.includes("Sales Tax")) {
      return generatePakistanSalesTax(data, styles);
    }
  }

  // Generic fallback
  return generateGenericForm(jurisdiction, formType, data, styles);
}

// USA Form 1040
function generateUSA1040(data, styles) {
  return `
    <!DOCTYPE html>
    <html>
    <head>${styles}</head>
    <body>
      <div class="header">
        <h1>U.S. Individual Income Tax Return (Form 1040)</h1>
        <p>Department of the Treasury - Internal Revenue Service</p>
        <p>Tax Year: ${data.taxYear || new Date().getFullYear() - 1}</p>
      </div>
      <div class="section">
        <h2>Personal Information</h2>
        <div class="field"><label>First Name:</label><div class="value">${data.firstName || ""}</div></div>
        <div class="field"><label>Last Name:</label><div class="value">${data.lastName || ""}</div></div>
        <div class="field"><label>Social Security Number:</label><div class="value">${data.ssn || ""}</div></div>
        <div class="field"><label>Address:</label><div class="value">${data.address || ""}</div></div>
        <div class="field"><label>City, State, ZIP:</label><div class="value">${data.cityStateZip || ""}</div></div>
      </div>
      <div class="section">
        <h2>Filing Status</h2>
        <div class="field"><label>Filing Status:</label><div class="value">${data.filingStatus || ""}</div></div>
      </div>
      <div class="section">
        <h2>Income</h2>
        <div class="field"><label>Wages, Salaries, Tips (Line 1):</label><div class="value">$${data.wages || "0"}</div></div>
        <div class="field"><label>Interest Income (Line 2b):</label><div class="value">$${data.interest || "0"}</div></div>
        <div class="field"><label>Business Income (Line 8):</label><div class="value">$${data.businessIncome || "0"}</div></div>
        <div class="field"><label>Total Income:</label><div class="value">$${data.totalIncome || "0"}</div></div>
      </div>
      <div class="section">
        <h2>Deductions</h2>
        <div class="field"><label>Standard/Itemized Deduction:</label><div class="value">$${data.deduction || "0"}</div></div>
        <div class="field"><label>QBI Deduction (Line 13):</label><div class="value">$${data.qbiDeduction || "0"}</div></div>
      </div>
      <div class="section">
        <h2>Tax Computation</h2>
        <div class="field"><label>Taxable Income:</label><div class="value">$${data.taxableIncome || "0"}</div></div>
        <div class="field"><label>Tax Liability:</label><div class="value">$${data.taxLiability || "0"}</div></div>
        <div class="field"><label>Federal Tax Withheld:</label><div class="value">$${data.withheld || "0"}</div></div>
        <div class="field"><label>Amount Owed/Refund:</label><div class="value">$${data.refundOrOwed || "0"}</div></div>
      </div>
      <div class="footer">
        <p>This form was generated by Khan Waheed & Co. AI Tax Assistant</p>
        <p>Please review all information carefully before filing. Consult a tax professional for verification.</p>
      </div>
    </body>
    </html>
  `;
}

// USA Form 1120
function generateUSA1120(data, styles) {
  return `
    <!DOCTYPE html>
    <html>
    <head>${styles}</head>
    <body>
      <div class="header">
        <h1>U.S. Corporation Income Tax Return (Form 1120)</h1>
        <p>Department of the Treasury - Internal Revenue Service</p>
        <p>Tax Year: ${data.taxYear || new Date().getFullYear() - 1}</p>
      </div>
      <div class="section">
        <h2>Corporation Information</h2>
        <div class="field"><label>Corporation Name:</label><div class="value">${data.corporationName || ""}</div></div>
        <div class="field"><label>EIN:</label><div class="value">${data.ein || ""}</div></div>
        <div class="field"><label>Business Address:</label><div class="value">${data.address || ""}</div></div>
        <div class="field"><label>City, State, ZIP:</label><div class="value">${data.cityStateZip || ""}</div></div>
        <div class="field"><label>Date Incorporated:</label><div class="value">${data.dateIncorporated || ""}</div></div>
      </div>
      <div class="section">
        <h2>Income</h2>
        <div class="field"><label>Gross Receipts (Line 1a):</label><div class="value">$${data.grossReceipts || "0"}</div></div>
        <div class="field"><label>Cost of Goods Sold (Line 2):</label><div class="value">$${data.cogs || "0"}</div></div>
        <div class="field"><label>Gross Profit (Line 3):</label><div class="value">$${data.grossProfit || "0"}</div></div>
      </div>
      <div class="section">
        <h2>Deductions</h2>
        <div class="field"><label>Salaries and Wages (Line 12):</label><div class="value">$${data.salaries || "0"}</div></div>
        <div class="field"><label>Rent (Line 16):</label><div class="value">$${data.rent || "0"}</div></div>
        <div class="field"><label>Depreciation (Line 20):</label><div class="value">$${data.depreciation || "0"}</div></div>
        <div class="field"><label>Other Deductions:</label><div class="value">$${data.otherDeductions || "0"}</div></div>
        <div class="field"><label>Total Deductions (Line 27):</label><div class="value">$${data.totalDeductions || "0"}</div></div>
      </div>
      <div class="section">
        <h2>Tax and Payment</h2>
        <div class="field"><label>Taxable Income (Line 28):</label><div class="value">$${data.taxableIncome || "0"}</div></div>
        <div class="field"><label>Income Tax (Line 31):</label><div class="value">$${data.incomeTax || "0"}</div></div>
        <div class="field"><label>Tax Due:</label><div class="value">$${data.taxDue || "0"}</div></div>
      </div>
      <div class="footer">
        <p>This form was generated by Khan Waheed & Co. AI Tax Assistant</p>
        <p>Please review all information carefully before filing. Consult a tax professional for verification.</p>
      </div>
    </body>
    </html>
  `;
}

// Canada T1 General
function generateCanadaT1(data, styles) {
  return `
    <!DOCTYPE html>
    <html>
    <head>${styles}</head>
    <body>
      <div class="header">
        <h1>Canada Income Tax and Benefit Return (T1 General)</h1>
        <p>Canada Revenue Agency</p>
        <p>Tax Year: ${data.taxYear || new Date().getFullYear() - 1}</p>
      </div>
      <div class="section">
        <h2>Personal Information</h2>
        <div class="field"><label>First Name:</label><div class="value">${data.firstName || ""}</div></div>
        <div class="field"><label>Last Name:</label><div class="value">${data.lastName || ""}</div></div>
        <div class="field"><label>Social Insurance Number:</label><div class="value">${data.sin || ""}</div></div>
        <div class="field"><label>Address:</label><div class="value">${data.address || ""}</div></div>
        <div class="field"><label>Province:</label><div class="value">${data.province || ""}</div></div>
      </div>
      <div class="section">
        <h2>Total Income</h2>
        <div class="field"><label>Employment Income (Line 10100):</label><div class="value">$${data.employmentIncome || "0"}</div></div>
        <div class="field"><label>Self-Employment Income (Line 13500):</label><div class="value">$${data.selfEmployment || "0"}</div></div>
        <div class="field"><label>Interest Income (Line 12100):</label><div class="value">$${data.interest || "0"}</div></div>
        <div class="field"><label>Total Income (Line 15000):</label><div class="value">$${data.totalIncome || "0"}</div></div>
      </div>
      <div class="section">
        <h2>Deductions</h2>
        <div class="field"><label>RRSP Contributions (Line 20800):</label><div class="value">$${data.rrsp || "0"}</div></div>
        <div class="field"><label>Net Income (Line 23600):</label><div class="value">$${data.netIncome || "0"}</div></div>
        <div class="field"><label>Taxable Income (Line 26000):</label><div class="value">$${data.taxableIncome || "0"}</div></div>
      </div>
      <div class="section">
        <h2>Tax and Credits</h2>
        <div class="field"><label>Federal Tax:</label><div class="value">$${data.federalTax || "0"}</div></div>
        <div class="field"><label>Provincial Tax:</label><div class="value">$${data.provincialTax || "0"}</div></div>
        <div class="field"><label>Total Tax Payable:</label><div class="value">$${data.totalTax || "0"}</div></div>
        <div class="field"><label>Refund or Balance Owing:</label><div class="value">$${data.refundOrOwing || "0"}</div></div>
      </div>
      <div class="footer">
        <p>This form was generated by Khan Waheed & Co. AI Tax Assistant</p>
        <p>Please review all information carefully before filing with CRA.</p>
      </div>
    </body>
    </html>
  `;
}

// Pakistan Section 114 (Income Tax Return)
function generatePakistan114(data, styles) {
  return `
    <!DOCTYPE html>
    <html>
    <head>${styles}</head>
    <body>
      <div class="header">
        <h1>Income Tax Return - Section 114</h1>
        <p>Federal Board of Revenue (FBR) - Pakistan</p>
        <p>Tax Year: ${data.taxYear || new Date().getFullYear() - 1}</p>
      </div>
      <div class="section">
        <h2>Taxpayer Information</h2>
        <div class="field"><label>Name:</label><div class="value">${data.name || ""}</div></div>
        <div class="field"><label>CNIC:</label><div class="value">${data.cnic || ""}</div></div>
        <div class="field"><label>NTN:</label><div class="value">${data.ntn || ""}</div></div>
        <div class="field"><label>Status:</label><div class="value">${data.filerStatus || "Filer/Non-Filer"}</div></div>
        <div class="field"><label>Address:</label><div class="value">${data.address || ""}</div></div>
      </div>
      <div class="section">
        <h2>Income Details</h2>
        <div class="field"><label>Salary Income:</label><div class="value">Rs. ${data.salaryIncome || "0"}</div></div>
        <div class="field"><label>Business Income:</label><div class="value">Rs. ${data.businessIncome || "0"}</div></div>
        <div class="field"><label>Property Income:</label><div class="value">Rs. ${data.propertyIncome || "0"}</div></div>
        <div class="field"><label>Other Income:</label><div class="value">Rs. ${data.otherIncome || "0"}</div></div>
        <div class="field"><label>Total Income:</label><div class="value">Rs. ${data.totalIncome || "0"}</div></div>
      </div>
      <div class="section">
        <h2>Tax Computation</h2>
        <div class="field"><label>Taxable Income:</label><div class="value">Rs. ${data.taxableIncome || "0"}</div></div>
        <div class="field"><label>Tax Liability:</label><div class="value">Rs. ${data.taxLiability || "0"}</div></div>
        <div class="field"><label>Tax Already Paid:</label><div class="value">Rs. ${data.taxPaid || "0"}</div></div>
        <div class="field"><label>Balance Tax Payable:</label><div class="value">Rs. ${data.balanceTax || "0"}</div></div>
      </div>
      <div class="footer">
        <p>This form was generated by Khan Waheed & Co. AI Tax Assistant</p>
        <p>Please file via IRIS 2.0 portal. Verify all details with a tax consultant before submission.</p>
      </div>
    </body>
    </html>
  `;
}

// Saudi Arabia VAT Return
function generateKSAVAT(data, styles) {
  return `
    <!DOCTYPE html>
    <html>
    <head>${styles}</head>
    <body>
      <div class="header">
        <h1>VAT Return (15%)</h1>
        <p>Zakat, Tax and Customs Authority (ZATCA) - Saudi Arabia</p>
        <p>Period: ${data.period || ""}</p>
      </div>
      <div class="section">
        <h2>Taxpayer Information</h2>
        <div class="field"><label>Business Name:</label><div class="value">${data.businessName || ""}</div></div>
        <div class="field"><label>VAT Registration Number:</label><div class="value">${data.vatNumber || ""}</div></div>
        <div class="field"><label>CR Number:</label><div class="value">${data.crNumber || ""}</div></div>
      </div>
      <div class="section">
        <h2>Sales (Output VAT)</h2>
        <div class="field"><label>Standard Rated Sales (15%):</label><div class="value">SAR ${data.standardSales || "0"}</div></div>
        <div class="field"><label>VAT on Sales:</label><div class="value">SAR ${data.outputVAT || "0"}</div></div>
        <div class="field"><label>Zero-Rated Sales:</label><div class="value">SAR ${data.zeroRatedSales || "0"}</div></div>
        <div class="field"><label>Exempt Sales:</label><div class="value">SAR ${data.exemptSales || "0"}</div></div>
      </div>
      <div class="section">
        <h2>Purchases (Input VAT)</h2>
        <div class="field"><label>Standard Rated Purchases (15%):</label><div class="value">SAR ${data.standardPurchases || "0"}</div></div>
        <div class="field"><label>Input VAT Recoverable:</label><div class="value">SAR ${data.inputVAT || "0"}</div></div>
      </div>
      <div class="section">
        <h2>Net VAT</h2>
        <div class="field"><label>Total Output VAT:</label><div class="value">SAR ${data.outputVAT || "0"}</div></div>
        <div class="field"><label>Total Input VAT:</label><div class="value">SAR ${data.inputVAT || "0"}</div></div>
        <div class="field"><label>Net VAT Payable/(Refundable):</label><div class="value">SAR ${data.netVAT || "0"}</div></div>
      </div>
      <div class="footer">
        <p>This form was generated by Khan Waheed & Co. AI Tax Assistant</p>
        <p>Please file via ZATCA portal. Ensure E-invoicing compliance for Phase 2.</p>
      </div>
    </body>
    </html>
  `;
}

// Generic fallback for other forms
function generateGenericForm(jurisdiction, formType, data, styles) {
  return `
    <!DOCTYPE html>
    <html>
    <head>${styles}</head>
    <body>
      <div class="header">
        <h1>${formType}</h1>
        <p>${jurisdiction} Tax Form</p>
        <p>Generated by Khan Waheed & Co. AI Tax Assistant</p>
      </div>
      <div class="section">
        <h2>Form Data</h2>
        ${Object.entries(data)
          .map(
            ([key, value]) => `
          <div class="field">
            <label>${key}:</label>
            <div class="value">${value || ""}</div>
          </div>
        `,
          )
          .join("")}
      </div>
      <div class="footer">
        <p>Please review all information carefully before filing. Consult a tax professional for verification.</p>
      </div>
    </body>
    </html>
  `;
}

// Placeholder functions for other forms (implement as needed)
function generateUSA1065(data, styles) {
  return generateGenericForm(
    "USA",
    "Form 1065 - Partnership Return",
    data,
    styles,
  );
}

function generateUSAScheduleC(data, styles) {
  return generateGenericForm(
    "USA",
    "Schedule C - Profit or Loss from Business",
    data,
    styles,
  );
}

function generateCanadaT2(data, styles) {
  return generateGenericForm(
    "Canada",
    "T2 Corporate Income Tax Return",
    data,
    styles,
  );
}

function generateCanadaGSTHST(data, styles) {
  return generateGenericForm("Canada", "GST/HST Return", data, styles);
}

function generateKSACIT(data, styles) {
  return generateGenericForm("KSA", "Corporate Income Tax Form", data, styles);
}

function generateKSAZakat(data, styles) {
  return generateGenericForm("KSA", "Zakat Return", data, styles);
}

function generatePakistan116(data, styles) {
  return generateGenericForm(
    "Pakistan",
    "Section 116 - Wealth Statement",
    data,
    styles,
  );
}

function generatePakistanSalesTax(data, styles) {
  return generateGenericForm("Pakistan", "Sales Tax Return", data, styles);
}
