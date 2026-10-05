<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Conventions

- All invitation copy and event facts (couple, date, venue, transit, day-of order,
  sample guestbook notes) live in `src/lib/wedding.ts` as the single source of truth,
  so the couple can correct one file instead of hunting through components.
- Colors, fonts, radius, shadows and motion are defined only as tokens in
  `src/styles.css` (oklch, shadcn semantic names re-mapped onto the paper palette),
  because components that hardcode color utilities bypass the theme and break the
  invitation's mood.
- Anything whose value depends on the clock or the browser (calendar-file stamp,
  D-day count, share/copy) is computed inside `useEffect`, never during render, so
  server and client HTML agree.
- Guestbook writes go straight to the `public.guestbook` table under RLS with
  `anon` select/insert only — the guestbook is intentionally open to visitors and
  needs no sign-in.
