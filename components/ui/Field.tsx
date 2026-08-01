"use client";

import type { ReactNode } from "react";

const inputBase =
  "w-full rounded-xl border border-[var(--line-strong)] bg-white/[0.03] px-4 py-3 text-[0.9375rem] text-white placeholder:text-white/25 transition-colors duration-300 focus:border-brand focus:bg-white/[0.05] focus:outline-none disabled:opacity-50";

export function FieldWrap({
  id,
  label,
  error,
  required,
  hint,
  children,
  className = "",
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
        {label}
        {required && (
          <span className="ml-1 text-brand-soft" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-[11px] text-white/30">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[11px] text-[#ff8080]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required,
  autoComplete,
  disabled,
}: {
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  disabled?: boolean;
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      disabled={disabled}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${inputBase} ${error ? "border-[#ff8080]" : ""}`}
    />
  );
}

export function TextArea({
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  required,
  rows = 4,
  disabled,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  rows?: number;
  disabled?: boolean;
}) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      rows={rows}
      disabled={disabled}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${inputBase} resize-y ${error ? "border-[#ff8080]" : ""}`}
    />
  );
}

export function Select({
  id,
  name,
  value,
  onChange,
  options,
  error,
  required,
  disabled,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputBase} appearance-none pr-10 ${error ? "border-[#ff8080]" : ""} [&>option]:bg-[#0d1019] [&>option]:text-white`}
      >
        <option value="">Select…</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-4 top-1/2 size-3.5 -translate-y-1/2 fill-none stroke-white/40 stroke-[1.5]"
      >
        <path d="m4 6.5 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
