import { useState } from "react";
import ContentForm from "./ContentForm";
import OutputPanel from "./OutputPanel";

export default function AiBiz() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-bg flex justify-center p-8">
      <div className="w-full max-w-[1200px] bg-white rounded-card p-7 shadow-card">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">
            AIBIZ – AI Business Assistant
          </h1>
          <p className="text-gray-500 mt-1">
            Generate business plans, pitch decks and strategies
          </p>
        </header>

        {/* Main */}
        <div className="flex gap-5 max-[900px]:flex-col">
          <div className="flex-[1.2]">
            <ContentForm
              setOutput={setOutput}
              setLoading={setLoading}
              loading={loading}
            />
          </div>

          <div className="flex-[1.8]">
            <OutputPanel output={output} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
