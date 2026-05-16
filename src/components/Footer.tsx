import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ 
      background: '#080808', 
      borderTop: '1px solid #161616',
      padding: '60px 40px',
      fontFamily: 'sans-serif',
      color: '#666'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '30px'
      }}>
        {/* Sisi Kiri: Hak Cipta */}
        <div>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#FFF', letterSpacing: '2px' }}>
            TARU<span style={{ color: '#D4AF37' }}>MAYA</span> LEATHER
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#444' }}>
            © {new Date().getFullYear()} Tarumaya Craftsmanship. All Rights Reserved.
          </p>
        </div>
        
        {/* Sisi Kanan: Menu Tambahan (Disisipkan Pintu Masuk Admin) */}
        <div style={{ display: 'flex', gap: '25px', fontSize: '13px' }}>
          <span style={{ color: '#333' }}>Syarat & Ketentuan</span>
          <span style={{ color: '#333' }}>Mitra Pengrajin</span>
          
          {/* Link Admin Resmi: Rapi, menyatu dengan menu legalitas sehingga tersamarkan */}
          <Link href="/admin" style={{
            color: '#222', // Sangat redup, hampir samar dengan background hitam
            textDecoration: 'none',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            System Management
          </Link>
        </div>
      </div>
    </footer>
  );
}