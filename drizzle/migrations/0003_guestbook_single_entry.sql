WITH ranked_entries AS (
  SELECT
    id,
    row_number() OVER (
      PARTITION BY author_id
      ORDER BY created_at DESC, id DESC
    ) AS position
  FROM public.guestbook
  WHERE author_id IS NOT NULL
)
UPDATE public.guestbook AS entry
SET author_id = NULL
FROM ranked_entries
WHERE entry.id = ranked_entries.id
  AND ranked_entries.position > 1;

CREATE UNIQUE INDEX IF NOT EXISTS guestbook_author_id_unique_idx
  ON public.guestbook (author_id)
  WHERE author_id IS NOT NULL;

DROP POLICY IF EXISTS guestbook_insert ON public.guestbook;
CREATE POLICY guestbook_insert ON public.guestbook
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(btrim(name)) BETWEEN 1 AND 20
    AND char_length(btrim(message)) BETWEEN 1 AND 300
    AND author_id = nullif(
      current_setting('request.headers', true)::jsonb ->> 'x-guestbook-author-id',
      ''
    )
  );

DROP POLICY IF EXISTS guestbook_delete ON public.guestbook;
CREATE POLICY guestbook_delete ON public.guestbook
  FOR DELETE TO anon, authenticated
  USING (
    author_id = nullif(
      current_setting('request.headers', true)::jsonb ->> 'x-guestbook-author-id',
      ''
    )
  );

DROP POLICY IF EXISTS guestbook_update ON public.guestbook;
CREATE POLICY guestbook_update ON public.guestbook
  FOR UPDATE TO anon, authenticated
  USING (
    author_id = nullif(
      current_setting('request.headers', true)::jsonb ->> 'x-guestbook-author-id',
      ''
    )
  )
  WITH CHECK (
    char_length(btrim(name)) BETWEEN 1 AND 20
    AND char_length(btrim(message)) BETWEEN 1 AND 300
    AND author_id = nullif(
      current_setting('request.headers', true)::jsonb ->> 'x-guestbook-author-id',
      ''
    )
  );
