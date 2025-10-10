"use client";

import type { ReactNode } from "react";

interface WizardLayoutProps {
  children: ReactNode;
}

export default function WizardLayout({ children }: WizardLayoutProps) {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
