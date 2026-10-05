CREATE TABLE public.guestbook (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  relation text,
  message text NOT NULL,
  attending boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.guestbook TO anon;
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
    AND (relation IS NULL OR char_length(btrim(relation)) <= 20)
  );

INSERT INTO public.guestbook (name, relation, message, attending) VALUES
  ('김하늘', '신부 친구', '은행잎 편지처럼 오래 간직할 하루 되세요. 두 사람, 정말 축하해요.', true),
  ('이준호', '신랑 직장동료', '호숫가 산책이 기대됩니다. 맑은 날 함께 웃으며 걸을게요.', true),
  ('박서윤', '신부 사촌', '함께 못 가서 아쉽지만, 언덕 위에서 가장 예쁠 두 사람을 응원합니다.', false);