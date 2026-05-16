'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { getCartCount } = useCart();
  const jumlahKeranjang = getCartCount();

  return (
    <header style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      backdropFilter: 'blur(12px)',
      background: 'rgba(255, 255, 255, 0.85)',
      borderBottom: '1px solid rgba(198, 167, 94, 0.25)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.02)'
    }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'sans-serif'
      }}>
        
        {/* --- LOGO TEKS ESTETIK & UNIK (IDENTITAS TARUMAYA) --- */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Lambang Monogram Minimalis */}
          <span style={{
            fontFamily: 'serif',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#FFF',
            background: '#1F2A44',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            border: '1px solid #C6A75E',
            boxShadow: '0 2px 8px rgba(31, 42, 68, 0.2)'
          }}>
            T
          </span>
          
          {/* Tulisan Utama */}
          <span style={{ 
            fontSize: '22px', 
            fontWeight: '800', 
            fontFamily: '"Playfair Display", "Georgia", serif', 
            letterSpacing: '6px', 
            background: 'linear-gradient(135deg, #C6A75E 0%, #E8DCC8 50%, #9A7B1C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0px 1px 1px rgba(0,0,0,0.05)'
          }}>
            ARUMAYA
          </span>
        </Link>

        {/* Menu Navigasi Clean & Fitur Keranjang Dinamis */}
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#1F2A44', textDecoration: 'none', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>
            Home
          </Link>
          <Link href="/produk" style={{ color: '#1F2A44', textDecoration: 'none', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>
            Produk
          </Link>
          <Link href="/tentang" style={{ color: '#1F2A44', textDecoration: 'none', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>
            Tentang
          </Link>

          {/* MENU BARU: Tombol Keranjang Belanja Ber-notifikasi */}
          <Link href="/keranjang" style={{ 
            color: '#1F2A44', 
            textDecoration: 'none', 
            fontSize: '13px', 
            letterSpacing: '1.5px', 
            textTransform: 'uppercase', 
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(31, 42, 68, 0.05)',
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid rgba(31, 42, 68, 0.1)'
          }}>
            🛒 Cart
            {jumlahKeranjang > 0 && (
              <span style={{
                background: '#dc3545',
                color: '#FFF',
                fontSize: '11px',
                fontWeight: 'bold',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '1'
              }}>
                {jumlahKeranjang}
              </span>
            )}
          </Link>
        </div>
        
      </nav>
    </header>
  );
}