"use client";

import { Trash2 } from "lucide-react";

export function DeleteButton({
  action,
  confirmText,
}: {
  action: () => void;
  confirmText: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" /> Sil
      </button>
    </form>
  );
}
