import { useState } from "react";

const DropdownComponent = ({ headerSvg, contentSvg }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "16px",
        width: "90%",
        
        fontFamily: "Arial, sans-serif",
        direction: "rtl",
        textAlign: "right",
        fontSize: "150%",
        background: "#fff",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {headerSvg}
        </div>
        <span style={{ transform: isOpen ? "rotate(0deg)" : "rotate(90deg)" }}>
        <svg className="w-full h-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 9L11.2191 14.3306C11.6684 14.7158 12.3316 14.7158 12.7809 14.3306L19 9" stroke="#717171" stroke-width="1.5" stroke-linecap="round"/>
</svg>

        </span>
      </div>

      {/* Content Section */}
      
      {isOpen && (
        
        <div style={{ marginTop: "10px" }}>
            <svg className="w-full h-auto"  width="337" height="2" viewBox="0 0 337 2" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M337 1H0" stroke="#E6E6E6"/>
</svg>

          <div style={{marginTop: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
            {contentSvg}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
