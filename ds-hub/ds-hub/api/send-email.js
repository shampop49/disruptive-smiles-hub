// Vercel Serverless Function — /api/send-email
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_ADDRESS   = process.env.RESEND_FROM_EMAIL || "hub@disruptivesmiles.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!RESEND_API_KEY) {
    console.log("RESEND_API_KEY not set — skipping email");
    return res.status(200).json({ skipped: true });
  }
  const { to, subject, html } = req.body;
  if (!to || !subject || !html) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const toArray = Array.isArray(to) ? to : [to];
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Disruptive Smiles Hub <${FROM_ADDRESS}>`,
        to: toArray,
        subject,
        html,
      }),
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);
    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
