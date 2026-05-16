import { supabase } from '../lib/supabase';
import Link from 'next/link';

interface Produk {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  category: 'Sabuk' | 'Tas Genggam' | 'Tas Slempang' | 'Aksesoris';
  images: string[];
}

async function ambilProduk(): Promise<Produk[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return [];
  return (data as Produk[]) || [];
}

export default async function HalamanUtama() {
  const daftarProduk = await ambilProduk();

  return (
    <div style={{ background: '#E8DCC8', minHeight: '100vh', fontFamily: 'sans-serif', color: '#1F2A44', paddingBottom: '50px' }}>
      
      {/* BANNER UTAMA (Dibuat adaptif menggunakan padding & font-size fleksibel) */}
      <div style={{ 
        background: '#1F2A44', 
        color: '#E8DCC8', 
        padding: '6vw 20px', // Menggunakan vw (viewport width) agar padding menyesuaikan lebar layar
        textAlign: 'center',
        marginBottom: '20px',
        borderBottom: '4px solid #C6A75E',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <span style={{ color: '#C6A75E', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
          Tarumaya Premium Leatherwear
        </span>
        {/* Menggunakan font-size fluid agar mengecil di HP dan membesar di laptop */}
        <h1 style={{ fontSize: 'clamp(20px, 5vw, 32px)', margin: '0 0 10px 0', fontWeight: 'bold', color: '#FFF', fontFamily: 'serif', letterSpacing: '0.5px', lineHeight: '1.2' }}>
          Eksklusivitas dalam Setiap Detail
        </h1>
        <p style={{ fontSize: 'clamp(12px, 3.5vw, 14px)', color: '#E8DCC8', opacity: 0.8, maxWidth: '600px', margin: '0 auto', lineHeight: '1.4' }}>
          Koleksi mahakarya kulit serat asli lokal yang menggabungkan ketangguhan material dengan estetika klasik yang tak lekang oleh waktu.
        </p>
      </div>

      {/* KONTEN UTAMA KATALOG */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 10px' }}>
        
        {/* BAR JUDUL SEKSI REKOMENDASI (Flexbox dibikin wrap agar tidak hancur di HP) */}
        <div style={{ 
          background: '#FFF', 
          padding: '12px 15px', 
          borderRadius: '8px', 
          marginBottom: '15px', 
          borderLeft: '5px solid #C6A75E',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '5px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: '#1F2A44', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Koleksi Produk Pilihan
          </h2>
          <span style={{ fontSize: '11px', color: '#666', fontWeight: '500' }}>{daftarProduk.length} Masterpiece</span>
        </div>
        
        {/* GRID PRODUK OTOMATIS 2 KOLOM DI HP, 4-5 KOLOM DI LAPTOP */}
        {daftarProduk.length === 0 ? (
          <div style={{ background: '#FFF', padding: '40px 20px', textAlign: 'center', borderRadius: '8px', color: '#1F2A44', border: '1px solid #C6A75E', fontSize: '14px' }}>
            Koleksi eksklusif sedang dipersiapkan oleh tim pengrajin kami.
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            // Trik utama: Menggunakan minmax 145px agar pas muat 2 kolom berdampingan di layar HP paling kecil sekalipun
            gridTemplateColumns: 'repeat(auto-fill, minmax(145px, 1fr))', 
            gap: '12px' // Jarak antar kartu dirapatkan sedikit agar hemat ruang di layar HP
          }}>
            {daftarProduk.map((produk) => (
              <Link href={`/produk/${produk.slug}`} key={produk.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ 
                  background: '#FFF',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(198, 167, 94, 0.25)', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                  height: '100%',
                }}>
                  {/* FOTO PRODUK (Tinggi adaptif menggunakan rasio aspek kotak) */}
                  <div style={{ 
                    width: '100%', 
                    aspectRatio: '1/1', // Memaksa bingkai foto selalu kotak sempurna di perangkat apapun
                    backgroundColor: '#fcfaf7', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    position: 'relative' 
                  }}>
                    {produk.images && produk.images.length > 0 ? (
                      <img src={produk.images[0]} alt={produk.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ color: '#ccc', fontSize: '11px' }}>Tidak ada gambar</span>
                    )}

                    {/* LABEL KATEGORI MELAYANG MINI */}
                    <span style={{ 
                      position: 'absolute', 
                      top: '8px', 
                      left: '8px', 
                      background: '#1F2A44', 
                      color: '#E8DCC8', 
                      padding: '2px 6px', 
                      fontSize: '8px', 
                      fontWeight: 'bold',
                      borderRadius: '3px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {produk.category}
                    </span>
                  </div>
                  
                  {/* INFORMASI PRODUK */}
                  <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    
                    <div>
                      {/* Judul Produk (Ukuran font dikecilkan agar muat diletakkan dalam 2 kolom HP) */}
                      <h3 style={{ 
                        margin: '0 0 6px 0', 
                        fontSize: '13px', 
                        fontWeight: '600', 
                        color: '#1F2A44',
                        lineHeight: '1.3',
                        height: '34px', // Batasi tinggi area teks
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {produk.name}
                      </h3>

                      <p style={{ margin: '0 0 2px 0', fontSize: '9px', color: '#888', textTransform: 'uppercase' }}>
                        Harga
                      </p>
                      <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#C6A75E', display: 'block' }}>
                        <span style={{ fontSize: '11px', marginRight: '1px' }}>Rp</span>
                        {Number(produk.price).toLocaleString('id-ID')}
                      </span>
                    </div>

                    {/* Pembatas dan Info Stok */}
                    <div style={{ borderTop: '1px solid #f5ede2', marginTop: '10px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', color: '#666' }}>
                        Stok: <strong>{produk.stock}</strong>
                      </span>
                      <span style={{ fontSize: '10px', color: '#1F2A44', fontWeight: 'bold' }}>
                        Detail →
                      </span>
                    </div>

                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}