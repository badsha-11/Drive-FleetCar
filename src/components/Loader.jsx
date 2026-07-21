"use client";

import { Spinner } from "@heroui/react";

const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" color="primary" label="Loading..." />

        <p className="text-cyan-600 font-semibold text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;