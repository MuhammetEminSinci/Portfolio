import React from "react";

const products = [
  {
    id: 1,
    name: "Yae Miko Kostümü",
    price: "₺2500",
    image:
      "/yae.png", 
  },
  {
    id: 2,
    name: "Raiden Shogun Kostümü",
    price: "₺4500",
    image:
      "/raiden.png",
  },
  {
    id: 3,
    name: "Frieren Kostümü",
    price: "₺3000",
    image:
      "/frieren.png",
  },
];

export default function App() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        backgroundColor: "#fff",
        color: "#000",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Menü */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          backgroundColor: "#ffe4e6",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src="/hijabanime.png"
              alt="Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: "bold", margin: 0 }}>
            Hijab Cosplay
          </h1>
        </div>
        <nav style={{ display: "flex", gap: "1.5rem" }}>
          {["Ana Sayfa", "Ürünler", "Hakkımızda", "İletişim"].map((item) => (
            <button
              key={item}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 16,
                padding: 0,
                color: "#000",
              }}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      {/* Banner */}
      <section
        style={{
          height: 250,
          backgroundColor: "#e0e0e0",
          margin: "1rem 2rem",
          borderRadius: 12,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 24,
          fontWeight: 600,
          color: "#666",
          width: "calc(100% - 4rem)",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <img
          src="/banner.png"
          alt="Banner"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </section>

      {/* Ürünler */}
      <main
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          padding: "0 2rem 2rem",
          width: "100%",
          boxSizing: "border-box",
          flexGrow: 1,
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                height: 380 ,
                backgroundColor: "#ccc",
                overflow: "hidden",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <div
              style={{
                padding: 16,
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2 style={{ margin: "0 0 8px" }}>{product.name}</h2>
              <p
                style={{
                  color: "#e91e63",
                  fontWeight: "bold",
                  fontSize: 18,
                  margin: 0,
                  flexGrow: 1,
                }}
              >
                {product.price}
              </p>
              <button
                style={{
                  marginTop: 16,
                  width: "100%",
                  padding: 12,
                  backgroundColor: "#e91e63",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                Satın Al
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "1rem",
          backgroundColor: "#ffe4e6",
          color: "#555",
          fontSize: 14,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        © 2025 Hijab Cosplay. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
