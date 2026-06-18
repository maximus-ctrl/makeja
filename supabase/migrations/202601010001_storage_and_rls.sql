-- Optional Supabase helper SQL.
-- Run only after reviewing for your project.

insert into storage.buckets (id, name, public)
values ('makeja-listings', 'makeja-listings', true)
on conflict (id) do nothing;

-- Example: enable RLS after Laravel migrations if exposing tables directly.
-- alter table public.listings enable row level security;
-- create policy "Public can read published listings" on public.listings for select using (status = 'published');
