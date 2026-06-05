import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import { createClient } from "@supabase/supabase-js";

const _su = process.env.REACT_APP_SUPABASE_URL;
const _sk = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = (_su && _sk) ? createClient(_su, _sk) : null;
const isSupabaseReady = !!supabase;

const ICON_B64     = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBAUEBAYFBQUGBgYHCQ4JCQgICRINDQoOFRIWFhUSFBQXGiEcFxgfGRQUHScdHyIjJSUlFhwpLCgkKyEkJST/2wBDAQYGBgkICREJCREkGBQYJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCT/wAARCABIAEgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDKeq71Yeq70AQNSIMmlekU4NAFyBa0YEFZsD1oQSCmBpQxA1O0C4qrDOB3qVroY60AVLuIAGimXVwCDzRQBnPVd6sPVd6QCQ2V1elha2s85X7wijLY+uKf/Yerg/8AILv/APwHf/Cu2+FTtF/bTqcMsKMPqN9Yh+KficAH7TbdP+fcVyOtVdSUIJaW3fc6lSpqEZTb1uZEej6sP+YXf/8AgO/+FWo9M1Uf8wy+/wDAd/8ACrR+K3igf8vNt/4Dimn4s+JwCftNt0/59xVc2I/lX3v/ACJ5aHd/d/wSCYXVltFzbzQFvu+ahXP0zULX3HWun+Lt0wGiOx+Z4HY/U7K84e9461ph6rq01NrcivT9nNwRq3F7nPNFYE17nPNFbGJ1DioJBVp1qF1rPmNOU7D4Vur3Wq2mQHmt1K/gSD/6EK88uIXt5HhkUrJGxRgexBwa2dI1W40LU4dQtsF4jyp6Op6qfqK7DUvD2i/EEnUtFvo7TUXGZreX+I+pA5B/2hkGuR1PY1XOXwytr2aOpQ9rTUI7q/zueWPUSxSXMqQRKWklYRqo6kk4A/Wu5f4SeJjJsCWW3P3/AD+P5ZrW0/w9oPw2I1bXr+K81NATBaw/wt6gHkn/AGjgCtJYynb3Hd9kZxws7++rLuzP+NUyxXejWQYGSC1Ytj3IA/8AQTXmLyH1rV8Sa5c+I9XuNTu8B5Twg6RqOAo9gP61jPWuGpunSUHuZ4ioqlRyRFJIaKY9FbGJ6OwqF1qw1ROK4uY7FEqSLVZ8qwZSQw6EHBFXJBVWUVpFkSQ2XWdTCbBqV9s/u/aHx/OsiYlmLMSWPUk5Jq7LVKTqa2gktjGTb3K0neq71Ykqu9WSV3ooeigR6SxqFzRRXE0dlyvIaqymiitIoiTKcpqnJ1ooreJgytJ3qu9FFUSV3ooooA//2Q==";
const WORDMARK_B64 = "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";

const DIR_EMAILS = {
  "Shameek Popat":     process.env.REACT_APP_EMAIL_SHAMEEK || "",
  "Andrew Chandrapal": process.env.REACT_APP_EMAIL_ANDREW  || "",
  "Nishan Dixit":      process.env.REACT_APP_EMAIL_NISHAN  || "",
  "Ani Sapra":         process.env.REACT_APP_EMAIL_ANI     || "",
};
const allEmails = () => Object.values(DIR_EMAILS).filter(Boolean);

async function sendEmail(to, subject, body) {
  const toArr = Array.isArray(to) ? to : [to];
  if (!toArr.length) return;
  const wm = WORDMARK_B64;
  const html = `<!DOCTYPE html><html><body style="margin:0;background:#f4f4f4;font-family:Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="padding:28px 0;"><tr><td align="center"><table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;"><tr><td style="background:#1C1C1C;padding:18px 24px;"><img src="data:image/jpeg;base64,${wm}" alt="DS" style="height:26px;filter:brightness(0) invert(1);"/><div style="font-size:9px;color:#888;letter-spacing:2px;margin-top:3px;">DIRECTOR HUB</div></td></tr><tr><td style="height:3px;background:linear-gradient(90deg,#F5A97F,#C8784A,transparent);"></td></tr><tr><td style="padding:20px 24px;">${body}</td></tr><tr><td style="padding:0 24px 20px;"><a href="${process.env.REACT_APP_HUB_URL||'#'}" style="display:inline-block;background:#F5A97F;color:#111;font-weight:700;font-size:13px;padding:10px 20px;border-radius:8px;text-decoration:none;">Open Director Hub →</a></td></tr><tr><td style="background:#f9f9f9;padding:12px 24px;border-top:1px solid #eee;"><p style="margin:0;font-size:10px;color:#aaa;">Automated — Disruptive Smiles Director Hub</p></td></tr></table></td></tr></table></body></html>`;
  try {
    await fetch("/.netlify/functions/send-email", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ to: toArr, subject, html }),
    });
  } catch(e) { console.warn("Email error:", e.message); }
}

const PC = {High:"#ef4444",Medium:"#f59e0b",Low:"#10b981"};
const pill = (t,c) => `<span style="display:inline-block;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700;background:${c}22;color:${c};">${t}</span>`;
const tRow = t => `<div style="background:#f8f8f8;border-radius:8px;padding:11px 13px;margin-bottom:9px;border-left:4px solid #F5A97F;"><div style="font-size:14px;font-weight:700;color:#1c1c1c;margin-bottom:3px;">${t.title}</div><div style="font-size:11px;color:#666;margin-bottom:5px;">${t.category||""} · Due ${t.due||"No date"}</div>${pill(t.priority||"",PC[t.priority]||"#888")} ${pill(t.status||"",{"To Do":"#64748b","In Progress":"#f59e0b",Review:"#8b5cf6",Done:"#10b981"}[t.status]||"#888")}</div>`;
const fRow = i => `<div style="background:#f8f8f8;border-radius:8px;padding:11px 13px;margin-bottom:9px;border-left:4px solid #ef4444;"><div style="font-size:14px;font-weight:700;">${i.client||i.payee||""}</div><div style="font-size:11px;color:#666;">${i.description||""} · Due ${i.due||""}</div><div style="font-size:16px;font-weight:800;color:#ef4444;">£${Number(i.amount||0).toLocaleString("en-GB",{minimumFractionDigits:2})}</div></div>`;

const Notify = {
  assigned:  async (t,by="A director") => { const to=DIR_EMAILS[t.assignee]; if(!to)return; await sendEmail(to,`📋 New task: ${t.title}`,`<p style="font-size:14px;color:#444;margin:0 0 12px;">Hi <strong>${t.assignee.split(" ")[0]}</strong>, <strong>${by}</strong> assigned you:</p>${tRow(t)}`); },
  status:    async (t,old,by="A director") => { if(!allEmails().length)return; await sendEmail(allEmails(),`🔄 ${t.title} → ${t.status}`,`<p style="font-size:14px;color:#444;margin:0 0 12px;"><strong>${by}</strong> moved <strong>${old}</strong> → <strong>${t.status}</strong>:</p>${tRow(t)}`); },
  done:      async (t,by="A director") => { if(!allEmails().length)return; await sendEmail(allEmails(),`✅ Done: ${t.title}`,`<p style="font-size:14px;color:#444;margin:0 0 12px;"><strong>${by}</strong> completed:</p>${tRow(t)}`); },
  comment:   async (t,c) => { const to=DIR_EMAILS[t.assignee]; if(!to||c.author===t.assignee)return; await sendEmail(to,`💬 Update on: ${t.title}`,`<p style="font-size:14px;color:#444;margin:0 0 10px;"><strong>${c.author}</strong> posted:</p><blockquote style="margin:0 0 10px;padding:9px 12px;background:#f0f0f0;border-left:4px solid #F5A97F;border-radius:4px;">"${c.text}"</blockquote>${tRow(t)}`); },
  tOverdue:  async t => { const to=DIR_EMAILS[t.assignee]; if(!to)return; await sendEmail(to,`🔴 OVERDUE: ${t.title}`,`<p style="font-size:14px;color:#444;margin:0 0 8px;">Hi <strong>${t.assignee.split(" ")[0]}</strong>, overdue since <strong>${t.due}</strong>:</p>${tRow(t)}`); },
  iOverdue:  async i => { if(!allEmails().length)return; await sendEmail(allEmails(),`🔴 OVERDUE INVOICE: ${i.client}`,`<p style="font-size:14px;color:#444;margin:0 0 10px;">Invoice overdue. Managed by <strong>${i.assignee}</strong>:</p>${fRow(i)}`); },
  pOverdue:  async p => { const to=DIR_EMAILS[p.assignee]; if(!to)return; await sendEmail(to,`⚠️ OVERDUE PAYMENT: ${p.payee}`,`<p style="font-size:14px;color:#444;margin:0 0 10px;">Hi <strong>${p.assignee.split(" ")[0]}</strong>, payment overdue:</p>${fRow(p)}`); },
  iPaid:     async (i,by="A director") => { if(!allEmails().length)return; await sendEmail(allEmails(),`💚 Invoice paid: ${i.client}`,`<p style="font-size:14px;color:#444;margin:0 0 10px;"><strong>${by}</strong> marked as paid:</p>${fRow(i)}`); },
  digest:    async (tasks,invoices,payments) => {
    if(!allEmails().length) return;
    const td=new Date().toISOString().slice(0,10);
    const in3=new Date(Date.now()+3*86400000).toISOString().slice(0,10);
    const ot=tasks.filter(t=>t.due&&t.due<td&&t.status!=="Done");
    const dt=tasks.filter(t=>t.due&&t.due>=td&&t.due<=in3&&t.status!=="Done");
    const oi=invoices.filter(i=>i.status==="Overdue");
    const op=payments.filter(p=>p.status==="Overdue");
    if(!ot.length&&!dt.length&&!oi.length&&!op.length) return;
    let b=`<p style="font-size:14px;color:#444;margin:0 0 14px;">Daily summary for <strong>${new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})}</strong>.</p>`;
    if(ot.length){b+=`<h3 style="font-size:13px;color:#ef4444;margin:0 0 8px;">🔴 Overdue Tasks (${ot.length})</h3>`;ot.forEach(t=>{b+=tRow(t);});}
    if(dt.length){b+=`<h3 style="font-size:13px;color:#f59e0b;margin:12px 0 8px;">⚠️ Due in 3 Days (${dt.length})</h3>`;dt.forEach(t=>{b+=tRow(t);});}
    if(oi.length){b+=`<h3 style="font-size:13px;color:#ef4444;margin:12px 0 8px;">💷 Overdue Invoices (${oi.length})</h3>`;oi.forEach(i=>{b+=fRow(i);});}
    if(op.length){b+=`<h3 style="font-size:13px;color:#ef4444;margin:12px 0 8px;">💸 Overdue Payments (${op.length})</h3>`;op.forEach(p=>{b+=fRow(p);});}
    await sendEmail(allEmails(),`📋 DS Hub Daily Summary — ${new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short"})}`,b);
  },
};

function useData(table, seed) {
  const lsKey = `ds_${table}`;
  const [data, setData] = useState(() => {
    if (isSupabaseReady) return seed;
    try { const s=localStorage.getItem(lsKey); return s?JSON.parse(s):seed; } catch { return seed; }
  });
  useEffect(() => {
    if (!isSupabaseReady) return;
    supabase.from(table).select("*").then(({data:rows,error}) => {
      if (!error && rows) {
        if (rows.length>0) setData(rows.map(r=>({...r.payload,id:r.id})));
        else { supabase.from(table).insert(seed.map(i=>({id:i.id,payload:i}))).then(); setData(seed); }
      }
    });
  }, []); // eslint-disable-line
  useEffect(() => {
    if (!isSupabaseReady) return;
    const ch = supabase.channel(`rt_${table}`)
      .on("postgres_changes",{event:"*",schema:"public",table},p=>{
        setData(prev=>{
          if(p.eventType==="INSERT"){ const i={...p.new.payload,id:p.new.id}; return prev.find(x=>x.id===i.id)?prev:[...prev,i]; }
          if(p.eventType==="UPDATE") return prev.map(x=>x.id===p.new.id?{...p.new.payload,id:p.new.id}:x);
          if(p.eventType==="DELETE") return prev.filter(x=>x.id!==p.old.id);
          return prev;
        });
      }).subscribe();
    return ()=>supabase.removeChannel(ch);
  }, [table]);
  useEffect(() => {
    if (!isSupabaseReady) { try{localStorage.setItem(lsKey,JSON.stringify(data));}catch{} }
  }, [data,lsKey]);
  const upsert = useCallback(async item => {
    setData(prev=>prev.find(x=>x.id===item.id)?prev.map(x=>x.id===item.id?item:x):[...prev,item]);
    if (isSupabaseReady) await supabase.from(table).upsert({id:item.id,payload:item});
  }, [table]);
  const remove = useCallback(async id => {
    setData(prev=>prev.filter(x=>x.id!==id));
    if (isSupabaseReady) await supabase.from(table).delete().eq("id",id);
  }, [table]);
  return { data, upsert, remove };
}


// ── Brand ──────────────────────────────────────────────────────────────
const B = { gold:"#F5A97F", goldDark:"#C8784A", bg:"#141414", surface:"#1c1c1c", surface2:"#242424", border:"#2e2e2e", border2:"#383838", text:"#e8e8e8", muted:"#666", muted2:"#444" };
const DIRECTOR_COLORS = { "Shameek Popat":"#F5A97F","Andrew Chandrapal":"#a78bfa","Nishan Dixit":"#34d399","Ani Sapra":"#C8784A" };
const STATUS_COLORS   = { "To Do":"#64748b","In Progress":"#f59e0b","Review":"#8b5cf6","Done":"#10b981" };
const PRIORITY_COLORS = { High:"#ef4444",Medium:"#f59e0b",Low:"#10b981" };
const INV_COLORS      = { Draft:"#64748b",Sent:B.gold,Overdue:"#ef4444",Paid:"#10b981" };
const PAY_COLORS      = { Pending:"#64748b","Due Soon":"#f59e0b",Overdue:"#ef4444",Paid:"#10b981" };

const DIRECTORS      = ["Shameek Popat","Andrew Chandrapal","Nishan Dixit","Ani Sapra"];
const CATEGORIES     = ["Distribution","Composite Artistry","Courses & Training","Conference","Marketing","Operations"];
const PRIORITIES     = ["High","Medium","Low"];
const STATUS_OPTIONS = ["To Do","In Progress","Review","Done"];
const INV_STATUSES   = ["Draft","Sent","Overdue","Paid"];
const PAY_STATUSES   = ["Pending","Due Soon","Overdue","Paid"];
const PAY_CATS       = ["Stock","Conference","Marketing","Training","Operations","Other"];
const RECUR_OPTIONS  = ["None","Daily","Weekly","Monthly"];

// ── Helpers ────────────────────────────────────────────────────────────
const fmt   = n => `£${Number(n).toLocaleString("en-GB",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const initials = n => n.split(" ").map(w=>w[0]).join("").slice(0,2);
const today = () => new Date().toISOString().slice(0,10);
const isOverdue = due => due && due < today();
const uid   = () => Date.now().toString(36) + Math.random().toString(36).slice(2,6);

// ── Local Storage ──────────────────────────────────────────────────────
const SEED_TASKS = [
  {id:"t1",title:"Restock Inspiro Composite A2 shade",category:"Distribution",assignee:"Andrew Chandrapal",priority:"High",status:"In Progress",due:"2026-05-15",notes:"Check supplier lead times",progress:30,subtasks:[{id:"s1",title:"Email supplier",done:true},{id:"s2",title:"Confirm lead time",done:false}],blockedBy:[],comments:[{id:"c1",author:"Shameek Popat",text:"Urgent — running low on A2.",time:"2026-05-01 09:14"}],recur:"None"},
  {id:"t2",title:"Prepare Q3 Composite Artistry Course curriculum",category:"Courses & Training",assignee:"Shameek Popat",priority:"High",status:"To Do",due:"2026-05-20",notes:"Include new layering techniques",progress:0,subtasks:[{id:"s3",title:"Draft module outline",done:false},{id:"s4",title:"Review with Nishan",done:false}],blockedBy:[],comments:[],recur:"None"},
  {id:"t3",title:"Confirm venue for Annual Symposium 2026",category:"Conference",assignee:"Nishan Dixit",priority:"High",status:"In Progress",due:"2026-06-01",notes:"Need capacity for 150 delegates",progress:50,subtasks:[],blockedBy:[],comments:[{id:"c2",author:"Ani Sapra",text:"Hilton Manchester available — awaiting quote.",time:"2026-05-02 11:30"}],recur:"None"},
  {id:"t4",title:"Update website with new course dates",category:"Marketing",assignee:"Ani Sapra",priority:"Medium",status:"To Do",due:"2026-05-12",notes:"",progress:0,subtasks:[],blockedBy:["t2"],comments:[],recur:"None"},
  {id:"t5",title:"Follow up with 3 new dental practice accounts",category:"Distribution",assignee:"Andrew Chandrapal",priority:"Medium",status:"Review",due:"2026-05-10",notes:"",progress:80,subtasks:[],blockedBy:[],comments:[],recur:"Weekly"},
  {id:"t6",title:"Film composite artistry demo reel",category:"Courses & Training",assignee:"Shameek Popat",priority:"Medium",status:"To Do",due:"2026-05-25",notes:"Use clinical case from last week",progress:0,subtasks:[{id:"s5",title:"Book studio time",done:false},{id:"s6",title:"Prepare clinical case notes",done:false},{id:"s7",title:"Edit & upload",done:false}],blockedBy:[],comments:[],recur:"None"},
];
const SEED_CONF = [
  {id:"cf1",title:"Book keynote speaker",assignee:"Shameek Popat",due:"2026-06-15",done:false},
  {id:"cf2",title:"Send save-the-date emails",assignee:"Ani Sapra",due:"2026-06-01",done:true},
  {id:"cf3",title:"Arrange catering quote",assignee:"Nishan Dixit",due:"2026-06-20",done:false},
  {id:"cf4",title:"Design delegate badges & materials",assignee:"Ani Sapra",due:"2026-07-01",done:false},
  {id:"cf5",title:"Confirm AV equipment",assignee:"Andrew Chandrapal",due:"2026-06-25",done:false},
];
const SEED_INV = [
  {id:"INV-001",client:"Bupa Dental, Manchester",description:"Inspiro Composite Starter Kit x10",amount:2400,issued:"2026-04-15",due:"2026-05-01",status:"Overdue",assignee:"Andrew Chandrapal"},
  {id:"INV-002",client:"Portman Dental Care",description:"Composite Artistry Course – April cohort",amount:3500,issued:"2026-04-20",due:"2026-05-20",status:"Sent",assignee:"Shameek Popat"},
  {id:"INV-003",client:"Rodericks Dental",description:"Inspiro A1/A2/A3 Shade Bundle x5",amount:1200,issued:"2026-05-01",due:"2026-05-31",status:"Draft",assignee:"Nishan Dixit"},
  {id:"INV-004",client:"Smile Cliniq London",description:"Advanced Composite Artistry Masterclass",amount:4800,issued:"2026-03-10",due:"2026-04-10",status:"Paid",assignee:"Shameek Popat"},
  {id:"INV-005",client:"The Dental Suite Leicester",description:"Inspiro Full Shade Kit + Training Day",amount:5200,issued:"2026-04-28",due:"2026-05-28",status:"Sent",assignee:"Ani Sapra"},
];
const SEED_PAY = [
  {id:"PAY-001",payee:"Inspiro UK Supplier",description:"Q2 Composite Stock Order",amount:8400,due:"2026-05-01",status:"Overdue",assignee:"Andrew Chandrapal",category:"Stock"},
  {id:"PAY-002",payee:"Hilton Hotels UK",description:"Annual Symposium venue deposit",amount:3200,due:"2026-05-20",status:"Due Soon",assignee:"Nishan Dixit",category:"Conference"},
  {id:"PAY-003",payee:"Digital Agency",description:"Website refresh & course landing pages",amount:1800,due:"2026-06-01",status:"Pending",assignee:"Ani Sapra",category:"Marketing"},
  {id:"PAY-004",payee:"CPD Certification Service",description:"Course accreditation renewal",amount:650,due:"2026-04-30",status:"Paid",assignee:"Shameek Popat",category:"Operations"},
  {id:"PAY-005",payee:"AV Equipment Hire Ltd",description:"Symposium AV & lighting",amount:2100,due:"2026-06-25",status:"Pending",assignee:"Andrew Chandrapal",category:"Conference"},
];

// useData hook defined above (with Supabase support)

// ── Sub-components ─────────────────────────────────────────────────────
const Av = ({name,size=28}) => (
  <div style={{width:size,height:size,borderRadius:"50%",background:DIRECTOR_COLORS[name]+"22",color:DIRECTOR_COLORS[name],display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.35,fontWeight:800,flexShrink:0,letterSpacing:".5px"}}>
    {initials(name)}
  </div>
);
const Bdg = ({label,color,bg})=>(
  <span style={{display:"inline-block",padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:700,background:bg||(color+"22"),color,whiteSpace:"nowrap"}}>{label}</span>
);
const ProgressBar = ({pct,color=B.gold})=>(
  <div style={{height:5,background:B.border2,borderRadius:3,overflow:"hidden"}}>
    <div style={{height:"100%",width:`${pct}%`,background:color,borderRadius:3,transition:"width .4s"}}/>
  </div>
);

// ── MAIN APP ───────────────────────────────────────────────────────────
// ── Standalone components (defined outside App to prevent focus loss on re-render) ──
const Modal = memo(({title, onClose, children, footer}) => (
  <div className="ov" onClick={onClose}>
    <div className="mod" onClick={e=>e.stopPropagation()}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,color:"#fff"}}>{title}</h2>
        <button className="btn bg" style={{padding:"4px 10px",fontSize:18}} onClick={onClose}>×</button>
      </div>
      <div style={{display:"grid",gap:13}}>{children}</div>
      {footer&&<div style={{display:"flex",gap:9,marginTop:18}}>{footer}</div>}
    </div>
  </div>
));
const G2 = memo(({children}) => <div className="form-g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>{children}</div>);
const F  = memo(({label:l, children}) => <div><label>{l}</label>{children}</div>);

export default function App() {
  const {data:tasks,    upsert:upsertTask, remove:removeTask}  = useData("ds_tasks",    SEED_TASKS);
  const {data:conf,     upsert:upsertConf, remove:removeConf}  = useData("ds_conf",     SEED_CONF);
  const {data:invoices, upsert:upsertInv,  remove:removeInv}   = useData("ds_invoices", SEED_INV);
  const {data:payments, upsert:upsertPay,  remove:removePay}   = useData("ds_payments", SEED_PAY);

  const [view,        setView]        = useState("dashboard");
  const [finTab,      setFinTab]      = useState("invoices");
  const [fAssignee,   setFAssignee]   = useState("All");
  const [fStatus,     setFStatus]     = useState("All");
  const [fCategory,   setFCategory]   = useState("All");
  const [search,      setSearch]      = useState("");
  const [searchOpen,  setSearchOpen]  = useState(false);

  const [showTask,    setShowTask]    = useState(false);
  const [showConf,    setShowConf]    = useState(false);
  const [showInv,     setShowInv]     = useState(false);
  const [showPay,     setShowPay]     = useState(false);
  const [detailTask,  setDetailTask]  = useState(null);
  const [editInv,     setEditInv]     = useState(null);
  const [editPay,     setEditPay]     = useState(null);

  const emptyTask = {id:"",title:"",category:CATEGORIES[0],assignee:DIRECTORS[0],priority:"Medium",status:"To Do",due:"",notes:"",progress:0,subtasks:[],blockedBy:[],comments:[],recur:"None"};
  const emptyInv  = {client:"",description:"",amount:"",issued:"",due:"",status:"Draft",assignee:DIRECTORS[0]};
  const emptyPay  = {payee:"",description:"",amount:"",due:"",status:"Pending",assignee:DIRECTORS[0],category:"Stock"};
  const emptyConf = {title:"",assignee:DIRECTORS[0],due:""};
  const [newTask, setNewTask] = useState(emptyTask);
  const [newConf, setNewConf] = useState(emptyConf);
  const [newInv,  setNewInv]  = useState(emptyInv);
  const [newPay,  setNewPay]  = useState(emptyPay);

  // Auto-flag overdue
  useEffect(()=>{
    invoices.forEach(i=>{ if(i.status==="Sent"&&isOverdue(i.due)){upsertInv({...i,status:"Overdue"});Notify.iOverdue(i);} });
    payments.forEach(p=>{ if((p.status==="Pending"||p.status==="Due Soon")&&isOverdue(p.due)){upsertPay({...p,status:"Overdue"});Notify.pOverdue(p);} });
    tasks.forEach(t=>{ if(isOverdue(t.due)&&t.status!=="Done") Notify.tOverdue(t); });
    const ld=localStorage.getItem("ds_last_digest"),td=today();
    if(ld!==td){Notify.digest(tasks,invoices,payments);localStorage.setItem("ds_last_digest",td);}
  },[]);// eslint-disable-line

  // Derived
  const filteredTasks = useMemo(()=>tasks.filter(t=>{
    if(fAssignee!=="All"&&t.assignee!==fAssignee) return false;
    if(fStatus!=="All"&&t.status!==fStatus) return false;
    if(fCategory!=="All"&&t.category!==fCategory) return false;
    return true;
  }),[tasks,fAssignee,fStatus,fCategory]);

  const searchResults = useMemo(()=>{
    if(!search.trim()) return [];
    const q=search.toLowerCase();
    const tRes=tasks.filter(t=>t.title.toLowerCase().includes(q)||t.assignee.toLowerCase().includes(q)||t.category.toLowerCase().includes(q)).map(r=>({...r,_type:"task"}));
    const iRes=invoices.filter(i=>i.client.toLowerCase().includes(q)||i.description.toLowerCase().includes(q)).map(r=>({...r,_type:"invoice"}));
    const pRes=payments.filter(p=>p.payee.toLowerCase().includes(q)||p.description.toLowerCase().includes(q)).map(r=>({...r,_type:"payment"}));
    return [...tRes,...iRes,...pRes].slice(0,12);
  },[search,tasks,invoices,payments]);

  const tasksByStatus = STATUS_OPTIONS.reduce((a,s)=>{a[s]=tasks.filter(t=>t.status===s);return a},{});

  // Finance stats
  const invOutstanding = invoices.filter(i=>i.status!=="Paid").reduce((s,i)=>s+i.amount,0);
  const invPaid        = invoices.filter(i=>i.status==="Paid").reduce((s,i)=>s+i.amount,0);
  const invOverdue     = invoices.filter(i=>i.status==="Overdue").length;
  const payOwed        = payments.filter(p=>p.status!=="Paid").reduce((s,p)=>s+p.amount,0);
  const payOverdue     = payments.filter(p=>p.status==="Overdue").length;

  // Task actions
  const addTask = ()=>{
    if(!newTask.title.trim()) return;
    const t={...newTask,id:uid()};
    upsertTask(t); Notify.assigned(t,'Shameek Popat');
    setNewTask(emptyTask); setShowTask(false);
  };
  const saveDetailTask = (t)=>{ setTasks(p=>p.map(x=>x.id===t.id?t:x)); setDetailTask(t); };
  const deleteTask = id=>{ removeTask(id); if(detailTask?.id===id) setDetailTask(null); };

  // Conf actions
  const addConf = ()=>{ if(!newConf.title.trim()) return; upsertConf({...newConf,id:uid(),done:false}); setNewConf(emptyConf); setShowConf(false); };
  const toggleConf = id=>{ const ci=conf.find(c=>c.id===id); if(ci) upsertConf({...ci,done:!ci.done}); };

  // Invoice actions
  const addInv = ()=>{
    if(!newInv.client.trim()) return;
    const num=`INV-${String(invoices.length+1).padStart(3,"0")}`;
    upsertInv({...newInv,id:num,amount:parseFloat(newInv.amount)||0});
    setNewInv(emptyInv); setShowInv(false);
  };
  const saveInv = inv=>{ setInvoices(p=>p.map(i=>i.id===inv.id?{...inv,amount:parseFloat(inv.amount)||0}:i)); setEditInv(null); };
  const markInvPaid = inv=>saveInv({...inv,status:"Paid"});
  const deleteInv = id=>removeInv(id);

  // Payment actions
  const addPay = ()=>{
    if(!newPay.payee.trim()) return;
    const num=`PAY-${String(payments.length+1).padStart(3,"0")}`;
    upsertPay({...newPay,id:num,amount:parseFloat(newPay.amount)||0});
    setNewPay(emptyPay); setShowPay(false);
  };
  const savePay = pay=>{ setPayments(p=>p.map(x=>x.id===pay.id?{...pay,amount:parseFloat(pay.amount)||0}:x)); setEditPay(null); };
  const markPayPaid = pay=>savePay({...pay,status:"Paid"});
  const deletePay = id=>removePay(id);

  // CSV export
  const exportCSV = (type)=>{
    let rows,headers;
    if(type==="tasks"){
      headers=["ID","Title","Category","Assignee","Priority","Status","Due","Progress","Recurring"];
      rows=tasks.map(t=>[t.id,t.title,t.category,t.assignee,t.priority,t.status,t.due,t.progress+"%",t.recur]);
    } else {
      headers=["ID","Client/Payee","Description","Amount","Due","Status","Assignee"];
      rows=[...invoices.map(i=>[i.id,i.client,i.description,i.amount,i.due,i.status,i.assignee]),
            ...payments.map(p=>[p.id,p.payee,p.description,p.amount,p.due,p.status,p.assignee])];
    }
    const csv=[headers,...rows].map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
    const a=document.createElement("a"); a.href="data:text/csv;charset=utf-8,"+encodeURIComponent(csv);
    a.download=`ds_${type}_${today()}.csv`; a.click();
  };

  // ── Styles ─────────────────────────────────────────────────────────
  const css=`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:${B.bg};-webkit-tap-highlight-color:transparent;}
    ::-webkit-scrollbar{width:4px;height:4px;}
    ::-webkit-scrollbar-thumb{background:${B.gold}44;border-radius:4px;}
    .nb{background:none;border:none;cursor:pointer;padding:8px 13px;border-radius:7px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;transition:all .15s;color:${B.muted};white-space:nowrap;}
    .nb:hover{background:${B.surface2};color:${B.text};}.nb.act{background:${B.gold};color:#111;font-weight:700;}
    .btn{padding:8px 16px;border-radius:8px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;transition:all .15s;display:inline-flex;align-items:center;gap:6px;}
    .bp{background:${B.gold};color:#111;}.bp:hover{filter:brightness(1.1);}
    .bg{background:${B.surface2};color:${B.muted};}.bg:hover{background:${B.border};color:${B.text};}
    .bd{background:#3a1515;color:#ff9090;}.bs{background:#0f2e20;color:#6ee7b7;}
    .inp{background:${B.bg};border:1px solid ${B.border};border-radius:8px;padding:9px 12px;color:${B.text};font-family:'DM Sans',sans-serif;font-size:16px;width:100%;outline:none;transition:border .15s;-webkit-appearance:none;}
    .inp:focus{border-color:${B.gold}88;}
    .sel{background:${B.bg};border:1px solid ${B.border};border-radius:8px;padding:9px 12px;color:${B.text};font-family:'DM Sans',sans-serif;font-size:16px;cursor:pointer;outline:none;width:100%;-webkit-appearance:none;}
    .sel:focus{border-color:${B.gold}88;}
    .ov{position:fixed;inset:0;background:rgba(0,0,0,.85);display:flex;align-items:flex-end;justify-content:center;z-index:200;padding:0;}
    .mod{background:${B.surface};border:1px solid ${B.border};border-radius:20px 20px 0 0;padding:24px;width:100%;max-width:600px;max-height:92vh;overflow-y:auto;}
    .row{display:flex;align-items:center;gap:11px;padding:13px 15px;border-radius:10px;border:1px solid ${B.border};background:${B.surface};margin-bottom:7px;cursor:pointer;transition:all .15s;}
    .row:hover,.row:active{border-color:${B.gold}44;background:${B.surface2};}
    .kc{background:${B.surface};border:1px solid ${B.border};border-radius:12px;padding:14px;min-width:210px;flex:1;}
    .kk{background:${B.surface2};border:1px solid ${B.border};border-radius:9px;padding:13px;margin-bottom:9px;cursor:pointer;transition:border-color .15s;}
    .kk:hover,.kk:active{border-color:${B.gold}55;}
    .cr{display:flex;align-items:center;gap:11px;padding:12px 14px;border-radius:9px;border:1px solid ${B.border};background:${B.surface};margin-bottom:7px;}
    .card{background:${B.surface};border:1px solid ${B.border};border-radius:13px;padding:18px;}
    .sc{background:${B.surface};border:1px solid ${B.border};border-radius:13px;padding:14px 16px;flex:1;min-width:120px;}
    .tb{background:none;border:none;cursor:pointer;padding:7px 16px;border-radius:7px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:${B.muted};transition:all .15s;}
    .tb.act{background:${B.surface2};color:${B.text};}
    label{font-size:12px;color:${B.muted};font-weight:500;display:block;margin-bottom:4px;}
    .st{font-size:11px;font-weight:700;color:${B.muted};text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;}
    input[type=range]{width:100%;accent-color:${B.gold};}
    input[type=checkbox]{accent-color:${B.gold};width:18px;height:18px;cursor:pointer;flex-shrink:0;}
    .dp{position:fixed;top:64px;right:0;bottom:0;width:460px;background:${B.surface};border-left:1px solid ${B.border};z-index:150;overflow-y:auto;padding:22px;box-shadow:-8px 0 32px #0007;}
    .mob-nav{display:none;position:fixed;bottom:0;left:0;right:0;background:${B.surface};border-top:1px solid ${B.border};z-index:120;padding:0 4px;padding-bottom:env(safe-area-inset-bottom,0px);}
    .mnb{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px 2px 6px;background:none;border:none;cursor:pointer;color:${B.muted};font-family:'DM Sans',sans-serif;font-size:9px;font-weight:600;letter-spacing:.03em;gap:2px;-webkit-tap-highlight-color:transparent;min-height:56px;}
    .mnb.act{color:${B.gold};}
    .mnb .i{font-size:22px;line-height:1;}
    .desk-nav{display:flex;gap:2px;flex-wrap:wrap;justify-content:flex-end;}
    @media(max-width:768px){
      .mob-nav{display:flex;}
      .desk-nav{display:none;}
      .main-wrap{padding-bottom:72px !important;}
      .header-inner{gap:8px !important;}
      .header-search{max-width:140px !important;}
      .sync-txt{display:none;}
      .dp{top:0;width:100%;border-left:none;border-top:1px solid ${B.border};padding:16px 14px;z-index:300;}
      .grid-2{grid-template-columns:1fr !important;}
      .sc{min-width:calc(50% - 5px) !important;}
      .kanban-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;}
      .kc{min-width:78vw !important;scroll-snap-align:start;}
      .row{padding:14px 12px;min-height:58px;}
      .inp,.sel{font-size:16px;}
      .form-g2{grid-template-columns:1fr !important;}
      .fin-tabs{width:100%;}
      .tb{flex:1;text-align:center;padding:10px 4px;}
      .page-hdr{flex-wrap:wrap;gap:10px;}
    }
    @media(max-width:400px){
      .sc{min-width:calc(50% - 4px) !important;}
    }
  `;

  // Modal/G2/F defined outside App component (above) to prevent re-render focus loss
  const Field=({label:l,children})=><div><label>{l}</label>{children}</div>;

  // ── Task Detail Panel ─────────────────────────────────────────────
  const TaskDetail=()=>{
    const [t,setT]=useState(detailTask);
    const [commentText,setCommentText]=useState("");
    const [newSub,setNewSub]=useState("");
    useEffect(()=>setT(detailTask),[detailTask]);
    if(!t) return null;
    const save=(updated)=>{ setT(updated); saveDetailTask(updated); };
    const addComment=()=>{
      if(!commentText.trim()) return;
      const c={id:uid(),author:"Shameek Popat",text:commentText,time:new Date().toLocaleString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})};
      save({...t,comments:[...t.comments,c]});
      setCommentText("");
    };
    const addSub=()=>{
      if(!newSub.trim()) return;
      save({...t,subtasks:[...t.subtasks,{id:uid(),title:newSub,done:false}]});
      setNewSub("");
    };
    const toggleSub=id=>save({...t,subtasks:t.subtasks.map(s=>s.id===id?{...s,done:!s.done}:s)});
    const deleteSub=id=>save({...t,subtasks:t.subtasks.filter(s=>s.id!==id)});
    const blocked=t.blockedBy.map(id=>tasks.find(x=>x.id===id)).filter(Boolean);

    return(
      <div className="dp">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
          <div style={{flex:1,paddingRight:12}}>
            <input className="inp" style={{fontSize:16,fontWeight:700,background:"transparent",border:"none",borderBottom:`1px solid ${B.border}`,borderRadius:0,paddingLeft:0}} value={t.title} onChange={e=>setT({...t,title:e.target.value})} onBlur={()=>save(t)}/>
          </div>
          <button className="btn bg" style={{padding:"4px 10px",fontSize:18,flexShrink:0}} onClick={()=>setDetailTask(null)}>×</button>
        </div>

        {/* Status / Priority row */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
          <select className="sel" style={{width:"auto",fontSize:12,padding:"4px 8px"}} value={t.status} onChange={e=>save({...t,status:e.target.value})}>
            {STATUS_OPTIONS.map(s=><option key={s}>{s}</option>)}
          </select>
          <select className="sel" style={{width:"auto",fontSize:12,padding:"4px 8px"}} value={t.priority} onChange={e=>save({...t,priority:e.target.value})}>
            {PRIORITIES.map(p=><option key={p}>{p}</option>)}
          </select>
          <select className="sel" style={{width:"auto",fontSize:12,padding:"4px 8px"}} value={t.assignee} onChange={e=>save({...t,assignee:e.target.value})}>
            {DIRECTORS.map(d=><option key={d}>{d}</option>)}
          </select>
        </div>

        {/* Details grid */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          <div><label>Due Date</label><input type="date" className="inp" value={t.due} onChange={e=>save({...t,due:e.target.value})}/></div>
          <div><label>Recurring</label><select className="sel" value={t.recur} onChange={e=>save({...t,recur:e.target.value})}>{RECUR_OPTIONS.map(r=><option key={r}>{r}</option>)}</select></div>
          <div><label>Category</label><select className="sel" value={t.category} onChange={e=>save({...t,category:e.target.value})}>{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select></div>
          <div><label>Progress: {t.progress}%</label><input type="range" min="0" max="100" value={t.progress} onChange={e=>save({...t,progress:+e.target.value})}/></div>
        </div>
        <ProgressBar pct={t.progress}/>

        {/* Blocked by */}
        <div style={{marginTop:16,marginBottom:4}}>
          <div className="section-title">Blocked By</div>
          {blocked.length===0?<div style={{fontSize:12,color:B.muted}}>No blockers</div>:blocked.map(b=>(
            <div key={b.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",background:B.surface2,borderRadius:7,marginBottom:6}}>
              <span style={{fontSize:11,color:"#ef4444"}}>🔒</span>
              <span style={{fontSize:12,flex:1,color:B.text}}>{b.title}</span>
              <button style={{background:"none",border:"none",cursor:"pointer",color:B.muted,fontSize:14}} onClick={()=>save({...t,blockedBy:t.blockedBy.filter(id=>id!==b.id)})}>×</button>
            </div>
          ))}
          <select className="sel" style={{fontSize:12,marginTop:6}} value="" onChange={e=>{if(e.target.value&&!t.blockedBy.includes(e.target.value))save({...t,blockedBy:[...t.blockedBy,e.target.value]})}}>
            <option value="">+ Add blocker task…</option>
            {tasks.filter(x=>x.id!==t.id&&!t.blockedBy.includes(x.id)).map(x=><option key={x.id} value={x.id}>{x.title}</option>)}
          </select>
        </div>

        {/* Subtasks */}
        <div style={{marginTop:16}}>
          <div className="section-title">Subtasks ({t.subtasks.filter(s=>s.done).length}/{t.subtasks.length})</div>
          {t.subtasks.map(s=>(
            <div key={s.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
              <input type="checkbox" checked={s.done} onChange={()=>toggleSub(s.id)}/>
              <span style={{flex:1,fontSize:13,color:s.done?B.muted:B.text,textDecoration:s.done?"line-through":"none"}}>{s.title}</span>
              <button style={{background:"none",border:"none",cursor:"pointer",color:B.muted,fontSize:14}} onClick={()=>deleteSub(s.id)}>×</button>
            </div>
          ))}
          <div style={{display:"flex",gap:7,marginTop:6}}>
            <input className="inp" style={{fontSize:12}} value={newSub} onChange={e=>setNewSub(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addSub()} placeholder="Add subtask…"/>
            <button className="btn bp" style={{padding:"7px 12px",fontSize:12}} onClick={addSub}>+</button>
          </div>
        </div>

        {/* Notes */}
        <div style={{marginTop:16}}>
          <div className="section-title">Notes</div>
          <textarea className="inp" rows={3} value={t.notes} onChange={e=>setT({...t,notes:e.target.value})} onBlur={()=>save(t)} style={{resize:"vertical",lineHeight:1.5,fontSize:13}} placeholder="Add notes…"/>
        </div>

        {/* Activity log */}
        <div style={{marginTop:16}}>
          <div className="section-title">Activity</div>
          {t.comments.length===0&&<div style={{fontSize:12,color:B.muted,marginBottom:8}}>No updates yet.</div>}
          {t.comments.map(c=>(
            <div key={c.id} style={{padding:"10px 12px",background:B.surface2,borderRadius:8,marginBottom:8,borderLeft:`3px solid ${DIRECTOR_COLORS[c.author]||B.gold}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:12,fontWeight:700,color:DIRECTOR_COLORS[c.author]||B.gold}}>{c.author}</span>
                <span style={{fontSize:11,color:B.muted}}>{c.time}</span>
              </div>
              <p style={{fontSize:13,color:B.text,lineHeight:1.5}}>{c.text}</p>
            </div>
          ))}
          <div style={{display:"flex",gap:7,marginTop:8}}>
            <input className="inp" style={{fontSize:12}} value={commentText} onChange={e=>setCommentText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addComment()} placeholder="Add update…"/>
            <button className="btn bp" style={{padding:"7px 12px",fontSize:12,flexShrink:0}} onClick={addComment}>Post</button>
          </div>
        </div>

        {/* Delete */}
        <button className="btn bd" style={{width:"100%",marginTop:20,justifyContent:"center"}} onClick={()=>deleteTask(t.id)}>Delete Task</button>
      </div>
    );
  };

  // ── RENDER ────────────────────────────────────────────────────────
  return(
    <div style={{fontFamily:"'DM Sans','Segoe UI',sans-serif",background:B.bg,minHeight:"100vh",color:B.text}}>
      <style>{css}</style>

      {/* ── HEADER ── */}
      <div style={{background:B.surface,borderBottom:`1px solid ${B.border}`,padding:"0 20px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:1280,margin:"0 auto",display:"flex",alignItems:"center",gap:12,height:60}}>
          {/* Logo */}
          <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
            <img src={`data:image/jpeg;base64,${ICON_B64}`} alt="DS"
              style={{width:38,height:38,borderRadius:8,objectFit:"cover",border:`1px solid ${ B.gold}44`}}/>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <img src={`data:image/jpeg;base64,${WORDMARK_B64}`} alt="Disruptive Smiles"
                style={{height:26,width:"auto",objectFit:"contain",filter:"brightness(0) invert(1)"}}/>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,fontWeight:700,color:B.muted,letterSpacing:".14em",marginTop:2}}>DIRECTOR HUB</div>
            </div>
          </div>

          {/* Search */}
          <div style={{flex:1,maxWidth:320,position:"relative"}}>
            <input className="inp" style={{paddingLeft:32,fontSize:13}} placeholder="Search tasks, invoices, payments…" value={search} onChange={e=>{setSearch(e.target.value);setSearchOpen(true);}} onFocus={()=>setSearchOpen(true)} onBlur={()=>setTimeout(()=>setSearchOpen(false),200)}/>
            <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:B.muted,fontSize:14}}>🔍</span>
            {searchOpen&&search&&searchResults.length>0&&(
              <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,right:0,background:B.surface,border:`1px solid ${B.border}`,borderRadius:10,zIndex:300,overflow:"hidden",boxShadow:"0 8px 32px #0008"}}>
                {searchResults.map(r=>(
                  <div key={r.id} style={{padding:"10px 14px",cursor:"pointer",borderBottom:`1px solid ${B.border}`,display:"flex",alignItems:"center",gap:10}} onClick={()=>{if(r._type==="task"){setDetailTask(r);setView("tasks");}else setView("finance");setSearch("");setSearchOpen(false);}}>
                    <span style={{fontSize:11,color:B.muted,width:18}}>{r._type==="task"?"✅":r._type==="invoice"?"📤":"💸"}</span>
                    <div>
                      <div style={{fontSize:13,color:B.text}}>{r.title||r.client||r.payee}</div>
                      <div style={{fontSize:11,color:B.muted}}>{r._type} {r.status&&`· ${r.status}`}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nav */}
          <nav style={{display:"flex",gap:2,flexWrap:"wrap"}}>
            {[["dashboard","📊"],["tasks","✅ Tasks"],["kanban","📋 Board"],["workload","👥 Workload"],["conference","🎤 Conference"],["finance","💷 Finance"]].map(([v,l])=>(
              <button key={v} className={`nb ${view===v?"act":""}`} onClick={()=>setView(v)}>{l==="📊"?<span style={{fontSize:16}}>📊</span>:l}</button>
            ))}
          </nav>
        </div>
      </div>
      <div style={{height:2,background:`linear-gradient(90deg,${B.gold},${B.goldDark},transparent)`}}/>

      {/* ── CONTENT ── */}
      <div className="main-wrap" style={{maxWidth:1280,margin:"0 auto",padding:"24px 20px",paddingRight:detailTask?"500px":"20px",transition:"padding-right .3s"}}>

        {/* ─ DASHBOARD ─ */}
        {view==="dashboard"&&<>
          <div style={{marginBottom:24}}>
            <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"#fff"}}>Welcome back, <span style={{color:B.gold}}>Shameek</span> 👋</h1>
            <p style={{color:B.muted,fontSize:13,marginTop:3}}>Disruptive Smiles · {new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</p>
          </div>

          <div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"}}>
            {[
              {label:"Total Tasks",value:tasks.length,color:B.gold},
              {label:"In Progress",value:tasks.filter(t=>t.status==="In Progress").length,color:"#f59e0b"},
              {label:"Overdue Tasks",value:tasks.filter(t=>isOverdue(t.due)&&t.status!=="Done").length,color:"#ef4444"},
              {label:"Revenue In",value:fmt(invPaid),color:"#10b981",sm:true},
              {label:"Outstanding",value:fmt(invOutstanding),color:"#f59e0b",sm:true},
              {label:"Payments Due",value:fmt(payOwed),color:"#ef4444",sm:true},
            ].map(s=>(
              <div key={s.label} className="sc">
                <div style={{fontSize:s.sm?17:26,fontWeight:800,color:s.color,fontFamily:"'Syne',sans-serif"}}>{s.value}</div>
                <div style={{fontSize:11,color:B.muted,marginTop:2}}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
            <div className="card">
              <div className="section-title">Director Workload</div>
              {DIRECTORS.map(d=>{
                const cnt=tasks.filter(t=>t.assignee===d).length;
                const done=tasks.filter(t=>t.assignee===d&&t.status==="Done").length;
                return(
                  <div key={d} style={{marginBottom:13}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}><Av name={d}/><span style={{fontSize:13}}>{d}</span></div>
                      <span style={{fontSize:12,color:B.muted}}>{done}/{cnt} done</span>
                    </div>
                    <ProgressBar pct={cnt?Math.round(done/cnt*100):0} color={DIRECTOR_COLORS[d]}/>
                  </div>
                );
              })}
            </div>
            <div className="card">
              <div className="section-title">💷 Finance Snapshot</div>
              {[
                {label:"Revenue collected",value:fmt(invPaid),color:"#10b981"},
                {label:"Awaiting payment",value:fmt(invOutstanding),color:"#f59e0b"},
                {label:"Overdue invoices",value:`${invOverdue} invoice${invOverdue!==1?"s":""}`,color:"#ef4444"},
                {label:"Payments to make",value:fmt(payOwed),color:"#f43f5e"},
                {label:"Payments overdue",value:`${payOverdue} payment${payOverdue!==1?"s":""}`,color:"#ef4444"},
              ].map(r=>(
                <div key={r.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:9,marginBottom:9,borderBottom:`1px solid ${B.border}`}}>
                  <span style={{fontSize:13,color:B.muted}}>{r.label}</span>
                  <span style={{fontSize:13,fontWeight:700,color:r.color}}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div className="card">
              <div className="section-title">🔴 Urgent & Overdue Tasks</div>
              {tasks.filter(t=>(t.priority==="High"||isOverdue(t.due))&&t.status!=="Done").slice(0,5).map(t=>(
                <div key={t.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,cursor:"pointer"}} onClick={()=>{setDetailTask(t);setView("tasks");}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:isOverdue(t.due)?"#ef4444":"#f59e0b",flexShrink:0}}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,color:B.text}}>{t.title}</div>
                    <div style={{fontSize:11,color:B.muted}}>{t.assignee}{t.due&&` · Due ${t.due}`}{isOverdue(t.due)&&t.status!=="Done"&&<span style={{color:"#ef4444"}}> · OVERDUE</span>}</div>
                  </div>
                  <Bdg label={t.status} color={STATUS_COLORS[t.status]}/>
                </div>
              ))}
            </div>
            <div className="card">
              <div className="section-title">🎤 Conference Progress</div>
              <div style={{marginBottom:14}}>
                <ProgressBar pct={Math.round(conf.filter(c=>c.done).length/conf.length*100)} color={B.gold}/>
                <div style={{fontSize:12,color:B.muted,marginTop:6}}>{conf.filter(c=>c.done).length} of {conf.length} items complete</div>
              </div>
              {conf.filter(c=>!c.done).slice(0,4).map(c=>(
                <div key={c.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <input type="checkbox" checked={c.done} onChange={()=>toggleConf(c.id)}/>
                  <div style={{flex:1}}><div style={{fontSize:13}}>{c.title}</div><div style={{fontSize:11,color:B.muted}}>{c.assignee}{c.due&&` · ${c.due}`}</div></div>
                </div>
              ))}
            </div>
          </div>
        </>}

        {/* ─ TASKS ─ */}
        {view==="tasks"&&<>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10}}>
            <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:"#fff"}}>All Tasks</h1>
            <div style={{display:"flex",gap:8}}>
              <button className="btn bg" onClick={()=>exportCSV("tasks")}>↓ CSV</button>
              <button className="btn bp" onClick={()=>setShowTask(true)}>+ New Task</button>
            </div>
          </div>
          <div style={{display:"flex",gap:9,marginBottom:16,flexWrap:"wrap"}}>
            {[["fAssignee",["All",...DIRECTORS]],["fStatus",["All",...STATUS_OPTIONS]],["fCategory",["All",...CATEGORIES]]].map(([k,opts])=>(
              <select key={k} className="sel" style={{width:"auto"}} value={k==="fAssignee"?fAssignee:k==="fStatus"?fStatus:fCategory}
                onChange={e=>{k==="fAssignee"?setFAssignee(e.target.value):k==="fStatus"?setFStatus(e.target.value):setFCategory(e.target.value);}}>
                {opts.map(o=><option key={o}>{o}</option>)}
              </select>
            ))}
          </div>
          {filteredTasks.map(t=>(
            <div key={t.id} className="row" onClick={()=>setDetailTask(t)} style={{borderColor:isOverdue(t.due)&&t.status!=="Done"?"#ef444433":undefined}}>
              <Av name={t.assignee}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:500,color:B.text,display:"flex",alignItems:"center",gap:7}}>
                  {t.title}
                  {t.recur!=="None"&&<span style={{fontSize:10,color:B.gold}}>↻ {t.recur}</span>}
                  {t.blockedBy.length>0&&<span style={{fontSize:10,color:"#ef4444"}}>🔒 Blocked</span>}
                </div>
                <div style={{fontSize:11,color:B.muted,marginTop:2}}>{t.category} · {t.assignee}{t.due&&` · Due ${t.due}`}{isOverdue(t.due)&&t.status!=="Done"&&<span style={{color:"#ef4444"}}> · OVERDUE</span>}</div>
                {t.subtasks.length>0&&<div style={{marginTop:5}}><ProgressBar pct={Math.round(t.subtasks.filter(s=>s.done).length/t.subtasks.length*100)}/><span style={{fontSize:10,color:B.muted}}>{t.subtasks.filter(s=>s.done).length}/{t.subtasks.length} subtasks</span></div>}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:7,flexShrink:0}}>
                <Bdg label={t.priority} color={PRIORITY_COLORS[t.priority]}/>
                <Bdg label={t.status} color={STATUS_COLORS[t.status]}/>
                {t.progress>0&&<span style={{fontSize:11,color:B.muted}}>{t.progress}%</span>}
              </div>
            </div>
          ))}
          {filteredTasks.length===0&&<div style={{color:B.muted,padding:24,textAlign:"center",fontSize:13}}>No tasks match your filters.</div>}
        </>}

        {/* ─ KANBAN ─ */}
        {view==="kanban"&&<>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
            <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:"#fff"}}>Task Board</h1>
            <button className="btn bp" onClick={()=>setShowTask(true)}>+ New Task</button>
          </div>
          <div style={{display:"flex",gap:14,overflowX:"auto",paddingBottom:12}}>
            {STATUS_OPTIONS.map(status=>(
              <div key={status} className="kc">
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:12}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:STATUS_COLORS[status]}}/>
                  <span style={{fontSize:11,fontWeight:700,color:B.muted,textTransform:"uppercase",letterSpacing:".07em"}}>{status}</span>
                  <span style={{marginLeft:"auto",background:B.surface2,borderRadius:20,padding:"1px 8px",fontSize:11,color:B.muted}}>{tasksByStatus[status].length}</span>
                </div>
                {tasksByStatus[status].map(t=>(
                  <div key={t.id} className="kk" onClick={()=>setDetailTask(t)}>
                    <div style={{fontSize:13,fontWeight:500,color:B.text,marginBottom:9,lineHeight:1.4}}>{t.title}</div>
                    {t.subtasks.length>0&&<div style={{marginBottom:8}}><ProgressBar pct={Math.round(t.subtasks.filter(s=>s.done).length/t.subtasks.length*100)}/></div>}
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <Av name={t.assignee} size={24}/>
                      <Bdg label={t.priority} color={PRIORITY_COLORS[t.priority]}/>
                    </div>
                    {t.due&&<div style={{fontSize:11,color:isOverdue(t.due)&&t.status!=="Done"?"#ef4444":B.muted,marginTop:8}}>📅 {t.due}{isOverdue(t.due)&&t.status!=="Done"&&" · Overdue"}</div>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>}

        {/* ─ WORKLOAD ─ */}
        {view==="workload"&&<>
          <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:"#fff",marginBottom:20}}>👥 Director Workload</h1>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {DIRECTORS.map(d=>{
              const dtasks=tasks.filter(t=>t.assignee===d&&t.status!=="Done").sort((a,b)=>a.due>b.due?1:-1);
              return(
                <div key={d} className="card">
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                    <Av name={d} size={36}/>
                    <div>
                      <div style={{fontWeight:700,color:"#fff",fontSize:14}}>{d}</div>
                      <div style={{fontSize:12,color:B.muted}}>{dtasks.length} active task{dtasks.length!==1?"s":""}</div>
                    </div>
                  </div>
                  {dtasks.length===0&&<div style={{fontSize:12,color:B.muted}}>No active tasks 🎉</div>}
                  {dtasks.map(t=>(
                    <div key={t.id} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 11px",background:B.surface2,borderRadius:8,marginBottom:7,cursor:"pointer",border:`1px solid ${isOverdue(t.due)?"#ef444433":B.border}`}} onClick={()=>setDetailTask(t)}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,color:B.text}}>{t.title}</div>
                        <div style={{fontSize:11,color:B.muted,marginTop:2}}>{t.category}{t.due&&` · Due ${t.due}`}{isOverdue(t.due)&&<span style={{color:"#ef4444"}}> · OVERDUE</span>}</div>
                        {t.progress>0&&<div style={{marginTop:5}}><ProgressBar pct={t.progress}/></div>}
                      </div>
                      <Bdg label={t.priority} color={PRIORITY_COLORS[t.priority]}/>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </>}

        {/* ─ CONFERENCE ─ */}
        {view==="conference"&&<>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <div>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:"#fff"}}>🎤 Conference Organiser</h1>
              <p style={{color:B.muted,fontSize:13,marginTop:3}}>Annual Symposium 2026 checklist</p>
            </div>
            <button className="btn bp" onClick={()=>setShowConf(true)}>+ Add Item</button>
          </div>
          <div style={{background:B.surface,border:`1px solid ${B.border}`,borderRadius:11,padding:"14px 18px",marginBottom:20,display:"flex",alignItems:"center",gap:14}}>
            <div style={{flex:1}}><ProgressBar pct={Math.round(conf.filter(c=>c.done).length/conf.length*100)}/></div>
            <span style={{fontSize:13,fontWeight:700,color:B.gold,whiteSpace:"nowrap"}}>{conf.filter(c=>c.done).length}/{conf.length} complete</span>
          </div>
          {DIRECTORS.map(d=>{
            const items=conf.filter(c=>c.assignee===d);
            if(!items.length) return null;
            return(
              <div key={d} style={{marginBottom:20}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:9}}>
                  <Av name={d}/><span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{d}</span>
                  <span style={{fontSize:12,color:B.muted}}>({items.filter(i=>i.done).length}/{items.length})</span>
                </div>
                {items.map(item=>(
                  <div key={item.id} className="cr" style={{opacity:item.done?.55:1}}>
                    <input type="checkbox" checked={item.done} onChange={()=>toggleConf(item.id)}/>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,color:B.text,textDecoration:item.done?"line-through":"none"}}>{item.title}</div>
                      {item.due&&<div style={{fontSize:11,color:B.muted,marginTop:1}}>Due {item.due}</div>}
                    </div>
                    {item.done&&<Bdg label="Done" color="#10b981"/>}
                  </div>
                ))}
              </div>
            );
          })}
        </>}

        {/* ─ FINANCE ─ */}
        {view==="finance"&&<>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
            <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:"#fff"}}>💷 Finance</h1>
            <div style={{display:"flex",gap:8}}>
              <button className="btn bg" onClick={()=>exportCSV("finance")}>↓ CSV</button>
              <button className="btn bp" onClick={()=>finTab==="invoices"?setShowInv(true):setShowPay(true)}>
                + {finTab==="invoices"?"New Invoice":"New Payment"}
              </button>
            </div>
          </div>
          <div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"}}>
            {[
              {label:"Collected",value:fmt(invPaid),color:"#10b981",icon:"✅"},
              {label:"Outstanding",value:fmt(invOutstanding),color:"#f59e0b",icon:"📤"},
              {label:"Inv Overdue",value:invOverdue,color:"#ef4444",icon:"🔴"},
              {label:"Pay Owed",value:fmt(payOwed),color:"#f43f5e",icon:"💸"},
              {label:"Pay Overdue",value:payOverdue,color:"#ef4444",icon:"⚠️"},
            ].map(s=>(
              <div key={s.label} className="sc" style={{minWidth:120}}>
                <div style={{fontSize:16,marginBottom:3}}>{s.icon}</div>
                <div style={{fontSize:typeof s.value==="string"&&s.value.startsWith("£")?16:24,fontWeight:800,color:s.color,fontFamily:"'Syne',sans-serif"}}>{s.value}</div>
                <div style={{fontSize:11,color:B.muted,marginTop:2}}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:3,marginBottom:18,background:B.surface,padding:4,borderRadius:9,width:"fit-content"}}>
            <button className={`tb ${finTab==="invoices"?"act":""}`} onClick={()=>setFinTab("invoices")}>📤 Invoices ({invoices.length})</button>
            <button className={`tb ${finTab==="payments"?"act":""}`} onClick={()=>setFinTab("payments")}>💸 Payments ({payments.length})</button>
          </div>

          {finTab==="invoices"&&invoices.map(inv=>(
            <div key={inv.id} className="row" onClick={()=>setEditInv({...inv})} style={{borderColor:inv.status==="Overdue"?"#ef444433":undefined}}>
              <div style={{width:70,fontSize:11,color:B.muted,fontWeight:600,flexShrink:0}}>{inv.id}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:500,color:B.text}}>{inv.client}</div>
                <div style={{fontSize:12,color:B.muted,marginTop:1}}>{inv.description}</div>
                <div style={{fontSize:11,color:B.muted,marginTop:1}}>Issued {inv.issued} · Due {inv.due} · {inv.assignee}{isOverdue(inv.due)&&inv.status!=="Paid"&&<span style={{color:"#ef4444"}}> · OVERDUE</span>}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:15,fontWeight:800,color:inv.status==="Paid"?"#10b981":inv.status==="Overdue"?"#ef4444":B.text,fontFamily:"'Syne',sans-serif"}}>{fmt(inv.amount)}</div>
                <Bdg label={inv.status} color={INV_COLORS[inv.status]}/>
              </div>
              <button className="btn bd" style={{padding:"5px 9px",fontSize:12,marginLeft:8}} onClick={e=>{e.stopPropagation();deleteInv(inv.id);}}>✕</button>
            </div>
          ))}

          {finTab==="payments"&&payments.map(pay=>(
            <div key={pay.id} className="row" onClick={()=>setEditPay({...pay})} style={{borderColor:pay.status==="Overdue"?"#ef444433":undefined}}>
              <div style={{width:70,fontSize:11,color:B.muted,fontWeight:600,flexShrink:0}}>{pay.id}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:500,color:B.text}}>{pay.payee}</div>
                <div style={{fontSize:12,color:B.muted,marginTop:1}}>{pay.description}</div>
                <div style={{fontSize:11,color:B.muted,marginTop:1}}>Due {pay.due} · {pay.assignee} · {pay.category}{isOverdue(pay.due)&&pay.status!=="Paid"&&<span style={{color:"#ef4444"}}> · OVERDUE</span>}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:15,fontWeight:800,color:pay.status==="Paid"?"#10b981":pay.status==="Overdue"?"#ef4444":"#f59e0b",fontFamily:"'Syne',sans-serif"}}>{fmt(pay.amount)}</div>
                <Bdg label={pay.status} color={PAY_COLORS[pay.status]}/>
              </div>
              <button className="btn bd" style={{padding:"5px 9px",fontSize:12,marginLeft:8}} onClick={e=>{e.stopPropagation();deletePay(pay.id);}}>✕</button>
            </div>
          ))}
        </>}

      </div>{/* end content */}

      {/* ── TASK DETAIL PANEL ── */}
      {detailTask&&<TaskDetail/>}

      {/* ── MODALS ── */}

      {/* Add Task */}
      {showTask&&(
        <Modal title="New Task" onClose={()=>setShowTask(false)} footer={<><button className="btn bp" style={{flex:1}} onClick={addTask}>Create Task</button><button className="btn bg" onClick={()=>setShowTask(false)}>Cancel</button></>}>
          <Field label="Title"><input className="inp" value={newTask.title} onChange={e=>setNewTask({...newTask,title:e.target.value})} placeholder="Task title…"/></Field>
          <G2>
            <Field label="Assign To"><select className="sel" value={newTask.assignee} onChange={e=>setNewTask({...newTask,assignee:e.target.value})}>{DIRECTORS.map(d=><option key={d}>{d}</option>)}</select></Field>
            <Field label="Category"><select className="sel" value={newTask.category} onChange={e=>setNewTask({...newTask,category:e.target.value})}>{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select></Field>
            <Field label="Priority"><select className="sel" value={newTask.priority} onChange={e=>setNewTask({...newTask,priority:e.target.value})}>{PRIORITIES.map(p=><option key={p}>{p}</option>)}</select></Field>
            <Field label="Status"><select className="sel" value={newTask.status} onChange={e=>setNewTask({...newTask,status:e.target.value})}>{STATUS_OPTIONS.map(s=><option key={s}>{s}</option>)}</select></Field>
            <Field label="Due Date"><input type="date" className="inp" value={newTask.due} onChange={e=>setNewTask({...newTask,due:e.target.value})}/></Field>
            <Field label="Recurring"><select className="sel" value={newTask.recur} onChange={e=>setNewTask({...newTask,recur:e.target.value})}>{RECUR_OPTIONS.map(r=><option key={r}>{r}</option>)}</select></Field>
          </G2>
          <Field label="Notes"><textarea className="inp" rows={2} value={newTask.notes} onChange={e=>setNewTask({...newTask,notes:e.target.value})} style={{resize:"vertical"}}/></Field>
        </Modal>
      )}

      {/* Add Conf */}
      {showConf&&(
        <Modal title="Add Conference Item" onClose={()=>setShowConf(false)} footer={<><button className="btn bp" style={{flex:1}} onClick={addConf}>Add</button><button className="btn bg" onClick={()=>setShowConf(false)}>Cancel</button></>}>
          <Field label="Task"><input className="inp" value={newConf.title} onChange={e=>setNewConf({...newConf,title:e.target.value})} placeholder="e.g. Book photographer"/></Field>
          <G2>
            <Field label="Assign To"><select className="sel" value={newConf.assignee} onChange={e=>setNewConf({...newConf,assignee:e.target.value})}>{DIRECTORS.map(d=><option key={d}>{d}</option>)}</select></Field>
            <Field label="Due Date"><input type="date" className="inp" value={newConf.due} onChange={e=>setNewConf({...newConf,due:e.target.value})}/></Field>
          </G2>
        </Modal>
      )}

      {/* Add Invoice */}
      {showInv&&(
        <Modal title="📤 New Invoice" onClose={()=>setShowInv(false)} footer={<><button className="btn bp" style={{flex:1}} onClick={addInv}>Create Invoice</button><button className="btn bg" onClick={()=>setShowInv(false)}>Cancel</button></>}>
          <Field label="Client"><input className="inp" value={newInv.client} onChange={e=>setNewInv({...newInv,client:e.target.value})} placeholder="Client name"/></Field>
          <Field label="Description"><input className="inp" value={newInv.description} onChange={e=>setNewInv({...newInv,description:e.target.value})} placeholder="Services rendered"/></Field>
          <G2>
            <Field label="Amount (£)"><input type="number" className="inp" value={newInv.amount} onChange={e=>setNewInv({...newInv,amount:e.target.value})} placeholder="0.00"/></Field>
            <Field label="Status"><select className="sel" value={newInv.status} onChange={e=>setNewInv({...newInv,status:e.target.value})}>{INV_STATUSES.map(s=><option key={s}>{s}</option>)}</select></Field>
            <Field label="Issue Date"><input type="date" className="inp" value={newInv.issued} onChange={e=>setNewInv({...newInv,issued:e.target.value})}/></Field>
            <Field label="Due Date"><input type="date" className="inp" value={newInv.due} onChange={e=>setNewInv({...newInv,due:e.target.value})}/></Field>
            <Field label="Managed By"><select className="sel" value={newInv.assignee} onChange={e=>setNewInv({...newInv,assignee:e.target.value})}>{DIRECTORS.map(d=><option key={d}>{d}</option>)}</select></Field>
          </G2>
        </Modal>
      )}

      {/* Edit Invoice */}
      {editInv&&(
        <Modal title={`Edit ${editInv.id}`} onClose={()=>setEditInv(null)} footer={<><button className="btn bp" style={{flex:1}} onClick={()=>saveInv(editInv)}>Save</button><button className="btn bs" onClick={()=>markInvPaid(editInv)}>Mark Paid ✓</button><button className="btn bg" onClick={()=>setEditInv(null)}>Cancel</button></>}>
          <Field label="Client"><input className="inp" value={editInv.client} onChange={e=>setEditInv({...editInv,client:e.target.value})}/></Field>
          <Field label="Description"><input className="inp" value={editInv.description} onChange={e=>setEditInv({...editInv,description:e.target.value})}/></Field>
          <G2>
            <Field label="Amount (£)"><input type="number" className="inp" value={editInv.amount} onChange={e=>setEditInv({...editInv,amount:e.target.value})}/></Field>
            <Field label="Status"><select className="sel" value={editInv.status} onChange={e=>setEditInv({...editInv,status:e.target.value})}>{INV_STATUSES.map(s=><option key={s}>{s}</option>)}</select></Field>
            <Field label="Issue Date"><input type="date" className="inp" value={editInv.issued} onChange={e=>setEditInv({...editInv,issued:e.target.value})}/></Field>
            <Field label="Due Date"><input type="date" className="inp" value={editInv.due} onChange={e=>setEditInv({...editInv,due:e.target.value})}/></Field>
            <Field label="Managed By"><select className="sel" value={editInv.assignee} onChange={e=>setEditInv({...editInv,assignee:e.target.value})}>{DIRECTORS.map(d=><option key={d}>{d}</option>)}</select></Field>
          </G2>
        </Modal>
      )}

      {/* Add Payment */}
      {showPay&&(
        <Modal title="💸 New Payment" onClose={()=>setShowPay(false)} footer={<><button className="btn bp" style={{flex:1}} onClick={addPay}>Add Payment</button><button className="btn bg" onClick={()=>setShowPay(false)}>Cancel</button></>}>
          <Field label="Payee"><input className="inp" value={newPay.payee} onChange={e=>setNewPay({...newPay,payee:e.target.value})} placeholder="Supplier / vendor name"/></Field>
          <Field label="Description"><input className="inp" value={newPay.description} onChange={e=>setNewPay({...newPay,description:e.target.value})} placeholder="What is this payment for?"/></Field>
          <G2>
            <Field label="Amount (£)"><input type="number" className="inp" value={newPay.amount} onChange={e=>setNewPay({...newPay,amount:e.target.value})} placeholder="0.00"/></Field>
            <Field label="Due Date"><input type="date" className="inp" value={newPay.due} onChange={e=>setNewPay({...newPay,due:e.target.value})}/></Field>
            <Field label="Status"><select className="sel" value={newPay.status} onChange={e=>setNewPay({...newPay,status:e.target.value})}>{PAY_STATUSES.map(s=><option key={s}>{s}</option>)}</select></Field>
            <Field label="Category"><select className="sel" value={newPay.category} onChange={e=>setNewPay({...newPay,category:e.target.value})}>{PAY_CATS.map(c=><option key={c}>{c}</option>)}</select></Field>
            <Field label="Assigned To"><select className="sel" value={newPay.assignee} onChange={e=>setNewPay({...newPay,assignee:e.target.value})}>{DIRECTORS.map(d=><option key={d}>{d}</option>)}</select></Field>
          </G2>
        </Modal>
      )}

      {/* Edit Payment */}
      {editPay&&(
        <Modal title={`Edit ${editPay.id}`} onClose={()=>setEditPay(null)} footer={<><button className="btn bp" style={{flex:1}} onClick={()=>savePay(editPay)}>Save</button><button className="btn bs" onClick={()=>markPayPaid(editPay)}>Mark Paid ✓</button><button className="btn bg" onClick={()=>setEditPay(null)}>Cancel</button></>}>
          <Field label="Payee"><input className="inp" value={editPay.payee} onChange={e=>setEditPay({...editPay,payee:e.target.value})}/></Field>
          <Field label="Description"><input className="inp" value={editPay.description} onChange={e=>setEditPay({...editPay,description:e.target.value})}/></Field>
          <G2>
            <Field label="Amount (£)"><input type="number" className="inp" value={editPay.amount} onChange={e=>setEditPay({...editPay,amount:e.target.value})}/></Field>
            <Field label="Due Date"><input type="date" className="inp" value={editPay.due} onChange={e=>setEditPay({...editPay,due:e.target.value})}/></Field>
            <Field label="Status"><select className="sel" value={editPay.status} onChange={e=>setEditPay({...editPay,status:e.target.value})}>{PAY_STATUSES.map(s=><option key={s}>{s}</option>)}</select></Field>
            <Field label="Category"><select className="sel" value={editPay.category} onChange={e=>setEditPay({...editPay,category:e.target.value})}>{PAY_CATS.map(c=><option key={c}>{c}</option>)}</select></Field>
            <Field label="Assigned To"><select className="sel" value={editPay.assignee} onChange={e=>setEditPay({...editPay,assignee:e.target.value})}>{DIRECTORS.map(d=><option key={d}>{d}</option>)}</select></Field>
          </G2>
        </Modal>
      )}


      {/* ── MOBILE BOTTOM NAV ── */}
      <div className="mob-nav">
        {[
          ["dashboard","📊","Home"],
          ["tasks","✅","Tasks"],
          ["kanban","📋","Board"],
          ["workload","👥","Team"],
          ["conference","🎤","Conf"],
          ["finance","💷","Finance"],
        ].map(([v,icon,label])=>(
          <button key={v} className={`mnb ${view===v?"act":""}`} onClick={()=>setView(v)}>
            <span className="i">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

    </div>
  );
}
