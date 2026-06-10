const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_ADDRESS   = process.env.RESEND_FROM_EMAIL || "hub@disruptivesmiles.com";
exports.handler = async function(event) {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
  if (!RESEND_API_KEY) { console.log("RESEND_API_KEY not set"); return { statusCode: 200, body: JSON.stringify({ skipped: true }) }; }
  let payload;
  try { payload = JSON.parse(event.body); } catch { return { statusCode: 400, body: "Invalid JSON" }; }
  const { to, subject, html } = payload;
  if (!to || !subject || !html) return { statusCode: 400, body: "Missing fields" };
  const toArray = Array.isArray(to) ? to : [to];
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: `Disruptive Smiles Hub <${FROM_ADDRESS}>`, to: toArray, subject, html }),
    });
    const data = await response.json();
    if (!response.ok) return { statusCode: response.status, body: JSON.stringify(data) };
    return { statusCode: 200, body: JSON.stringify({ success: true, id: data.id }) };
  } catch(err) { return { statusCode: 500, body: err.message }; }
};
