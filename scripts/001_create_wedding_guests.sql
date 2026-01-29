-- Create wedding_guests table for RSVP confirmations
CREATE TABLE IF NOT EXISTS public.wedding_guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  guests_count INTEGER NOT NULL DEFAULT 1,
  attendance TEXT NOT NULL CHECK (attendance IN ('yes', 'maybe', 'no')),
  dietary_restrictions TEXT,
  needs_transport BOOLEAN DEFAULT FALSE,
  song_suggestions TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_wedding_guests_email ON public.wedding_guests(email);
CREATE INDEX IF NOT EXISTS idx_wedding_guests_attendance ON public.wedding_guests(attendance);
CREATE INDEX IF NOT EXISTS idx_wedding_guests_created_at ON public.wedding_guests(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.wedding_guests ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert (for RSVP submissions)
CREATE POLICY "Allow public inserts" ON public.wedding_guests
  FOR INSERT
  WITH CHECK (true);

-- Policy to allow reading all guests (for admin view - you can restrict this later)
CREATE POLICY "Allow public read" ON public.wedding_guests
  FOR SELECT
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_wedding_guests_updated_at ON public.wedding_guests;
CREATE TRIGGER update_wedding_guests_updated_at
  BEFORE UPDATE ON public.wedding_guests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
