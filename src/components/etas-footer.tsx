import React from 'react';

export const ETASFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#F0F0F0] border-t border-gray-200 py-4 px-8">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <p className="text-sm text-[#5A646E]">
          © 2025 ETAS Inc. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-[#5A646E]">
          <a href="#" className="hover:text-[#164293] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#164293] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#164293] transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};
