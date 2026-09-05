const cursor=document.querySelector(".cursor");
setInterval(()=>{if(cursor)cursor.style.opacity=cursor.style.opacity==="0"?"1":"0"},500);
console.log("Haris portfolio V2 loaded — replace contact links and add project photos.");
const supabaseUrl = "https://sjrcietjqktlpepchgpm.supabase.co/rest/v1/";
const supabaseKey = "sb_publishable_3eHU_jft2yTUcOGWmYOMoA_xxLPvflQ";

const supabaseClient = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

console.log("Supabase connected ✅");
const session = {
  rating: 0
};
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
// ===== SAVE NEW REVIEW =====
async function submitReview() {
 const comment = document.getElementById("feedbackText")?.value.trim();
  const rating = session?.rating;

  if (!rating) {
    alert("Pick a rating first ⭐");
    return;
  }

  if (!comment || comment.length < 3) {
    alert("Drop at least a few words 😭");
    return;
  }

  const { error } = await supabaseClient
    .from("portfolio_reviews")
    .insert({
      rating: rating,
      feedback: comment
    });

  if (error) {
    console.error(error);
    alert("Couldn't post the take. Try again 👀");
    return;
  }

  await loadReviews();

  document.getElementById("feedbackText").value = "";
document.getElementById("charCount").textContent = "0";
document.getElementById("ratingText").textContent = "tap a star ↑";

alert("Thanks for the feedback! 🔥");
  session.rating = 0;

 document
  .querySelectorAll("#ratingStars button")
  .forEach(x => x.classList.remove("active"));
}

// STAR RATING
document.querySelectorAll("#ratingStars button").forEach(button => {
  button.addEventListener("click", () => {
    session.rating = Number(button.dataset.rating);

    document.querySelectorAll("#ratingStars button").forEach(star => {
      star.classList.toggle(
        "active",
        Number(star.dataset.rating) <= session.rating
      );
    });

    document.getElementById("ratingText").textContent =
      `${session.rating}/5 — nice choice 😎`;
  });
});

// CHARACTER COUNT
document.getElementById("feedbackText")?.addEventListener("input", function () {
  document.getElementById("charCount").textContent = this.value.length;
});

// SUBMIT BUTTON
document
  .getElementById("submitFeedback")
  ?.addEventListener("click", submitReview);
alert("SCRIPT IS WORKING 🔥");
