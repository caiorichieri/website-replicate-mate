-- Rotate the admin password to an unknown random value so the plaintext previously
-- committed in migration history is no longer valid. The account owner must use the
-- "password reset" flow (or have an admin set a new password) to regain access.
UPDATE auth.users
SET encrypted_password = crypt(gen_random_uuid()::text || gen_random_uuid()::text, gen_salt('bf')),
    updated_at = now()
WHERE email = 'info@allanazionale.it';