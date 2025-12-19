import React, { useState } from "react";
import {
  Card,
  Input,
  Tag,
  Button,
  Typography
} from "antd";
import {
  SearchOutlined,
  FolderOutlined,
  FileOutlined,
  DeleteOutlined
} from "@ant-design/icons";

const { Text } = Typography;

// Theme colors from MyQueue
const PRIMARY_PURPLE = "#2B1C67";
const SUCCESS_GREEN = "#52c41a";

function DocumentPicker({ selectedDocuments, setSelectedDocuments }) {
  const [search, setSearch] = useState("");

  const allDocuments = [
    // Primary Documents
    { name: "Offer Letter (new facilities)", type: "Primary", category: "Non-Allowable" },
    { name: "Letter of Variation of facilities", type: "Primary", category: "Non-Allowable" },
    { name: "Board Resolutions by borrowers and guarantors", type: "Primary", category: "Non-Allowable" },
    { name: "Loan Agreements (Master Asset Finance agreement, Hire Purchase Agreement, Securities Agreement, Agency Agreement etc.)", type: "Primary", category: "Non-Allowable" },
    { name: "Inter-lenders Agreements", type: "Primary", category: "Non-Allowable" },
    { name: "Debentures plus supporting documentation", type: "Primary", category: "Non-Allowable" },
    { name: "Letters of Exclusion from debentures or receivables", type: "Primary", category: "Non-Allowable" },
    { name: "Legal Charges plus supporting documentation", type: "Primary", category: "Non-Allowable" },
    { name: "Further charges (up stamping) on existing legal charges & debentures*", type: "Primary", category: "Allowable" },
    { name: "Letter of Lien (any type)/letter of set off/memorandum of general pledge", type: "Primary", category: "Non-Allowable" },
    { name: "Cash Cover", type: "Primary", category: "Allowable" },
    { name: "Joint Registrations of assets", type: "Primary", category: "Non-Allowable" },
    { name: "Execution of Documents by Motor Vehicle Dealers", type: "Primary", category: "Non-Allowable" },
    { name: "Final Invoices for settlement", type: "Primary", category: "Non-Allowable" },
    { name: "Shares and bonds", type: "Primary", category: "Non-Allowable" },
    { name: "Insurance for assets financed", type: "Primary", category: "Non-Allowable" },
    { name: "Evidence of payment of full deposit amounts (borrowers contribution) before drawdown", type: "Primary", category: "Non-Allowable" },
    { name: "Tracking certificates", type: "Primary", category: "Non-Allowable" },
    { name: "Memorandum and Articles of Association, or amendments of the same where the facility has already been approved for a new to Bank client", type: "Primary", category: "Non-Allowable" },
    { name: "Affidavit of Title", type: "Primary", category: "Non-Allowable" },
    { name: "Sale agreement", type: "Primary", category: "Non-Allowable" },
    { name: "Offer Letter (Straight annual reviews) - to pursued as limit extensions and not deferrals", type: "Primary", category: "Non-Allowable" },
    { name: "Any New Guarantees (director, company, property owners' guarantee etc.) and Indemnities", type: "Primary", category: "Non-Allowable" },
    { name: "Deeds of Assignment of Incomes and Receivables", type: "Primary", category: "Non-Allowable" },
    { name: "Deeds of Indemnity", type: "Primary", category: "Non-Allowable" },
    { name: "Deeds of Subordination", type: "Primary", category: "Allowable" },
    { name: "Statements of Assets and Liabilities including certificate of compliance to the LOF", type: "Primary", category: "Allowable" },
    { name: "Valuations / Re-valuations for purpose of up-stamping of securities", type: "Primary", category: "Non-Allowable" },
    { name: "Re-valuation (normal revaluation after 4 years)", type: "Primary", category: "Allowable" },
    { name: "Company searches", type: "Primary", category: "Non-Allowable" },
    { name: "Collection of Bank Charges", type: "Primary", category: "Allowable" },
    { name: "Import entry and corresponding duty payment receipts for vehicles financed", type: "Primary", category: "Non-Allowable" },
    { name: "Receipt of original logbooks in the name of the seller", type: "Primary", category: "Allowable" },
    { name: "Current Vehicle Inspection Reports", type: "Primary", category: "Allowable" },
    { name: "Machine/Equipment Warranties", type: "Primary", category: "Allowable" },
    { name: "Change of payee(s) or details of payee(s)", type: "Primary", category: "Non-Allowable" },
    { name: "For All Construction Related Credit Facilities Prior to Disbursement: architects certificates, Quantity Surveyor's Report, Bills of Quantities, certificate of occupation/completion Approved drawings, Contractor's All Risk Insurance Cover, Professional Certificates, Letters of Undertaking, National Environment Management Authority (NEMA), Energy and Petroleum Regulatory Authority (EPRA) and Road Authorities (KENHA, KURA,KERRA). National Construction Authority Approval, Contractor's profile, National Construction Authority certificate and Professional Certificates", type: "Primary", category: "Allowable" },
    { name: "Where applicable, Compliance with provisions of the bank's and the United Nations Environmental and Social Management System (ESMS) and IFC Performance Standards", type: "Primary", category: "Allowable" },
    { name: "Original share certificates (for shares & Bonds held as collateral)Share certificates for sectional units and blank transfer forms.", type: "Primary", category: "Allowable" },
    { name: "Land searches", type: "Primary", category: "Allowable" },
    { name: "Amendments on logbooks (subject to the customer having executed required documentation)", type: "Primary", category: "Allowable" },
    { name: "Commercial Benefit Agreements", type: "Primary", category: "Allowable" },

    // Secondary Documents
    { name: "Annual Returns", type: "Secondary", category: "Non-Allowable" },
    { name: "Tax Compliance Certificates", type: "Secondary", category: "Allowable" },
    { name: "Land Rents & Rates receipts", type: "Secondary", category: "Allowable" },
    { name: "Customer Identification Documents e.g. ID, Passport, KRA PINS", type: "Secondary", category: "Allowable" },
    { name: "Receipt of Final/Original Invoices from off takers, motor vehicle dealers/sellers etc.", type: "Secondary", category: "Allowable" },
    { name: "Employer salary remittance letters and their originals", type: "Secondary", category: "Allowable" },
    { name: "Employer check off letters and their originals", type: "Secondary", category: "Allowable" },
    { name: "Authority to sell letters from the bank's approved dealers.", type: "Secondary", category: "Allowable" },
    { name: "Provision of sellers bank details", type: "Secondary", category: "Allowable" },
    { name: "Landlords Letter", type: "Secondary", category: "Allowable" },
    { name: "Direct Debit or Standing Order forms/instructions", type: "Secondary", category: "Allowable" },
    { name: "Delivery Notes for equipment/machinery/goods", type: "Secondary", category: "Allowable" },
    { name: "Share of Wallet letter", type: "Secondary", category: "Allowable" },
    { name: "Current CR12", type: "Secondary", category: "Non-Allowable" },
    { name: "Opening of Mpesa Till number/linking to account/Till Transfer linked to account in another bank", type: "Secondary", category: "Non-Allowable" },
    { name: "Occupational safety and health audit reports", type: "Secondary", category: "Non-Allowable" },
  ];

  const handleSelect = (doc) => {
    if (!selectedDocuments.some(selected => selected.name === doc.name)) {
      setSelectedDocuments([...selectedDocuments, doc]);
    }
    setSearch("");
  };

  const removeDocument = (index) => {
    const temp = [...selectedDocuments];
    temp.splice(index, 1);
    setSelectedDocuments(temp);
  };

  const updateDocumentName = (index, value) => {
    const temp = [...selectedDocuments];
    temp[index].name = value;
    setSelectedDocuments(temp);
  };

  const filteredDocs = allDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const getCategoryColor = (category) => {
    return category === "Allowable" ? "green" : "red";
  };

  const getTypeColor = (type) => {
    return type === "Primary" ? "blue" : "orange";
  };

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <FolderOutlined style={{ color: PRIMARY_PURPLE }} />
          <span style={{ color: PRIMARY_PURPLE, fontSize: 16 }}>Document Name</span>
        </div>
      }
      size="small"
      style={{ marginBottom: 16, border: `1px solid ${PRIMARY_PURPLE}20` }}
    >
      <div style={{ marginBottom: 16 }}>
        <Text strong style={{ display: 'block', marginBottom: 8 }}>Search Document</Text>
        <Input
          placeholder="Type to search document..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="large"
          suffix={<SearchOutlined />}
        />
      </div>

      {/* Search Results */}
      {search && filteredDocs.length > 0 && (
        <Card 
          size="small" 
          style={{ 
            marginBottom: 16, 
            maxHeight: 300, 
            overflowY: 'auto',
            border: `1px solid ${PRIMARY_PURPLE}30`
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {filteredDocs.map((doc, i) => (
              <div
                key={i}
                onClick={() => handleSelect(doc)}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #f0f0f0',
                  borderRadius: 4,
                  backgroundColor: '#fafafa',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6f7ff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
              >
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
                  {doc.name}
                </div>
                <div style={{ display: 'flex', gap: 8, fontSize: 12 }}>
                  <Tag color={getTypeColor(doc.type)} size="small">{doc.type}</Tag>
                  <Tag color={getCategoryColor(doc.category)} size="small">{doc.category}</Tag>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {search && filteredDocs.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: 16, 
          color: '#999',
          backgroundColor: '#fafafa',
          borderRadius: 4,
          marginBottom: 16
        }}>
          No documents found
        </div>
      )}

      {/* Selected Documents */}
      {selectedDocuments.length > 0 && (
        <Card
          title={
            <div style={{ fontSize: 14, fontWeight: 500 }}>
              Selected Documents ({selectedDocuments.length})
            </div>
          }
          size="small"
          style={{ border: `1px solid ${SUCCESS_GREEN}30`, backgroundColor: `${SUCCESS_GREEN}08` }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {selectedDocuments.map((doc, i) => (
              <div
                key={i}
                style={{
                  padding: '12px',
                  border: '1px solid #e8e8e8',
                  borderRadius: 4,
                  backgroundColor: 'white',
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <Input
                      value={doc.name}
                      onChange={(e) => updateDocumentName(i, e.target.value)}
                      style={{ marginBottom: 8 }}
                      placeholder="Document name"
                    />
                    <div style={{ display: 'flex', gap: 8, fontSize: 12 }}>
                      <Tag 
                        color={getTypeColor(doc.type)} 
                        style={{ margin: 0, fontSize: 11 }}
                      >
                        {doc.type}
                      </Tag>
                      <Tag 
                        color={getCategoryColor(doc.category)} 
                        style={{ margin: 0, fontSize: 11 }}
                      >
                        {doc.category}
                      </Tag>
                    </div>
                  </div>
                  <Button
                    type="text"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => removeDocument(i)}
                    style={{ minWidth: 'auto' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {selectedDocuments.length === 0 && !search && (
        <div style={{ 
          textAlign: 'center', 
          padding: 24, 
          color: '#999',
          backgroundColor: '#fafafa',
          borderRadius: 4
        }}>
          <FileOutlined style={{ fontSize: 32, marginBottom: 8 }} />
          <div>No documents selected</div>
          <Text type="secondary" style={{ fontSize: 12, marginTop: 4 }}>
            Search and select documents above
          </Text>
        </div>
      )}
    </Card>
  );
}

export default DocumentPicker;