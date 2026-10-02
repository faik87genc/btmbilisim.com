import Link from "next/link";
import { LayoutDashboard, Newspaper, FileText, ListTodo, LogOut } from "lucide-react";
import { logout } from "../actions";
import { site } from "@/lib/site";
import { requireAdminSession } from "@/lib/adminGuard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminSession();

  return (
    <>
      <header className="border-b border-navy-950/10 bg-navy-950">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/admin/" className="font-display text-lg font-semibold text-paper-50">
            {site.shortName} Admin
          </Link>
          <nav className="flex items-center gap-5 text-sm text-slate-300">
            <Link href="/admin/" className="flex items-center gap-1.5 hover:text-paper-50">
              <LayoutDashboard className="h-4 w-4" /> Panel
            </Link>
            <Link href="/admin/blog/" className="flex items-center gap-1.5 hover:text-paper-50">
              <Newspaper className="h-4 w-4" /> Blog
            </Link>
            <Link href="/admin/sayfalar/" className="flex items-center gap-1.5 hover:text-paper-50">
              <FileText className="h-4 w-4" /> Sayfalar
            </Link>
            <Link href="/admin/konu-kuyrugu/" className="flex items-center gap-1.5 hover:text-paper-50">
              <ListTodo className="h-4 w-4" /> Konu kuyruğu
            </Link>
            <form action={logout}>
              <button type="submit" className="flex items-center gap-1.5 hover:text-paper-50">
                <LogOut className="h-4 w-4" /> Çıkış
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">
        {children}
      </main>
    </>
  );
}
