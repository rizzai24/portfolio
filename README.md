# HARIZZCORE Portfolio Feedback Add-on

This is a drop-in feedback wall for harizzcore.in.

## Add it to your current portfolio

1. Open your current `index.html`.
2. Paste the contents of `feedback-section.html` immediately BEFORE your existing closing `</main>` or, if you prefer, before the footer.
3. Open `style.css` and paste the contents of `feedback.css` at the very bottom.
4. Open your current JavaScript file and paste `feedback.js` at the bottom, OR add:
   <script src="feedback.js"></script>
   before `</body>` after copying the JS file into your website folder.
5. Save and refresh Live Server.

## What it does

- Gmail-format login screen
- Rating from 1 to 5 stars
- 280-character feedback
- Genz-style review wall
- Average rating + review count
- Reviews are rendered safely
- Password is NOT stored
- Works immediately without a backend

## Important

This version stores reviews in the visitor's browser using localStorage. That means it is a working prototype, but reviews are NOT shared between different visitors.

For a real public website where everyone sees the same reviews, connect this UI to a backend such as Supabase or Firebase. Do not store plain-text passwords yourself.
