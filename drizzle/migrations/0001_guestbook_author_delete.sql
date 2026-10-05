ALTER TABLE public.guestbook ADD COLUMN IF NOT EXISTS author_id text;

CREATE INDEX IF NOT EXISTS guestbook_author_id_idx
  ON public.guestbook (author_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.guestbook TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.guestbook TO authenticated;
