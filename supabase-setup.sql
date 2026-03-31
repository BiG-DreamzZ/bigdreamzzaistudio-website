-- ============================================
-- BiG-DreamzZ AI Studio — Supabase Setup SQL
-- Run this entire file in your SQL Editor
-- ============================================

-- 1. PORTFOLIO TABLE
CREATE TABLE IF NOT EXISTS portfolio (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  client_name text,
  category text DEFAULT 'general',
  description text,
  video_url text,
  thumbnail_url text,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 2. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text,
  quote text NOT NULL,
  avatar_url text,
  rating integer DEFAULT 5,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 3. CONTACT FORM SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text,
  whatsapp text,
  industry text,
  service text,
  message text,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 4. COMMUNITY APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS community_applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text,
  email text,
  whatsapp text,
  skill text,
  experience text,
  message text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_applications ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLICIES — Portfolio
-- ============================================
CREATE POLICY "Public read published portfolio"
  ON portfolio FOR SELECT
  USING (published = true);

CREATE POLICY "Admin full access portfolio"
  ON portfolio FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================
-- POLICIES — Testimonials
-- ============================================
CREATE POLICY "Public read published testimonials"
  ON testimonials FOR SELECT
  USING (published = true);

CREATE POLICY "Admin full access testimonials"
  ON testimonials FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================
-- POLICIES — Contact Submissions
-- ============================================
CREATE POLICY "Public can submit contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin full access contact submissions"
  ON contact_submissions FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================
-- POLICIES — Community Applications
-- ============================================
CREATE POLICY "Public can apply to community"
  ON community_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin full access community applications"
  ON community_applications FOR ALL
  USING (auth.role() = 'authenticated');
