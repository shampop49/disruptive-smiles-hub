// Disruptive Smiles Hub — Email Notifications via Resend

const DIRECTOR_EMAILS = {
  "Shameek Popat":     process.env.REACT_APP_EMAIL_SHAMEEK || "",
  "Andrew Chandrapal": process.env.REACT_APP_EMAIL_ANDREW  || "",
  "Nishan Dixit":      process.env.REACT_APP_EMAIL_NISHAN  || "",
  "Ani Sapra":         process.env.REACT_APP_EMAIL_ANI     || "",
};
const ALL_EMAILS = Object.values(DIRECTOR_EMAILS).filter(Boolean);
const GOLD = "#F5A97F";
const DARK = "#1C1C1C";

async function sendEmail({ to, subject, html }) {
  try {
    await fetch("/.netlify/functions/send-email", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, html }),
    });
  } catch(e) { console.warn("Email error:", e.message); }
}

function template({ title, bodyHtml, ctaUrl = process.env.REACT_APP_HUB_URL || "#" }) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 0;background:#f4f4f4;"><tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
    <tr><td style="background:${DARK};padding:20px 28px;">
      <img src="data:image/jpeg;base64,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" alt="Disruptive Smiles" style="height:32px;width:auto;filter:brightness(0) invert(1);"/>
      <div style="font-size:10px;color:#888;letter-spacing:2px;margin-top:4px;">DIRECTOR HUB</div>
    </td></tr>
    <tr><td style="height:3px;background:linear-gradient(90deg,${GOLD},#C8784A,#f4f4f4);"></td></tr>
    <tr><td style="padding:24px 28px 0;"><h2 style="margin:0;font-size:20px;font-weight:800;color:${DARK};">${title}</h2></td></tr>
    <tr><td style="padding:14px 28px 24px;">${bodyHtml}</td></tr>
    <tr><td style="padding:0 28px 28px;"><a href="${ctaUrl}" style="display:inline-block;background:${GOLD};color:#111;font-weight:700;font-size:14px;padding:11px 24px;border-radius:8px;text-decoration:none;">Open Director Hub →</a></td></tr>
    <tr><td style="background:#f9f9f9;padding:14px 28px;border-top:1px solid #eee;"><p style="margin:0;font-size:11px;color:#aaa;">Automated notification from the Disruptive Smiles Director Hub.</p></td></tr>
  </table></td></tr></table></body></html>`;
}

const PC = { High:"#ef4444", Medium:"#f59e0b", Low:"#10b981" };
const SC = { "To Do":"#64748b","In Progress":"#f59e0b",Review:"#8b5cf6",Done:"#10b981" };
const pill = (t,c) => `<span style="display:inline-block;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:700;background:${c}22;color:${c};border:1px solid ${c}44;">${t}</span>`;

function taskRow(t) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-radius:8px;margin-bottom:12px;border-left:4px solid ${GOLD};"><tr><td style="padding:13px 15px;">
    <div style="font-size:15px;font-weight:700;color:#1c1c1c;margin-bottom:5px;">${t.title}</div>
    <div style="font-size:12px;color:#666;margin-bottom:7px;">${t.category} · Due ${t.due||"No date"}</div>
    <div>${pill(t.priority,PC[t.priority]||"#888")} &nbsp; ${pill(t.status,SC[t.status]||"#888")}</div>
  </td></tr></table>`;
}
function finRow(item,type) {
  const name = type==="invoice" ? item.client : item.payee;
  const amt = `£${Number(item.amount).toLocaleString("en-GB",{minimumFractionDigits:2})}`;
  return `<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-radius:8px;margin-bottom:12px;border-left:4px solid #ef4444;"><tr><td style="padding:13px 15px;">
    <div style="font-size:15px;font-weight:700;color:#1c1c1c;margin-bottom:4px;">${name}</div>
    <div style="font-size:12px;color:#666;margin-bottom:5px;">${item.description||""} · Due ${item.due}</div>
    <div style="font-size:17px;font-weight:800;color:#ef4444;">${amt}</div>
  </td></tr></table>`;
}

export async function notifyTaskAssigned(task, by="A director") {
  const to = DIRECTOR_EMAILS[task.assignee]; if(!to) return;
  await sendEmail({ to, subject: `📋 New task assigned: ${task.title}`,
    html: template({ title:"You've been assigned a task", bodyHtml:`<p style="font-size:14px;color:#444;margin:0 0 14px;">Hi <strong>${task.assignee.split(" ")[0]}</strong>, <strong>${by}</strong> assigned you:</p>${taskRow(task)}${task.notes?`<p style="font-size:13px;color:#666;margin:10px 0 0;"><strong>Notes:</strong> ${task.notes}</p>`:""}` }) });
}
export async function notifyTaskStatusChanged(task, oldStatus, by="A director") {
  if(!ALL_EMAILS.length) return;
  await sendEmail({ to: ALL_EMAILS, subject: `🔄 Task updated: ${task.title} → ${task.status}`,
    html: template({ title:"Task status changed", bodyHtml:`<p style="font-size:14px;color:#444;margin:0 0 14px;"><strong>${by}</strong> moved a task from <strong>${oldStatus}</strong> to <strong>${task.status}</strong>:</p>${taskRow(task)}<p style="font-size:13px;color:#666;">Assigned to: <strong>${task.assignee}</strong></p>` }) });
}
export async function notifyTaskCompleted(task, by="A director") {
  if(!ALL_EMAILS.length) return;
  await sendEmail({ to: ALL_EMAILS, subject: `✅ Task completed: ${task.title}`,
    html: template({ title:"Task marked as Done 🎉", bodyHtml:`<p style="font-size:14px;color:#444;margin:0 0 14px;"><strong>${by}</strong> completed:</p>${taskRow({...task,status:"Done"})}` }) });
}
export async function notifyNewComment(task, comment) {
  const to = DIRECTOR_EMAILS[task.assignee]; if(!to||comment.author===task.assignee) return;
  await sendEmail({ to, subject: `💬 New update on: ${task.title}`,
    html: template({ title:"New activity on your task", bodyHtml:`<p style="font-size:14px;color:#444;margin:0 0 14px;">Hi <strong>${task.assignee.split(" ")[0]}</strong>, <strong>${comment.author}</strong> posted:</p><blockquote style="margin:0 0 14px;padding:11px 14px;background:#f0f0f0;border-left:4px solid ${GOLD};border-radius:4px;font-size:14px;color:#333;">"${comment.text}"</blockquote>${taskRow(task)}` }) });
}
export async function notifyTaskOverdue(task) {
  const to = DIRECTOR_EMAILS[task.assignee]; if(!to) return;
  await sendEmail({ to, subject: `🔴 OVERDUE: ${task.title}`,
    html: template({ title:"Task is overdue", bodyHtml:`<p style="font-size:14px;color:#444;margin:0 0 6px;">Hi <strong>${task.assignee.split(" ")[0]}</strong>, this task passed its due date:</p><p style="font-size:13px;color:#ef4444;font-weight:700;margin:0 0 14px;">Was due: ${task.due}</p>${taskRow(task)}` }) });
}
export async function notifyInvoiceOverdue(invoice) {
  if(!ALL_EMAILS.length) return;
  await sendEmail({ to: ALL_EMAILS, subject: `🔴 OVERDUE INVOICE: ${invoice.client} — £${Number(invoice.amount).toLocaleString("en-GB")}`,
    html: template({ title:"Invoice is overdue", bodyHtml:`<p style="font-size:14px;color:#444;margin:0 0 6px;">This invoice passed its due date unpaid:</p><p style="font-size:13px;color:#ef4444;font-weight:700;margin:0 0 14px;">Was due: ${invoice.due}</p>${finRow(invoice,"invoice")}<p style="font-size:13px;color:#666;">Managed by: <strong>${invoice.assignee}</strong></p>` }) });
}
export async function notifyPaymentOverdue(payment) {
  const to = DIRECTOR_EMAILS[payment.assignee]; if(!to) return;
  await sendEmail({ to, subject: `⚠️ OVERDUE PAYMENT: ${payment.payee} — £${Number(payment.amount).toLocaleString("en-GB")}`,
    html: template({ title:"Payment is overdue", bodyHtml:`<p style="font-size:14px;color:#444;margin:0 0 6px;">Hi <strong>${payment.assignee.split(" ")[0]}</strong>, this payment is overdue:</p><p style="font-size:13px;color:#ef4444;font-weight:700;margin:0 0 14px;">Was due: ${payment.due}</p>${finRow(payment,"payment")}` }) });
}
export async function notifyInvoicePaid(invoice, by="A director") {
  if(!ALL_EMAILS.length) return;
  await sendEmail({ to: ALL_EMAILS, subject: `💚 Invoice paid: ${invoice.client} — £${Number(invoice.amount).toLocaleString("en-GB")}`,
    html: template({ title:"Invoice marked as paid", bodyHtml:`<p style="font-size:14px;color:#444;margin:0 0 14px;"><strong>${by}</strong> marked this invoice as paid:</p>${finRow(invoice,"invoice")}` }) });
}
export async function sendDailyDigest(tasks, invoices, payments) {
  if(!ALL_EMAILS.length) return;
  const today = new Date().toISOString().slice(0,10);
  const in3 = new Date(Date.now()+3*86400000).toISOString().slice(0,10);
  const ot = tasks.filter(t=>t.due&&t.due<today&&t.status!=="Done");
  const dt = tasks.filter(t=>t.due&&t.due>=today&&t.due<=in3&&t.status!=="Done");
  const oi = invoices.filter(i=>i.status==="Overdue");
  const op = payments.filter(p=>p.status==="Overdue");
  if(!ot.length&&!dt.length&&!oi.length&&!op.length) return;
  let body = `<p style="font-size:14px;color:#444;margin:0 0 18px;">Good morning — here is your daily summary for <strong>${new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})}</strong>.</p>`;
  if(ot.length){body+=`<h3 style="font-size:14px;font-weight:800;color:#ef4444;margin:0 0 10px;">🔴 Overdue Tasks (${ot.length})</h3>`;ot.forEach(t=>{body+=taskRow(t);});}
  if(dt.length){body+=`<h3 style="font-size:14px;font-weight:800;color:#f59e0b;margin:14px 0 10px;">⚠️ Due in 3 Days (${dt.length})</h3>`;dt.forEach(t=>{body+=taskRow(t);});}
  if(oi.length){body+=`<h3 style="font-size:14px;font-weight:800;color:#ef4444;margin:14px 0 10px;">💷 Overdue Invoices (${oi.length})</h3>`;oi.forEach(i=>{body+=finRow(i,"invoice");});}
  if(op.length){body+=`<h3 style="font-size:14px;font-weight:800;color:#ef4444;margin:14px 0 10px;">💸 Overdue Payments (${op.length})</h3>`;op.forEach(p=>{body+=finRow(p,"payment");});}
  await sendEmail({ to: ALL_EMAILS, subject: `📋 DS Hub Daily Summary — ${new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short"})}`,
    html: template({ title:"Daily Director Summary", bodyHtml: body }) });
}
