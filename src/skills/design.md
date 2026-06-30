Subject & audience: Vietnamese devs learning Japanese workplace vocabulary (standups, PRs, bug reports). The app has two views: a vocabulary list and a flashcard mode.

---
Visual identity — do NOT deviate from these:

- Palette (use exactly these hex values):
  - #F9F8F5 washi — page background, like aged Japanese paper
  - #181614 sumi — primary text, near-black with warmth
  - #2451A8 ai — traditional Japanese indigo, used ONLY for furigana readings and active/hover states
  - #B8252A beni — traditional Japanese red, used ONLY for important accent marks
  - #D5D0C8 usuzumi — borders, secondary elements
  - #8E8880 usuzumi-dark — secondary text, metadata
- Typography:
  - Japanese kanji: Noto Serif JP weight 700 — large, dignified
  - Hiragana readings: Noto Sans JP weight 400 — small, above the kanji
  - UI + Vietnamese: Inter — clean
  - Category labels: JetBrains Mono — tiny, all caps, wide tracking
- Signature element — furigana stack (this is the entire identity of the app):
Each word card shows three layers stacked vertically:
  a. Small Noto Sans JP kana in ai indigo above (like real furigana in textbooks)
  b. Large Noto Serif JP 700 kanji in sumi black below
  c. Thin usuzumi horizontal rule
  d. Vietnamese meaning in Inter medium, English in small usuzumi-dark

---
Layout rules — strictly no exceptions:

- Zero border-radius on all cards and containers (no rounded-* anywhere on structural elements)
- Dictionary grid: word cards share borders via gap-px on the grid container with bg-usuzumi fill — looks like cells in a reference book, not floating cards
- No box shadows anywhere
- Cards: white background, no border (border comes from the gap-px grid trick), left accent bar w-[3px] bg-ai appears on hover via scale-y-0 → scale-y-100 transition
- On hover: card background shifts from white to washi #F9F8F5

---
Header:
- Sticky, washi background, single thin sumi bottom border
- Title: 日本語 in Noto Serif JP + × Dev Vocab in Inter, both sumi colored — NO gradients, no colored title
- Word count in JetBrains Mono small on the right
- Tab nav underneath: 単語帳 (Từ vựng) and 学習計画 (Lộ trình) — active tab has ai indigo bottom border only, no pills or backgrounds

Category filter:
- Horizontal scrollable row of plain text buttons
- Active state: ai indigo bottom border + ai text only
- No rounded pills, no colored backgrounds on buttons

Search bar:
- Full width, white bg, no border-radius
- Left border border-l-2 border-ai appears on focus (not a ring)
- Placeholder in usuzumi-dark

Flashcard mode:
- Single centered card, same word card design (no rounding)
- Front face: furigana stack (same as list card)
- Back face: Vietnamese meaning large, English small below
- Navigation: ← Trước / Tiếp → — plain text, thin border buttons, no rounding
- Xáo trộn (shuffle) button same style
- Counter x / y in JetBrains Mono above

---
Do NOT include: gradients, shadows, colored backgrounds on sections, rounded corners, rose/orange/terracotta colors, emoji in UI, numbered section markers (01/02/03), glassmorphism, dark mode toggle.
