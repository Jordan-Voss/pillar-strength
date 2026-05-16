-- Normalise persisted enum values to match Java enum names used by @Enumerated(EnumType.STRING).

update public.user_profiles
set units = upper(units)
where units is not null;

update public.user_profiles
set e1rm_formula = upper(e1rm_formula)
where e1rm_formula is not null;

alter table public.user_profiles
    alter column units set default 'METRIC';

alter table public.user_profiles
    alter column e1rm_formula set default 'EPLEY';