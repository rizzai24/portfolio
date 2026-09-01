const cursor=document.querySelector(".cursor");
setInterval(()=>{if(cursor)cursor.style.opacity=cursor.style.opacity==="0"?"1":"0"},500);
console.log("Haris portfolio V2 loaded — replace contact links and add project photos.");
const supabaseUrl = "https://sjrcieqjktlpepchpgpm.supabase.co";
const supabaseKey = "sb_publishable_3eHU_jft2yTUcOGWmYOMoA_xxLPvflQ";

const supabaseClient = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

console.log("Supabase connected ✅");
