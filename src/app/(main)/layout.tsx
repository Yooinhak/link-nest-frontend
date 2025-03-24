import BottomNavigationBar from '@components/BottomNavigationBar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav></nav>
      <main className="w-full max-w-[500px] mx-auto bg-slate-300 min-h-screen">{children}</main>
      <BottomNavigationBar />
    </>
  );
}
