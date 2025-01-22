/*
  # Fix profiles table RLS policies

  1. Changes
    - Add policy to allow authenticated users to insert their own profile
    - This fixes the 42501 error when creating new profiles

  2. Security
    - Maintains existing RLS policies
    - Adds secure insert policy for profiles
*/

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
