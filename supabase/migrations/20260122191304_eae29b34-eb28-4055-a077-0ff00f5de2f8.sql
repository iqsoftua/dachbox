-- Fix user_roles SELECT policy to explicitly check for authenticated users
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;

CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- The "Anyone can create rental requests" policy uses WITH CHECK (true) which is intentional
-- for a public contact/rental form. However, we can add basic validation by restricting
-- to authenticated users OR anonymous submissions (both are valid use cases).
-- Since this is a public rental form, keeping the policy as-is is the correct behavior.
-- We'll mark this as intentionally permissive in the ignore list.

-- The "Anyone can create contact messages" policy also uses WITH CHECK (true) which is
-- intentional for a public contact form.