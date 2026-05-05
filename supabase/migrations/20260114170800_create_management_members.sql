-- Create management_members table for org chart
CREATE TABLE IF NOT EXISTS public.management_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    image_url TEXT,
    bio TEXT NOT NULL,
    is_commissioner BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.management_members ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for the public website)
CREATE POLICY "Allow public read access" ON public.management_members
    FOR SELECT USING (true);

-- Allow authenticated admins to manage
CREATE POLICY "Allow admin insert" ON public.management_members
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Allow admin update" ON public.management_members
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Allow admin delete" ON public.management_members
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- Insert default management data
INSERT INTO public.management_members (name, role, image_url, bio, is_commissioner, sort_order) VALUES
    ('Prof. Saleem Abdurrahman', 'Honourable Commissioner', '/Hon. commissioner.png', 'A visionary leader with over 20 years of experience in veterinary medicine and public administration. Dedicated to transforming Jigawa''s livestock sector into a leading economic hub.', true, 0),
    ('Dr. Aminu Ibrahim', 'Director, Veterinary Services', '/director-vet.png', 'Expert in epidemiology and disease control. Leads state-wide vaccination and animal health initiatives.', false, 1),
    ('Alh. Yusuf Sani', 'Director, Animal Production', '/director-animal.png', 'Specializes in livestock breeding and nutritional management. Focused on improving local breed genetics.', false, 2),
    ('Hajiya Fatima Bello', 'Director, Range Management', '/director-range.png', 'Champion for sustainable grazing and pastoralist welfare. Manages grazing reserves and conflict resolution.', false, 3),
    ('Dr. Usman Ali', 'Director, Livestock Economics', '/director-economics.png', 'Economist focused on value chain development, market access, and livestock trade facilitation.', false, 4),
    ('Mal. Musa Ahmed', 'Director, Planning & Research', '/director-planning.png', 'Strategic planner driving evidence-based policy making and data-driven development programs.', false, 5);
