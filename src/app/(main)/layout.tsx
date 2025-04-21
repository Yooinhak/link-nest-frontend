export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-full max-w-[500px] mx-auto bg-slate-300 min-h-screen">{children}</main>;
}
