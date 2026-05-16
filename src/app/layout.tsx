// @ts-ignore
import './globals.css'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartProvider } from '../context/CartContext'; // Pastikan path ini sesuai dengan tempat kamu membuat CartContext

export const metadata = {
  title: 'Tarumaya Leather',
  description: 'Katalog Produk Kerajinan Kulit Terbaik',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body style={{ margin: 0, padding: 0, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Membungkus seluruh aplikasi dengan CartProvider agar state keranjang aktif secara global */}
        <CartProvider>
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}