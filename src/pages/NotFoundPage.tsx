import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <main className="bg-[#F8F2E9] min-h-[75vh] flex items-center justify-center pt-24 pb-16 px-6 text-center">
      <div className="max-w-md space-y-5">
        <span className="text-xs tracking-[0.3em] text-[#C99A54] uppercase font-medium">404 ERROR</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#170C06] font-normal">
          The Page You Seek Cannot Be Found
        </h1>
        <p className="text-xs sm:text-sm text-[#71665C] leading-relaxed">
          The requested jewellery creation or page does not exist or may have been relocated to our private archives.
        </p>
        <div className="pt-4 flex justify-center space-x-4">
          <Link
            to="/"
            className="px-6 py-2.5 bg-[#170C06] text-[#F8F2E9] text-xs tracking-widest uppercase hover:bg-[#C99A54] hover:text-[#170C06] transition-colors"
          >
            Return Home
          </Link>
          <Link
            to="/rings"
            className="px-6 py-2.5 border border-[#170C06] text-[#170C06] text-xs tracking-widest uppercase hover:bg-[#170C06] hover:text-[#F8F2E9] transition-colors"
          >
            Browse Rings
          </Link>
        </div>
      </div>
    </main>
  );
};
