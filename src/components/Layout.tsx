import Navbar from './Navbar';
import Footer from './Footer';
import LenisProvider from './LenisProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <div className="flex min-h-[100dvh] flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </LenisProvider>
  );
}
