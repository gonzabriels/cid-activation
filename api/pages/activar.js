import { useState } from "react";

export default function Activar() {
  const [iid, setIid] = useState("");
  const [orderId, setOrderId] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResultado(null);

    const res = await fetch("/api/cid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ iid, orderId }),
    });

    const data = await res.json();
    setLoading(false);
    setResultado(data);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h1>Activación de Licencia</h1>
      <form onSubmit={handleSubmit}>
        <label>ID de instalación (IID):</label>
        <input value={iid} onChange={(e) => setIid(e.target.value)} required />

        <label>Número de pedido:</label>
        <input value={orderId} onChange={(e) => setOrderId(e.target.value)} required />

        <button type="submit" disabled={loading}>
          {loading ? "Consultando..." : "Obtener CID"}
        </button>
      </form>

      {resultado && (
        <div style={{ marginTop: "20px" }}>
          {resultado.cid && <p><b>✅ CID:</b> {resultado.cid}</p>}
          {resultado.message && <p><b>ℹ️</b> {resultado.message}</p>}
          {resultado.error && <p style={{ color: "red" }}>❌ {resultado.error}</p>}
        </div>
      )}
    </div>
  );
}

