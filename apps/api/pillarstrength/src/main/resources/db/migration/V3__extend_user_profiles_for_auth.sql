alter table public.user_profiles
    add column if not exists first_name varchar(80);

alter table public.user_profiles
    add column if not exists last_name varchar(80);

do $$
    begin
        if not exists (
            select 1
            from pg_constraint
            where conname = 'chk_user_profiles_first_name_length'
        ) then
            alter table public.user_profiles
                add constraint chk_user_profiles_first_name_length
                    check (
                        first_name is null
                            or length(trim(first_name)) between 1 and 80
                        );
        end if;
    end $$;

do $$
    begin
        if not exists (
            select 1
            from pg_constraint
            where conname = 'chk_user_profiles_last_name_length'
        ) then
            alter table public.user_profiles
                add constraint chk_user_profiles_last_name_length
                    check (
                        last_name is null
                            or length(trim(last_name)) between 1 and 80
                        );
        end if;
    end $$;

do $$
    begin
        if not exists (
            select 1
            from pg_constraint
            where conname = 'chk_user_profiles_display_name_length'
        ) then
            alter table public.user_profiles
                add constraint chk_user_profiles_display_name_length
                    check (
                        display_name is null
                            or length(trim(display_name)) between 1 and 120
                        );
        end if;
    end $$;

create table if not exists public.user_handles (
                                                   id uuid primary key,
                                                   username varchar(30) not null,
                                                   username_search varchar(30) generated always as (lower(username)) stored,
                                                   created_at timestamptz not null default now(),
                                                   updated_at timestamptz not null default now()
);

create unique index if not exists ux_user_handles_username_search
    on public.user_handles (username_search);

do $$
    begin
        if not exists (
            select 1
            from pg_constraint
            where conname = 'chk_user_handles_username_format'
        ) then
            alter table public.user_handles
                add constraint chk_user_handles_username_format
                    check (username ~ '^[A-Za-z0-9_]{3,20}$');
        end if;
    end $$;

create or replace function public.set_updated_at()
    returns trigger
    language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists trg_user_profiles_set_updated_at on public.user_profiles;

create trigger trg_user_profiles_set_updated_at
    before update on public.user_profiles
    for each row
execute function public.set_updated_at();

drop trigger if exists trg_user_handles_set_updated_at on public.user_handles;

create trigger trg_user_handles_set_updated_at
    before update on public.user_handles
    for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user()
    returns trigger
    language plpgsql
    security definer
    set search_path = public
as $$
declare
    requested_username text;
    requested_first_name text;
    requested_last_name text;
    requested_display_name text;
    provider_full_name text;
begin
    requested_username := nullif(trim(new.raw_user_meta_data ->> 'username'), '');
    requested_first_name := nullif(trim(new.raw_user_meta_data ->> 'first_name'), '');
    requested_last_name := nullif(trim(new.raw_user_meta_data ->> 'last_name'), '');
    requested_display_name := nullif(trim(new.raw_user_meta_data ->> 'display_name'), '');
    provider_full_name := nullif(trim(new.raw_user_meta_data ->> 'full_name'), '');

    if requested_display_name is null then
        requested_display_name := nullif(trim(concat_ws(' ', requested_first_name, requested_last_name)), '');
    end if;

    if requested_display_name is null then
        requested_display_name := provider_full_name;
    end if;

    if requested_display_name is null then
        requested_display_name := nullif(trim(new.raw_user_meta_data ->> 'name'), '');
    end if;

    if requested_display_name is null then
        requested_display_name := split_part(new.email, '@', 1);
    end if;

    insert into public.user_profiles (
        id,
        email,
        first_name,
        last_name,
        display_name
    )
    values (
               new.id,
               new.email,
               requested_first_name,
               requested_last_name,
               requested_display_name
           )
    on conflict (id) do update
        set
            email = excluded.email,
            first_name = excluded.first_name,
            last_name = excluded.last_name,
            display_name = excluded.display_name,
            updated_at = now();

    if requested_username is not null then
        if requested_username !~ '^[A-Za-z0-9_]{3,20}$' then
            raise exception 'Username must be 3-20 characters and contain only letters, numbers, and underscores';
        end if;

        insert into public.user_handles (
            id,
            username
        )
        values (
                   new.id,
                   requested_username
               )
        on conflict (id) do update
            set
                username = excluded.username,
                updated_at = now();
    end if;

    return new;
end;
$$;

drop trigger if exists after_user_created on auth.users;

create trigger after_user_created
    after insert on auth.users
    for each row
execute function public.handle_new_user();

create or replace function public.handle_user_metadata_updated()
    returns trigger
    language plpgsql
    security definer
    set search_path = public
as $$
declare
    requested_username text;
    requested_first_name text;
    requested_last_name text;
    requested_display_name text;
begin
    requested_username := nullif(trim(new.raw_user_meta_data ->> 'username'), '');
    requested_first_name := nullif(trim(new.raw_user_meta_data ->> 'first_name'), '');
    requested_last_name := nullif(trim(new.raw_user_meta_data ->> 'last_name'), '');
    requested_display_name := nullif(trim(new.raw_user_meta_data ->> 'display_name'), '');

    if requested_display_name is null then
        requested_display_name := nullif(trim(concat_ws(' ', requested_first_name, requested_last_name)), '');
    end if;

    if requested_display_name is null then
        requested_display_name := nullif(trim(new.raw_user_meta_data ->> 'full_name'), '');
    end if;

    if requested_display_name is null then
        requested_display_name := nullif(trim(new.raw_user_meta_data ->> 'name'), '');
    end if;

    update public.user_profiles
    set
        email = new.email,
        first_name = coalesce(requested_first_name, first_name),
        last_name = coalesce(requested_last_name, last_name),
        display_name = coalesce(requested_display_name, display_name),
        updated_at = now()
    where id = new.id;

    if requested_username is not null then
        if requested_username !~ '^[A-Za-z0-9_]{3,20}$' then
            raise exception 'Username must be 3-20 characters and contain only letters, numbers, and underscores';
        end if;

        insert into public.user_handles (
            id,
            username
        )
        values (
                   new.id,
                   requested_username
               )
        on conflict (id) do update
            set
                username = excluded.username,
                updated_at = now();
    end if;

    return new;
end;
$$;

drop trigger if exists after_user_metadata_updated on auth.users;

create trigger after_user_metadata_updated
    after update of raw_user_meta_data, email on auth.users
    for each row
execute function public.handle_user_metadata_updated();

alter table public.user_profiles enable row level security;
alter table public.user_handles enable row level security;

drop policy if exists user_profiles_select_own on public.user_profiles;
drop policy if exists user_profiles_update_own on public.user_profiles;
drop policy if exists user_profiles_insert_own on public.user_profiles;

create policy user_profiles_select_own
    on public.user_profiles
    for select
    to authenticated
    using (id = auth.uid());

create policy user_profiles_update_own
    on public.user_profiles
    for update
    to authenticated
    using (id = auth.uid())
    with check (id = auth.uid());

drop policy if exists user_handles_select_own on public.user_handles;
drop policy if exists user_handles_update_own on public.user_handles;

create policy user_handles_select_own
    on public.user_handles
    for select
    to authenticated
    using (id = auth.uid());

create policy user_handles_update_own
    on public.user_handles
    for update
    to authenticated
    using (id = auth.uid())
    with check (id = auth.uid());
