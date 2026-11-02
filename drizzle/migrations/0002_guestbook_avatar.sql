ALTER TABLE public.guestbook
  ADD COLUMN IF NOT EXISTS avatar_id text NOT NULL DEFAULT 'bunny';

ALTER TABLE public.guestbook
  ADD CONSTRAINT guestbook_avatar_id_check
  CHECK (avatar_id IN ('bunny', 'bear', 'cat', 'fox', 'alien'));
