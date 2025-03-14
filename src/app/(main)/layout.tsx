export default function MainLayout({children}: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
            main layout!
            {children}
        </div>
    )
}