import Footer from "@/components/modules/Footer/Footer";
import Navbar from "@/components/modules/headers/Navbar";


export default function PublicLayout({
  children,
}) {
  return (
    <>
     <Navbar />
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </>
  );
}