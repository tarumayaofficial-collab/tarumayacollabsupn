'use client';

import { useState, useEffect, use } from 'react';
import { supabase } from '../../../lib/supabase';
import { notFound } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import Link from 'next/link';

interface Produk {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  category: string;
  images: string[];
}

export default function HalamanDetailProduk({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // Unpack params sesuai standar Next.js terbaru
  const resolvedParams = use(params);
  
  const { addToCart } = useCart();
  const [produk, setProduk] = useState<Produk | null>(null);
  const [nomorWA, setNomorWA] = useState<string>('6281234567890'); // State nomor WA
  const [loading, setLoading] = useState<boolean>(true);

  // Ambil data detail produk & nomor WA dari Supabase secara Client-side
  useEffect(() => {
    async function ambilData() {
      setLoading(true);
      
      const [resProduk, resSetting] = await Promise.all([
        supabase.from('products').select('*').eq('slug', resolvedParams.slug).single(),
        supabase.from('toko_settings').select('whatsapp_number').eq('id', 'utama').single()
      ]);

      if (!resProduk.error && resProduk.data) {
        setProduk(resProduk.data as Produk);
      }
      if (!resSetting.error && resSetting.data?.whatsapp_number) {
        setNomorWA(resSetting.data.whatsapp_number);
      }
      
      setLoading(false);
    }
    ambilData();
  }, [resolvedParams.slug]);

  // Jika masih proses loading data
  if (loading) {
    return (
      <div style={{ background: '#E8DCC8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: '#1F2A44' }}>
        <p style={{ fontWeight: '500' }}>Memuat detail produk Tarumaya...</p>
      </div>
    );
  }

  // Jika loading selesai dan produk memang tidak ditemukan
  if (!produk) {
    notFound();
  }

  // JALUR 1: Fungsi memicu aksi penambahan item ke dalam keranjang belanja global
  const tanganiTambahKeranjang = () => {
    if (produk.stock <= 0) {
      alert('⚠️ Maaf, produk ini sedang habis sehingga tidak bisa dimasukkan ke keranjang.');
      return;
    }

    addToCart({
      id: produk.id,
      name: produk.name,
      slug: produk.slug,
      price: produk.price,
      category: produk.category,
      image: produk.images && produk.images.length > 0 ? produk.images[0] : 'https://via.placeholder.com/300',
      stock: produk.stock
    });
  };

  // JALUR 2: Fungsi Beli Langsung (Instant Checkout WA)
  const tanganiBeliLangsung = () => {
    if (produk.stock <= 0) {
      alert('⚠️ Maaf, produk ini sedang habis.');
      return;
    }
    const teksWhatsApp = encodeURIComponent(
      `Halo Tarumaya, saya ingin beli langsung produk ini:\n\n*Nama:* ${produk.name}\n*Kategori:* ${produk.category}\n*Harga:* Rp ${Number(produk.price).toLocaleString('id-ID')}\n\nApakah siap kirim hari ini?`
    );
    window.open(`https://wa.me/${nomorWA}?text=${teksWhatsApp}`, '_blank');
  };

  return (
    <div style={{ background: '#E8DCC8', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#1F2A44' }}>
      <div style={{ maxWidth: '900px', margin: '20px auto', background: '#FFF', padding: '30px', borderRadius: '16px', border: '1px solid rgba(198, 167, 94, 0.25)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
        
        {/* Tombol Kembali / Navigasi Cepat */}
        <div style={{ marginBottom: '20px' }}>
          <Link href="/produk" style={{ textDecoration: 'none', color: '#1F2A44', fontSize: '14px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            ⬅ Kembali ke Katalog
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          
          {/* Bagian Kiri: Gambar Produk (Bingkai Estetik) */}
          <div style={{ flex: '1', minWidth: '300px', height: '420px', backgroundColor: '#fcfaf7', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f3ece2' }}>
            {produk.images && produk.images.length > 0 ? (
              <img src={produk.images[0]} alt={produk.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ color: '#ccc', fontSize: '14px' }}>Tidak ada gambar</span>
            )}
          </div>

          {/* Bagian Kanan: Informasi Produk Premium */}
          <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            {/* Label Kategori */}
            <span style={{ color: '#C6A75E', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              {produk.category || 'Umum'}
            </span>
            
            {/* Nama Produk */}
            <h1 style={{ margin: '10px 0 6px 0', fontSize: '28px', color: '#1F2A44', fontWeight: 'bold', fontFamily: 'serif', lineHeight: '1.3' }}>
              {produk.name}
            </h1>
            
            {/* Harga Produk */}
            <h2 style={{ color: '#C6A75E', margin: '0 0 15px 0', fontSize: '24px', fontWeight: 'bold' }}>
              <span style={{ fontSize: '16px', marginRight: '2px', fontWeight: '600' }}>Rp</span>
              {Number(produk.price).toLocaleString('id-ID')}
            </h2>
            
            {/* Status Stok */}
            <p style={{ fontSize: '13px', color: produk.stock > 0 ? '#137333' : '#c5221f', fontWeight: 'bold', margin: '0 0 20px 0', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              {produk.stock > 0 ? `🟢 Stok Tersedia: ${produk.stock} pcs` : '🔴 Stok produk ini sedang habis'}
            </p>
            
            <div style={{ borderTop: '1px solid #f5ede2', margin: '10px 0 20px 0' }}></div>
            
            {/* Deskripsi */}
            <h3 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#1F2A44' }}>
              Deskripsi Produk
            </h3>
            <p style={{ lineHeight: '1.6', color: '#555', margin: '0 0 30px 0', fontSize: '14px' }}>
              {produk.description || 'Tidak ada deskripsi tertulis untuk produk ini.'}
            </p>
            
            {/* TATA LETAK DUA JALUR BARU: Berdampingan Sangat Rapi */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '15px' }}>
              
              {/* Tombol Jalur 1: Beli Langsung (Warna Emas Mewah) */}
              <button 
                onClick={tanganiBeliLangsung}
                disabled={produk.stock <= 0}
                style={{ 
                  flex: '1',
                  minWidth: '140px',
                  textAlign: 'center', 
                  background: produk.stock > 0 ? '#C6A75E' : '#ccc', 
                  color: '#FFF', 
                  padding: '14px', 
                  border: 'none',
                  borderRadius: '8px', 
                  fontSize: '13px', 
                  fontWeight: 'bold', 
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  cursor: produk.stock > 0 ? 'pointer' : 'not-allowed',
                  boxShadow: produk.stock > 0 ? '0 4px 12px rgba(198, 167, 94, 0.25)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                ⚡ Beli Langsung
              </button>

              {/* Tombol Jalur 2: Masukkan Keranjang (Warna Navy Asli Kamu) */}
              <button 
                onClick={tanganiTambahKeranjang}
                disabled={produk.stock <= 0}
                style={{ 
                  flex: '1',
                  minWidth: '140px',
                  textAlign: 'center', 
                  background: produk.stock > 0 ? '#1F2A44' : '#ccc', 
                  color: produk.stock > 0 ? '#E8DCC8' : '#666', 
                  padding: '14px', 
                  border: 'none',
                  borderRadius: '8px', 
                  fontSize: '13px', 
                  fontWeight: 'bold', 
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  cursor: produk.stock > 0 ? 'pointer' : 'not-allowed',
                  boxShadow: produk.stock > 0 ? '0 4px 15px rgba(31, 42, 68, 0.2)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                Masukan 🛒 
              </button>

            </div>

            {/* Link Pintas Menuju Halaman Keranjang Setelah klik */}
            <div style={{ textAlign: 'center', marginTop: '5px' }}>
              <Link href="/keranjang" style={{ color: '#C6A75E', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
                Keranjang Saya 
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}