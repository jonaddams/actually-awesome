"use client";

import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import { WizardProvider } from "./components/wizard-context";
import WizardLayout from "./components/wizard-layout";
import StepIndicator from "./components/step-indicator";
import StepContent from "./components/step-content";
import StepNavigation from "./components/step-navigation";

export default function DocumentGeneratorPage() {
  const [docAuthReady, setDocAuthReady] = useState(false);
  const [webSDKReady, setWebSDKReady] = useState(false);

  const docAuthVersion =
    process.env.NEXT_PUBLIC_DOCAUTH_VERSION || "document-authoring-1.8.2-umd";
  const webSDKVersion = process.env.NEXT_PUBLIC_WEB_SDK_VERSION || "1.7.0";

  const sdksReady = docAuthReady && webSDKReady;

  return (
    <>
      {/* Load Document Authoring SDK */}
      <Script
        src={`https://document-authoring.cdn.nutrient.io/releases/${docAuthVersion}.js`}
        strategy="afterInteractive"
        onLoad={() => setDocAuthReady(true)}
        onError={() => console.error("Failed to load Document Authoring SDK")}
      />

      {/* Load NutrientViewer SDK (for PDF viewing in final step) */}
      <Script
        src={`https://cdn.cloud.pspdfkit.com/pspdfkit-web@${webSDKVersion}/nutrient-viewer.js`}
        strategy="afterInteractive"
        onLoad={() => setWebSDKReady(true)}
        onError={() => console.error("Failed to load NutrientViewer SDK")}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header - Dark Background */}
        <header className="bg-[#1a1a1a] text-white">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <Link
              href="/web-sdk"
              className="text-sm text-gray-400 hover:text-white mb-3 inline-block"
            >
              ← Back to Web SDK Samples
            </Link>
            <h1 className="!mb-2 !text-3xl text-white">Document Generator</h1>
            <p className="text-gray-400 text-base">
              Create professional documents in just a few steps
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Loading State */}
          {!sdksReady ? (
            <div className="bg-white rounded-xl shadow-lg p-16 text-center border border-gray-200">
              <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-[var(--digital-pollen)] rounded-full animate-spin mb-4" />
              <p className="text-gray-700 font-medium mb-3">
                Loading Document Authoring SDK...
              </p>
              <p className="text-sm text-gray-500">
                {docAuthReady ? "✓" : "○"} Document Authoring SDK
                <br />
                {webSDKReady ? "✓" : "○"} NutrientViewer SDK
              </p>
            </div>
          ) : (
            <WizardProvider>
              <WizardLayout>
                <StepIndicator />
                <StepContent />
                <StepNavigation />
              </WizardLayout>
            </WizardProvider>
          )}
        </main>
      </div>
    </>
  );
}
