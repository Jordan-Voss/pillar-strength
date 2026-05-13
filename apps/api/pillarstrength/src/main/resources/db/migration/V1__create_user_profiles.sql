CREATE TABLE user_profiles (
   id UUID PRIMARY KEY,

   email VARCHAR(255) NOT NULL UNIQUE,

   display_name VARCHAR(100),

   onboarding_complete BOOLEAN NOT NULL DEFAULT FALSE,

   theme VARCHAR(30) NOT NULL DEFAULT 'system',

   timezone VARCHAR(100) NOT NULL DEFAULT 'Europe/Dublin',

   units VARCHAR(20) NOT NULL DEFAULT 'metric',

   e1rm_formula VARCHAR(30) NOT NULL DEFAULT 'epley',

   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_user_profiles_email
    ON user_profiles(email);