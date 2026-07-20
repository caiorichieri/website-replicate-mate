
-- Enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- has_role function (security definer, avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Categories
CREATE TABLE public.gallery_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title_it TEXT NOT NULL,
  title_en TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_categories TO authenticated;
GRANT ALL ON public.gallery_categories TO service_role;
ALTER TABLE public.gallery_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view categories" ON public.gallery_categories
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert categories" ON public.gallery_categories
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update categories" ON public.gallery_categories
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete categories" ON public.gallery_categories
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Gallery photos
CREATE TABLE public.gallery_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_it TEXT NOT NULL DEFAULT '',
  alt_en TEXT NOT NULL DEFAULT '',
  category_slugs TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_photos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_photos TO authenticated;
GRANT ALL ON public.gallery_photos TO service_role;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view photos" ON public.gallery_photos
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert photos" ON public.gallery_photos
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update photos" ON public.gallery_photos
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete photos" ON public.gallery_photos
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Popup settings (single row, id fixed)
CREATE TABLE public.popup_settings (
  id INT PRIMARY KEY DEFAULT 1,
  enabled BOOLEAN NOT NULL DEFAULT true,
  title_it TEXT NOT NULL DEFAULT 'Organizza il tuo evento',
  title_en TEXT NOT NULL DEFAULT 'Host your event',
  text_it TEXT NOT NULL DEFAULT 'Contattaci per informazioni e disponibilità.',
  text_en TEXT NOT NULL DEFAULT 'Contact us for information and availability.',
  cta_it TEXT NOT NULL DEFAULT 'Scrivici su WhatsApp',
  cta_en TEXT NOT NULL DEFAULT 'Message us on WhatsApp',
  dismiss_it TEXT NOT NULL DEFAULT 'Più tardi',
  dismiss_en TEXT NOT NULL DEFAULT 'Later',
  image_url TEXT,
  link_type TEXT NOT NULL DEFAULT 'whatsapp',
  link_value TEXT NOT NULL DEFAULT '',
  delay_ms INT NOT NULL DEFAULT 8000,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1),
  CONSTRAINT valid_link_type CHECK (link_type IN ('whatsapp', 'url'))
);
GRANT SELECT ON public.popup_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.popup_settings TO authenticated;
GRANT ALL ON public.popup_settings TO service_role;
ALTER TABLE public.popup_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view popup" ON public.popup_settings
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert popup" ON public.popup_settings
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update popup" ON public.popup_settings
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Seed default popup row
INSERT INTO public.popup_settings (id) VALUES (1) ON CONFLICT DO NOTHING;

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_categories_updated BEFORE UPDATE ON public.gallery_categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_photos_updated BEFORE UPDATE ON public.gallery_photos
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_popup_updated BEFORE UPDATE ON public.popup_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
