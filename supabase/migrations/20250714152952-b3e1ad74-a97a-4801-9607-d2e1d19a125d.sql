-- Fix RLS performance warnings by optimizing auth.uid() calls
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own prompts" ON public.user_prompts;
DROP POLICY IF EXISTS "Users can create their own prompts" ON public.user_prompts;
DROP POLICY IF EXISTS "Users can update their own prompts" ON public.user_prompts;

-- Recreate optimized policies for profiles table
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING ((SELECT auth.uid()) = user_id);

-- Recreate optimized policies for user_prompts table
CREATE POLICY "Users can view their own prompts" 
ON public.user_prompts 
FOR SELECT 
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can create their own prompts" 
ON public.user_prompts 
FOR INSERT 
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own prompts" 
ON public.user_prompts 
FOR UPDATE 
USING ((SELECT auth.uid()) = user_id);