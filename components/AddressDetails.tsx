'use client';

import { useState, useEffect } from 'react';
import { Wallet, Landmark, History } from 'lucide-react';

// A new Card component for consistent styling
function InfoCard({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-5">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      </div>
      {children}
    </div>
  );
}
// ... and the rest of the polished component
