// Este layout es solo para login/register
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-900 text-white p-4">
      {children}
    </main>
  );
}
