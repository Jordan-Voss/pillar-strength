ALTER TABLE user_profiles
    ADD CONSTRAINT fk_user_profiles_auth_user
        FOREIGN KEY (id)
            REFERENCES auth.users(id)
            ON DELETE CASCADE;

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_profiles_select_own
    ON user_profiles
    FOR SELECT
    USING (id = auth.uid());

CREATE POLICY user_profiles_insert_own
    ON user_profiles
    FOR INSERT
    WITH CHECK (id = auth.uid());

CREATE POLICY user_profiles_update_own
    ON user_profiles
    FOR UPDATE
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

CREATE POLICY user_profiles_delete_own
    ON user_profiles
    FOR DELETE
    USING (id = auth.uid());