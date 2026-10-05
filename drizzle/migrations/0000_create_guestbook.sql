CREATE TABLE public.guestbook (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  author_id text,
  message text NOT NULL,
  attending boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.guestbook TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.guestbook TO authenticated;
GRANT ALL ON public.guestbook TO service_role;

ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;

CREATE POLICY guestbook_read ON public.guestbook
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY guestbook_insert ON public.guestbook
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(btrim(name)) BETWEEN 1 AND 20
    AND char_length(btrim(message)) BETWEEN 1 AND 300
  );

CREATE POLICY guestbook_delete ON public.guestbook
  FOR DELETE TO anon, authenticated
  USING (true);

