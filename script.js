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
// ===== SHARED PORTFOLIO RATINGS =====

async function loadReviews() {
  const { data, error } = await supabaseClient
    .from("portfolio_reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Could not load reviews:", error);
    return;
  }

  const reviewCount = document.getElementById("reviewCount");
  const averageRating = document.getElementById("averageRating");
  const starsDisplay = document.getElementById("starsDisplay");

  if (!data || data.length === 0) return;

  const average =
    data.reduce((sum, review) => sum + Number(review.rating), 0) /
    data.length;

  if (reviewCount) reviewCount.textContent = data.length;
  if (averageRating) averageRating.textContent = average.toFixed(1);
  if (starsDisplay) {
    starsDisplay.textContent = "★".repeat(Math.round(average)) +
      "☆".repeat(5 - Math.round(average));
  }

  const reviewWall = document.getElementById("reviewWall");

  if (reviewWall) {
    reviewWall.innerHTML = data.map(review => `
      <div class="review-card">
        <div class="review-stars">
          ${"★".repeat(Number(review.rating))}
          ${"☆".repeat(5 - Number(review.rating))}
        </div>
        <p>${escapeHtml(review.feedback)}</p>
        <small>anonymous • ${new Date(review.created_at).toLocaleDateString()}</small>
      </div>
    `).join("");
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

loadReviews();
