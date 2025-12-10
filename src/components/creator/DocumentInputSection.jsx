// import React from "react";
// import { Input, Select, Button, message } from "antd";

// const { Option } = Select;

// // Import your loan types (you'll need to adjust the path)
// import { loanTypes } from "../../pages/docTypes"; // Adjust the path as needed

// const DocumentInputSection = ({
//   selectedCategoryName,
//   setSelectedCategoryName = () => {},
//   newDocName = "",
//   setNewDocName = () => {},
//   handleAddNewDocument = () => {},
// }) => {
//   const handleAddClick = () => {
//     if (!newDocName.trim() || !selectedCategoryName) {
//       return message.error(
//         "Please enter a document name and select a category."
//       );
//     }
//     handleAddNewDocument();
//   };

//   return (
//     <div
//       style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}
//     >
//       <Input
//         placeholder="Document Name"
//         value={newDocName}
//         onChange={(e) => setNewDocName(e.target.value)}
//         style={{ flex: 1, minWidth: 200 }}
//       />
//       <Select
//         placeholder="Select Loan Type"
//         value={selectedCategoryName}
//         onChange={setSelectedCategoryName}
//         style={{ minWidth: 180 }}
//         allowClear
//         showSearch
//         filterOption={(input, option) =>
//           option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//         }
//       >
//         {loanTypes.map((loanType) => (
//           <Option key={loanType} value={loanType}>
//             {loanType}
//           </Option>
//         ))}
//       </Select>
//       <Button type="primary" onClick={handleAddClick}>
//         Add Document
//       </Button>
//     </div>
//   );
// };

// export default DocumentInputSection;




// export default DocumentInputSection;
import React from "react";
import { Input, Select, Button, message } from "antd";

const { Option } = Select;

// Import your loan types (you'll need to adjust the path)
import { loanTypes } from "../../pages/docTypes"; // Adjust the path as needed

const DocumentInputSection = ({
  selectedCategoryName,
  setSelectedCategoryName = () => {},
  newDocName = "",
  setNewDocName = () => {},
  handleAddNewDocument = () => {},
}) => {
  const handleAddClick = () => {
    if (!newDocName.trim() || !selectedCategoryName) {
      return message.error(
        "Please enter a document name and select a category."
      );
    }
    handleAddNewDocument();
  };

  return (
    <div
      style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}
    >
      <Input
        placeholder="Document Name"
        value={newDocName}
        onChange={(e) => setNewDocName(e.target.value)}
        style={{ flex: 1, minWidth: 200 }}
      />
      <Select
        placeholder="Select Loan Type"
        value={selectedCategoryName}
        onChange={setSelectedCategoryName}
        style={{ minWidth: 180 }}
        allowClear
        showSearch
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {loanTypes.map((loanType) => (
          <Option key={loanType} value={loanType}>
            {loanType}
          </Option>
        ))}
      </Select>
      <Button type="primary" onClick={handleAddClick}>
        Add Document
      </Button>
    </div>
  );
};

export default DocumentInputSection;

