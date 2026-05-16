'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <footer style={{ 
      background: '#1F2A44', // REVISI: Diubah ke Navy agar serasi dengan tema mewah Tarumaya kamu
      borderTop: '2px solid #C6A75E', // Garis pembatas emas estetik
      padding: isMobile ? '30px 20px' : '40px 40px', // Padding lebih ramping di HP
      fontFamily: 'sans-serif',
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        // Kalau di HP otomatis urut ke bawah (column), kalau di laptop berjajar kesamping (row)
        flexDirection: isMobile ? 'column' : 'row', 
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'center' : 'center',
        textAlign: isMobile ? 'center' : 'left', // Di HP teks otomatis rata tengah biar rapi
        gap: isMobile ? '20px' : '30px'
      }}>
        
        {/* Sisi Kiri: Hak Cipta */}
        <div>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#FFF', letterSpacing: '2px' }}>
            TARU<span style={{ color: '#C6A75E' }}>MAYA</span> LEATHER
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#E8DCC8', opacity: 0.6 }}>
            © {new Date().getFullYear()} Tarumaya Craftsmanship. All Rights Reserved.
          </p>
        </div>
        
        {/* Sisi Kanan: Menu Tambahan (Disisipkan Pintu Masuk Admin) */}
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', // Menu berbaris ke bawah jika di HP biar lega
          gap: isMobile ? '12px' : '25px', 
          alignItems: 'center',
          fontSize: '12px' 
        }}>
          <span style={{ color: '#E8DCC8', opacity: 0.8, cursor: 'default' }}>Syarat & Ketentuan</span>
          <span style={{ color: '#E8DCC8', opacity: 0.8, cursor: 'default' }}>Mitra Pengrajin</span>
          
          {/* Link Admin Resmi: Dibuat sedikit terlihat (tidak blank hitam) tapi tetap tersamar anggun */}
          <Link href="/admin" style={{
            color: '#C6A75E', // Warna emas khas Tarumaya
            opacity: 0.5,     // Dibuat agak transparan agar tidak terlalu mencolok bagi pembeli biasa
            textDecoration: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            System Management
          </Link>
        </div>

      </div>
    </footer>
  );
}