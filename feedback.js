
(function(){
  const KEY="harizzcore_feedback_v1";
  const session={email:"",rating:0};

  const $=id=>document.getElementById(id);
  const modal=$("hcModal"), loginStep=$("hcLoginStep"), reviewStep=$("hcReviewStep"), thanksStep=$("hcThanksStep");
  const reviewsEl=$("hcReviews"), avgEl=$("hcAverage"), countEl=$("hcReviewCount"), avgStars=$("hcAverageStars");

  function getReviews(){try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){return[]}}
  function saveReviews(x){localStorage.setItem(KEY,JSON.stringify(x))}
  function stars(n){return "★★★★★".slice(0,n)+"☆☆☆☆☆".slice(0,5-n)}
  function safeName(email){const name=(email.split("@")[0]||"guest").replace(/[._-]+/g," ");return name.charAt(0).toUpperCase()+name.slice(1)}
  function render(){
    const data=getReviews();
    countEl.textContent=data.length;
    if(!data.length){avgEl.textContent="0.0";avgStars.textContent="☆☆☆☆☆";reviewsEl.innerHTML='<div class="hc-empty">No takes yet. Be the first one. 👀</div>';return}
    const avg=data.reduce((a,r)=>a+r.rating,0)/data.length;
    avgEl.textContent=avg.toFixed(1);avgStars.textContent=stars(Math.round(avg));
    reviewsEl.innerHTML=data.slice().reverse().map(r=>`
      <article class="hc-review">
        <div class="hc-review-top"><div class="hc-avatar">${(r.name[0]||"G").toUpperCase()}</div>
        <span class="hc-review-name">${escapeHtml(r.name)}</span><span class="hc-review-stars">${stars(r.rating)}</span></div>
        <p class="hc-review-text">${escapeHtml(r.comment)}</p><small class="hc-review-time">${escapeHtml(r.time)}</small>
      </article>`).join("");
  }
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
  function openModal(){modal.classList.add("open");modal.setAttribute("aria-hidden","false");loginStep.hidden=false;reviewStep.hidden=true;thanksStep.hidden=true}
  function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
  document.querySelectorAll("[data-close-feedback]").forEach(b=>b.addEventListener("click",closeModal));
  $("hcOpenFeedback").addEventListener("click",openModal);

  $("hcLoginForm").addEventListener("submit",e=>{
    e.preventDefault();
    const email=$("hcEmail").value.trim().toLowerCase(), pass=$("hcPassword").value;
    if(!/^[^\\s@]+@gmail\\.com$/i.test(email)){alert("Use a valid Gmail address 👀");return}
    if(pass.length<4){alert("Password needs at least 4 characters.");return}
    session.email=email;
    $("hcLoggedInAs").textContent="Posting as "+email;
    loginStep.hidden=true;reviewStep.hidden=false;
  });

  document.querySelectorAll("#hcStarPicker button").forEach(btn=>{
    btn.addEventListener("click",()=>{
      session.rating=Number(btn.dataset.rating);
      document.querySelectorAll("#hcStarPicker button").forEach(x=>x.classList.toggle("active",Number(x.dataset.rating)<=session.rating));
    });
  });

  $("hcComment").addEventListener("input",e=>$("hcCharCount").textContent=e.target.value.length);

  $("hcSubmitReview").addEventListener("click",()=>{
    const comment=$("hcComment").value.trim();
    if(!session.rating){alert("Pick a rating first ⭐");return}
    if(comment.length<3){alert("Drop at least a few words 😭");return}
    const reviews=getReviews();
    reviews.push({name:safeName(session.email),email:session.email,rating:session.rating,comment,time:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})});
    saveReviews(reviews);
    render();
    reviewStep.hidden=true;thanksStep.hidden=false;
    session.rating=0;
    $("hcComment").value="";$("hcCharCount").textContent="0";
    document.querySelectorAll("#hcStarPicker button").forEach(x=>x.classList.remove("active"));
  });

  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
  render();
})();
