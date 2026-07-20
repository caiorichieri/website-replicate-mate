
CREATE POLICY "Public can read gallery" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'gallery');
CREATE POLICY "Admins can upload gallery" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update gallery" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete gallery" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));
