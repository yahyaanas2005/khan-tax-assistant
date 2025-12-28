import React from "react";

export default function Footer() {
  return (
    <footer className="py-8 bg-[#0F172A] dark:bg-[#000000] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p
          className="text-center text-gray-400"
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "14px",
          }}
        >
          © 2025 Khan Waheed & Co. Chartered Accountants. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
