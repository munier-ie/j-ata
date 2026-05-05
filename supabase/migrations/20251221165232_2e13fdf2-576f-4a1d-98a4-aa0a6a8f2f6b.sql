-- Create enum for facility status
CREATE TYPE public.facility_status AS ENUM ('planned', 'under_construction', 'operational', 'rehabilitated');

-- Create enum for facility type
CREATE TYPE public.facility_type AS ENUM ('lga_clinic', 'zonal_clinic', 'central_referral', 'ranch');

-- Create veterinary clinics table
CREATE TABLE public.veterinary_clinics (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    facility_type facility_type NOT NULL,
    lga TEXT NOT NULL,
    zone TEXT,
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    status facility_status NOT NULL DEFAULT 'planned',
    capacity INTEGER,
    services TEXT[],
    contact_phone TEXT,
    contact_email TEXT,
    budget_allocated DECIMAL(15, 2) DEFAULT 0,
    budget_spent DECIMAL(15, 2) DEFAULT 0,
    completion_percentage INTEGER DEFAULT 0,
    has_power BOOLEAN DEFAULT false,
    has_water BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ranches table
CREATE TABLE public.ranches (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    lga TEXT NOT NULL,
    zone TEXT,
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    status facility_status NOT NULL DEFAULT 'planned',
    total_hectares DECIMAL(10, 2),
    capacity_cattle INTEGER,
    has_feed_facilities BOOLEAN DEFAULT false,
    has_school BOOLEAN DEFAULT false,
    has_health_center BOOLEAN DEFAULT false,
    has_veterinary_clinic BOOLEAN DEFAULT false,
    has_power BOOLEAN DEFAULT false,
    has_water BOOLEAN DEFAULT false,
    budget_allocated DECIMAL(15, 2) DEFAULT 0,
    budget_spent DECIMAL(15, 2) DEFAULT 0,
    completion_percentage INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create news articles table
CREATE TABLE public.news_articles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact submissions table
CREATE TABLE public.contact_submissions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.veterinary_clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ranches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read access for clinics and ranches (transparency portal)
CREATE POLICY "Public can view veterinary clinics"
ON public.veterinary_clinics
FOR SELECT
USING (true);

CREATE POLICY "Public can view ranches"
ON public.ranches
FOR SELECT
USING (true);

-- Public can view published news articles
CREATE POLICY "Public can view published news"
ON public.news_articles
FOR SELECT
USING (is_published = true);

-- Anyone can submit contact form
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_veterinary_clinics_updated_at
BEFORE UPDATE ON public.veterinary_clinics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ranches_updated_at
BEFORE UPDATE ON public.ranches
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_news_articles_updated_at
BEFORE UPDATE ON public.news_articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();