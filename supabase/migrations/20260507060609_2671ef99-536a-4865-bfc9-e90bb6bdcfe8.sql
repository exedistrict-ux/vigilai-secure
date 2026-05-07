CREATE TABLE public.threat_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  input_type TEXT NOT NULL,
  input_content TEXT NOT NULL,
  threat_category TEXT NOT NULL,
  risk_score INTEGER NOT NULL,
  summary TEXT NOT NULL,
  findings JSONB NOT NULL DEFAULT '[]'::jsonb,
  recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.threat_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view threat analyses"
  ON public.threat_analyses FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create threat analyses"
  ON public.threat_analyses FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can delete threat analyses"
  ON public.threat_analyses FOR DELETE
  USING (true);

CREATE INDEX idx_threat_analyses_created_at ON public.threat_analyses(created_at DESC);