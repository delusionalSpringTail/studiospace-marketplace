"use client";

import React from "react";
import { Check, X } from "lucide-react";

export interface PasswordRule {
  label: string;
  test: boolean;
}

interface PasswordChecklistProps {
  rules: PasswordRule[];
}

export function PasswordChecklist({ rules }: PasswordChecklistProps) {
  return (
    <div className="mt-2 flex flex-col gap-1.5 rounded-lg border border-border bg-muted/40 dark:bg-zinc-900/60 p-3">
      <p className="text-xs font-semibold text-muted-foreground mb-0.5">
        Password requirements:
      </p>
      {rules.map((rule, idx) => (
        <div key={idx} className="flex items-center gap-2 text-xs">
          {rule.test ? (
            <Check size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <X size={14} className="text-red-500 dark:text-red-400 shrink-0" />
          )}
          <span
            className={
              rule.test
                ? "text-emerald-600 dark:text-emerald-400 font-medium"
                : "text-red-500 dark:text-red-400"
            }
          >
            {rule.label}
          </span>
        </div>
      ))}
    </div>
  );
}