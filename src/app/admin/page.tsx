import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";

export default async function AdminPage() {
  const cookieStore = await cookies();

  const adminToken = cookieStore.get("admin_token");

  if (!adminToken) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white md:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.4em] text-red-500">
          Restricted Area
        </p>

        <h1 className="mt-2 text-4xl font-bold uppercase">
          Admin Dashboard
        </h1>

        <p className="mt-3 text-white/50">
          Manage incoming contact messages.
        </p>

        <AdminDashboard />
      </div>
    </main>
  );
}