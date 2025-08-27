export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { iid, orderId } = req.body;

  if (!iid || !orderId) {
    return res.status(400).json({ error: "IID y número de pedido son obligatorios" });
  }

  // Validación básica de pedido (ejemplo simple)
  if (!orderId.startsWith("ORD-")) {
    return res.status(403).json({ error: "Número de pedido inválido o no autorizado" });
  }

  const token = process.env.KICHHOT_TOKEN;
  const price = 0.5;

  try {
    const response = await fetch("https://kichhoat24h.com/user-api/get-cid", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ iid, price, token })
    });

    const data = await response.json();

    if (!data.success) {
      return res.status(400).json({ error: data.error_message || "Error desconocido" });
    }

    if (data.cid) {
      return res.status(200).json({ cid: data.cid });
    } else {
      return res.status(202).json({ message: data.response_message });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error conectando con el servidor externo" });
  }
}

