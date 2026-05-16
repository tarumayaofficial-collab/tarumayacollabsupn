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
      
      {/* BANNER UTAMA (NAVY MEWAH DENGAN TEKS EMAS) */}
      <div style={{ 
        background: '#1F2A44', 
        color: '#E8DCC8', 
        padding: '50px 20px', 
        textAlign: 'center',
        marginBottom: '30px',
        borderBottom: '4px solid #C6A75E',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <span style={{ color: '#C6A75E', fontSize: '11px', fontWeight: 'bold', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
          Tarumaya Premium Leatherwear
        </span>
        <h1 style={{ fontSize: '32px', margin: '0 0 10px 0', fontWeight: 'bold', color: '#FFF', fontFamily: 'serif', letterSpacing: '1px' }}>
          Eksklusivitas dalam Setiap Detail
        </h1>
       <p style={{ fontSize: '14px', color: '#E8DCC8', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
          Koleksi mahakarya kulit serat asli lokal yang menggabungkan ketangguhan material dengan estetika klasik yang tak lekang oleh waktu.
        </p>
      </div>

      {/* KONTEN UTAMA KATALOG */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
        
        {/* BAR JUDUL SEKSI REKOMENDASI */}
        <div style={{ 
          background: '#FFF', 
          padding: '15px 20px', 
          borderRadius: '8px', 
          marginBottom: '20px', 
          borderLeft: '5px solid #C6A75E',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1F2A44', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Koleksi Produk Pilihan
          </h2>
          <span style={{ fontSize: '13px', color: '#666', fontWeight: '500' }}>{daftarProduk.length} Masterpiece</span>
        </div>
        
        {/* GRID PRODUK SANGAT RAPI */}
        {daftarProduk.length === 0 ? (
          <div style={{ background: '#FFF', padding: '60px', textAlign: 'center', borderRadius: '8px', color: '#1F2A44', border: '1px solid #C6A75E' }}>
            Koleksi eksklusif sedang dipersiapkan oleh tim pengrajin kami.
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
            gap: '20px'
          }}>
            {daftarProduk.map((produk) => (
              <Link href={`/produk/${produk.slug}`} key={produk.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ 
                  background: '#FFF',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(198, 167, 94, 0.3)', // Garis tipis warna emas transparan
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  height: '100%',
                  transition: '0.2s'
                }}>
                  {/* FOTO PRODUK DENGAN SUB-BACKGROUND BEIGE HALUS */}
                  <div style={{ width: '100%', height: '220px', backgroundColor: '#fcfaf7', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    {produk.images && produk.images.length > 0 ? (
                      <img src={produk.images[0]} alt={produk.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ color: '#ccc', fontSize: '12px' }}>Tidak ada gambar</span>
                    )}

                    {/* LABEL KATEGORI ELEGAN MELAYANG */}
                    <span style={{ 
                      position: 'absolute', 
                      top: '12px', 
                      left: '12px', 
                      background: '#1F2A44', 
                      color: '#E8DCC8', 
                      padding: '3px 10px', 
                      fontSize: '10px', 
                      fontWeight: 'bold',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {produk.category}
                    </span>
                  </div>
                  
                  {/* INFORMASI PRODUK */}
                  <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    
                    <div>
                      {/* Judul Produk */}
                      <h3 style={{ 
                        margin: '0 0 10px 0', 
                        fontSize: '15px', 
                        fontWeight: '600', 
                        color: '#1F2A44',
                        lineHeight: '1.4',
                        height: '42px',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {produk.name}
                      </h3>

                      {/* Harga Investasi Menawan */}
                      <p style={{ margin: '0 0 5px 0', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Harga
                      </p>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#C6A75E' }}>
                        <span style={{ fontSize: '13px', marginRight: '2px' }}>Rp</span>{Number(produk.price).toLocaleString('id-ID')}
                      </span>
                    </div>

                    {/* Pembatas dan Info Stok */}
                    <div style={{ borderTop: '1px solid #f0f0f0', marginTop: '15px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#666' }}>
                        Stok: <strong>{produk.stock} pcs</strong>
                      </span>
                      <span style={{ fontSize: '12px', color: '#1F2A44', fontWeight: 'bold' }}>
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