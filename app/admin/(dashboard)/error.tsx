"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Without this, any thrown error in an admin page/action (validation errors,
 * a duplicate slug, a DB hiccup) fell through to Next's generic production
 * crash screen — a blank "This page couldn't load", no message, no way back
 * except a full reload that loses the form. This shows the actual message
 * and lets the user retry or bail out to the blog list instead.
 */
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg rounded-md border border-red-200 bg-red-50 p-6 text-center">
      <p className="text-sm font-semibold text-red-800">Bir hata oluştu</p>
      <p className="mt-2 text-sm text-red-700">{error.message || "Beklenmeyen bir hata."}</p>
      <div className="mt-5 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-sm bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Tekrar dene
        </button>
        <Link
          href="/admin/blog"
          className="rounded-sm border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
        >
          Blog listesine dön
        </Link>
      </div>
    </div>
  );
}
