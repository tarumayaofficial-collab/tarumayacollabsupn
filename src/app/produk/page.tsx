'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

interface Produk {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  category: string; // REVISI: Diubah ke string bebas agar selaras dengan input admin
  images: string[];
}

export default function HalamanProduk() {
  const [semuaProduk, setSemuaProduk] = useState<Produk[]>([]);
  const [produkDifilter, setProdukDifilter] = useState<Produk[]>([]);
  const [kategoriAktif, setKategoriAktif] = useState<string>('Semua');
  const [loading, setLoading] = useState<boolean>(true);
  
  // REVISI: Sekarang daftar kategori disimpan di state agar bisa bertambah secara dinamis
  const [daftarKategori, setDaftarKategori] = useState<string[]>(['Semua']);

  useEffect(() => {
    async function ambilData() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const listProduk = data as Produk[];
        setSemuaProduk(listProduk);
        setProdukDifilter(listProduk); // Default awal tampilkan semua

        // ===================================================================
        // LOGIKA BARU: EKSTRAKSI KATEGORI OTOMATIS DARI DATA ADMIN
        // ===================================================================
        // 1. Ambil semua teks kategori yang ada di dalam produk database
        // 2. Gunakan Set agar nama kategori yang kembar otomatis dilebur (tidak ganda)
        const kategoriUnik = Array.from(
          new Set(listProduk.map((p) => p.category || 'Umum'))
        );
        
        // 3. Gabungkan tombol 'Semua' di awal dengan daftar kategori dinamis tadi
        setDaftarKategori(['Semua', ...kategoriUnik]);
        // ===================================================================
      }
      setLoading(false);
    }
    ambilData();
  }, []);

  // Fungsi saat tombol kategori diklik oleh pelanggan
  const tanganiFilter = (kategori: string) => {
    setKategoriAktif(kategori);
    if (kategori === 'Semua') {
      setProdukDifilter(semuaProduk);
    } else {
      // Menyaring produk berdasarkan teks kategori yang sama persis
      const hasilSaring = semuaProduk.filter((p) => (p.category || 'Umum') === kategori);
      setProdukDifilter(hasilSaring);
    }
  };

  return (
    <div style={{ background: '#E8DCC8', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#1F2A44' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Judul Halaman Bergaya Anggun */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 10px 0', color: '#1F2A44', fontWeight: 'bold', fontFamily: 'serif', letterSpacing: '1px' }}>
            Koleksi Produk Tarumaya
          </h1>
          <div style={{ width: '50px', height: '2px', background: '#C6A75E', margin: '0 auto 15px auto' }}></div>
          <p style={{ color: '#555', margin: 0, fontSize: '15px' }}>
            Silakan pilih kategori produk kerajinan kulit asli yang Anda cari
          </p>
        </div>

        {/* TAMPILAN MENU TOMBOL FILTER (PENGELOMPOKAN PILL LUXURY) */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '12px', 
          flexWrap: 'wrap', 
          marginBottom: '40px' 
        }}>
          {daftarKategori.map((kategori) => (
            <button
              key={kategori}
              onClick={() => tanganiFilter(kategori)}
              style={{
                padding: '10px 24px',
                borderRadius: '30px',
                border: kategoriAktif === kategori ? '1px solid #1F2A44' : '1px solid rgba(31, 42, 68, 0.2)',
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: kategoriAktif === kategori ? '0 4px 12px rgba(31, 42, 68, 0.15)' : 'none',
                background: kategoriAktif === kategori ? '#1F2A44' : '#FFF',
                color: kategoriAktif === kategori ? '#E8DCC8' : '#1F2A44',
              }}
            >
              {kategori}
            </button>
          ))}
        </div>

        {/* AREA GRID DAFTAR PRODUK */}
        {loading ? (
          <div style={{ background: '#FFF', padding: '40px', textAlign: 'center', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <p style={{ margin: 0, color: '#666', fontWeight: '500' }}>Memuat katalog produk Tarumaya...</p>
          </div>
        ) : produkDifilter.length === 0 ? (
          <div style={{ background: '#FFF', padding: '50px 20px', textAlign: 'center', borderRadius: '12px', border: '1px solid rgba(198, 167, 94, 0.3)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <p style={{ margin: 0, color: '#1F2A44', fontStyle: 'italic', fontSize: '15px' }}>
              Maaf, produk untuk kategori "{kategoriAktif}" saat ini sedang kosong atau belum di-upload.
            </p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
            gap: '25px' 
          }}>
            {produkDifilter.map((produk) => (
              <div 
                key={produk.id} 
                style={{ 
                  background: '#FFF',
                  border: '1px solid rgba(198, 167, 94, 0.25)', 
                  padding: '16px', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  flexDirection: 'column',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                }}
              >
                {/* Frame Foto Produk Kotak Estetik */}
                <div style={{ 
                  width: '100%', 
                  height: '240px', 
                  backgroundColor: '#fcfaf7', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  borderRadius: '8px', 
                  overflow: 'hidden',
                  border: '1px solid #f3ece2'
                }}>
                  {produk.images && produk.images.length > 0 ? (
                    <img src={produk.images[0]} alt={produk.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ color: '#ccc', fontSize: '12px' }}>Tidak ada gambar</span>
                  )}
                </div>
                
                {/* Informasi Kartu Produk */}
                <span style={{ fontSize: '10px', color: '#C6A75E', marginTop: '16px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  {produk.category || 'Umum'}
                </span>
                
                <h3 style={{ 
                  margin: '6px 0 12px 0', 
                  fontSize: '16px', 
                  fontWeight: '600',
                  color: '#1F2A44',
                  lineHeight: '1.4',
                  height: '44px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {produk.name}
                </h3>
                
                {/* Label & Nilai Rupiah */}
                <div style={{ borderTop: '1px solid #f5ede2', paddingTop: '12px', marginTop: 'auto' }}>
                  <span style={{ display: 'block', fontSize: '11px', color: '#888', textTransform: 'uppercase', marginBottom: '2px' }}>Harga</span>
                  <p style={{ fontWeight: 'bold', margin: '0 0 16px 0', color: '#C6A75E', fontSize: '18px' }}>
                    <span style={{ fontSize: '12px', marginRight: '2px' }}>Rp</span>{Number(produk.price).toLocaleString('id-ID')}
                  </p>
                </div>
                
                {/* Link Tombol Aksi Premium */}
                <Link 
                  href={`/produk/${produk.slug}`} 
                  style={{ 
                    display: 'block', 
                    textAlign: 'center', 
                    background: '#1F2A44', 
                    color: '#E8DCC8', 
                    padding: '12px', 
                    textDecoration: 'none', 
                    borderRadius: '6px', 
                    fontSize: '13px', 
                    fontWeight: 'bold',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    border: '1px solid #1F2A44',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Lihat Detail
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}