CREATE TABLE IF NOT EXISTS exercises (
                                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                         name TEXT NOT NULL,
                                         slug TEXT NOT NULL UNIQUE,
                                         category TEXT NOT NULL,
                                         exercise_family TEXT NOT NULL,
                                         movement_pattern TEXT NOT NULL,
                                         equipment TEXT NOT NULL,
                                         is_bodyweight BOOLEAN NOT NULL DEFAULT FALSE,
                                         is_unilateral BOOLEAN NOT NULL DEFAULT FALSE,
                                         created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                                         updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS muscles (
                                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                       code TEXT NOT NULL UNIQUE,
                                       name TEXT NOT NULL,
                                       muscle_group TEXT NOT NULL,
                                       body_region TEXT NOT NULL,
                                       diagram_region_key TEXT NOT NULL,
                                       created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                                       updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS exercise_muscles (
                                                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                                exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
                                                muscle_id UUID NOT NULL REFERENCES muscles(id) ON DELETE RESTRICT,
                                                role TEXT NOT NULL,
                                                sort_order INTEGER NOT NULL DEFAULT 0,
                                                created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                                                updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

                                                CONSTRAINT chk_exercise_muscle_role
                                                    CHECK (role IN ('PRIMARY', 'SECONDARY', 'SUPPORTING')),

                                                CONSTRAINT uq_exercise_muscle_role
                                                    UNIQUE (exercise_id, muscle_id, role)
);

CREATE INDEX IF NOT EXISTS idx_exercises_name ON exercises (name);
CREATE INDEX IF NOT EXISTS idx_exercises_slug ON exercises (slug);
CREATE INDEX IF NOT EXISTS idx_exercises_category ON exercises (category);
CREATE INDEX IF NOT EXISTS idx_exercises_exercise_family ON exercises (exercise_family);
CREATE INDEX IF NOT EXISTS idx_exercises_movement_pattern ON exercises (movement_pattern);
CREATE INDEX IF NOT EXISTS idx_exercises_equipment ON exercises (equipment);

CREATE INDEX IF NOT EXISTS idx_muscles_code ON muscles (code);
CREATE INDEX IF NOT EXISTS idx_muscles_muscle_group ON muscles (muscle_group);
CREATE INDEX IF NOT EXISTS idx_muscles_body_region ON muscles (body_region);

CREATE INDEX IF NOT EXISTS idx_exercise_muscles_exercise_id ON exercise_muscles (exercise_id);
CREATE INDEX IF NOT EXISTS idx_exercise_muscles_muscle_id ON exercise_muscles (muscle_id);
CREATE INDEX IF NOT EXISTS idx_exercise_muscles_role ON exercise_muscles (role);

INSERT INTO muscles (
    code,
    name,
    muscle_group,
    body_region,
    diagram_region_key
)
VALUES
    ('pectoralis_major_clavicular', 'Upper Chest', 'Chest', 'Torso', 'pectoralis_major_clavicular'),
    ('pectoralis_major_sternal', 'Mid/Lower Chest', 'Chest', 'Torso', 'pectoralis_major_sternal'),

    ('anterior_deltoid', 'Anterior Deltoid', 'Shoulders', 'Shoulders', 'anterior_deltoid'),
    ('lateral_deltoid', 'Lateral Deltoid', 'Shoulders', 'Shoulders', 'lateral_deltoid'),
    ('posterior_deltoid', 'Posterior Deltoid', 'Shoulders', 'Shoulders', 'posterior_deltoid'),

    ('latissimus_dorsi', 'Latissimus Dorsi', 'Back', 'Back', 'latissimus_dorsi'),
    ('upper_trapezius', 'Upper Trapezius', 'Back', 'Back', 'upper_trapezius'),
    ('middle_trapezius', 'Middle Trapezius', 'Back', 'Back', 'middle_trapezius'),
    ('lower_trapezius', 'Lower Trapezius', 'Back', 'Back', 'lower_trapezius'),
    ('rhomboids', 'Rhomboids', 'Back', 'Back', 'rhomboids'),
    ('erector_spinae', 'Erector Spinae', 'Back', 'Back', 'erector_spinae'),

    ('biceps_brachii', 'Biceps', 'Arms', 'Arms', 'biceps_brachii'),
    ('triceps_brachii', 'Triceps', 'Arms', 'Arms', 'triceps_brachii'),
    ('forearms', 'Forearms', 'Arms', 'Arms', 'forearms'),

    ('quadriceps', 'Quadriceps', 'Legs', 'Legs', 'quadriceps'),
    ('hamstrings', 'Hamstrings', 'Legs', 'Legs', 'hamstrings'),
    ('gluteus_maximus', 'Gluteus Maximus', 'Glutes', 'Glutes', 'gluteus_maximus'),
    ('gluteus_medius', 'Gluteus Medius', 'Glutes', 'Glutes', 'gluteus_medius'),
    ('adductors', 'Adductors', 'Legs', 'Legs', 'adductors'),
    ('calves', 'Calves', 'Legs', 'Legs', 'calves'),

    ('rectus_abdominis', 'Rectus Abdominis', 'Core', 'Core', 'rectus_abdominis'),
    ('obliques', 'Obliques', 'Core', 'Core', 'obliques'),
    ('transverse_abdominis', 'Transverse Abdominis', 'Core', 'Core', 'transverse_abdominis')
ON CONFLICT (code) DO NOTHING;

INSERT INTO exercises (
    name,
    slug,
    category,
    exercise_family,
    movement_pattern,
    equipment,
    is_bodyweight,
    is_unilateral
)
VALUES
    ('Back Squat', 'back-squat', 'Strength', 'squat', 'Squat', 'Barbell', FALSE, FALSE),
    ('Front Squat', 'front-squat', 'Strength', 'squat', 'Squat', 'Barbell', FALSE, FALSE),
    ('Paused Squat', 'paused-squat', 'Strength', 'squat', 'Squat', 'Barbell', FALSE, FALSE),

    ('Bench Press', 'bench-press', 'Strength', 'bench_press', 'Horizontal Press', 'Barbell', FALSE, FALSE),
    ('Close Grip Bench Press', 'close-grip-bench-press', 'Strength', 'bench_press', 'Horizontal Press', 'Barbell', FALSE, FALSE),
    ('Incline Bench Press', 'incline-bench-press', 'Strength', 'bench_press', 'Incline Press', 'Barbell', FALSE, FALSE),
    ('Dumbbell Bench Press', 'dumbbell-bench-press', 'Accessory', 'bench_press', 'Horizontal Press', 'Dumbbell', FALSE, FALSE),

    ('Overhead Press', 'overhead-press', 'Strength', 'vertical_press', 'Vertical Press', 'Barbell', FALSE, FALSE),

    ('Deadlift', 'deadlift', 'Strength', 'deadlift', 'Hinge', 'Barbell', FALSE, FALSE),
    ('Romanian Deadlift', 'romanian-deadlift', 'Strength', 'deadlift', 'Hinge', 'Barbell', FALSE, FALSE),

    ('Barbell Row', 'barbell-row', 'Strength', 'horizontal_pull', 'Horizontal Pull', 'Barbell', FALSE, FALSE),
    ('Dumbbell Row', 'dumbbell-row', 'Accessory', 'horizontal_pull', 'Horizontal Pull', 'Dumbbell', FALSE, TRUE),

    ('Pull Up', 'pull-up', 'Strength', 'vertical_pull', 'Vertical Pull', 'Bodyweight', TRUE, FALSE),
    ('Chin Up', 'chin-up', 'Strength', 'vertical_pull', 'Vertical Pull', 'Bodyweight', TRUE, FALSE),
    ('Lat Pulldown', 'lat-pulldown', 'Accessory', 'vertical_pull', 'Vertical Pull', 'Cable', FALSE, FALSE),

    ('Leg Press', 'leg-press', 'Accessory', 'squat', 'Squat', 'Machine', FALSE, FALSE),
    ('Leg Extension', 'leg-extension', 'Accessory', 'knee_extension', 'Knee Extension', 'Machine', FALSE, FALSE),
    ('Hamstring Curl', 'hamstring-curl', 'Accessory', 'knee_flexion', 'Knee Flexion', 'Machine', FALSE, FALSE),
    ('Calf Raise', 'calf-raise', 'Accessory', 'calf_raise', 'Calf Raise', 'Machine', FALSE, FALSE),

    ('Bulgarian Split Squat', 'bulgarian-split-squat', 'Accessory', 'single_leg_squat', 'Single Leg Squat', 'Dumbbell', FALSE, TRUE),
    ('Lunge', 'lunge', 'Accessory', 'single_leg_squat', 'Single Leg Squat', 'Dumbbell', FALSE, TRUE),

    ('Bicep Curl', 'bicep-curl', 'Accessory', 'elbow_flexion', 'Elbow Flexion', 'Dumbbell', FALSE, FALSE),
    ('Tricep Pushdown', 'tricep-pushdown', 'Accessory', 'elbow_extension', 'Elbow Extension', 'Cable', FALSE, FALSE),

    ('Plank', 'plank', 'Core', 'core_anti_extension', 'Anti Extension', 'Bodyweight', TRUE, FALSE),
    ('Hanging Leg Raise', 'hanging-leg-raise', 'Core', 'core_flexion', 'Hip Flexion', 'Bodyweight', TRUE, FALSE)
ON CONFLICT (slug) DO NOTHING;

WITH mappings(exercise_slug, muscle_code, role, sort_order) AS (
    VALUES
        ('back-squat', 'quadriceps', 'PRIMARY', 1),
        ('back-squat', 'gluteus_maximus', 'PRIMARY', 2),
        ('back-squat', 'adductors', 'SECONDARY', 3),
        ('back-squat', 'hamstrings', 'SECONDARY', 4),
        ('back-squat', 'erector_spinae', 'SUPPORTING', 5),
        ('back-squat', 'rectus_abdominis', 'SUPPORTING', 6),

        ('front-squat', 'quadriceps', 'PRIMARY', 1),
        ('front-squat', 'gluteus_maximus', 'SECONDARY', 2),
        ('front-squat', 'adductors', 'SECONDARY', 3),
        ('front-squat', 'erector_spinae', 'SUPPORTING', 4),
        ('front-squat', 'rectus_abdominis', 'SUPPORTING', 5),

        ('paused-squat', 'quadriceps', 'PRIMARY', 1),
        ('paused-squat', 'gluteus_maximus', 'PRIMARY', 2),
        ('paused-squat', 'adductors', 'SECONDARY', 3),
        ('paused-squat', 'erector_spinae', 'SUPPORTING', 4),
        ('paused-squat', 'rectus_abdominis', 'SUPPORTING', 5),

        ('bench-press', 'pectoralis_major_sternal', 'PRIMARY', 1),
        ('bench-press', 'anterior_deltoid', 'SECONDARY', 2),
        ('bench-press', 'triceps_brachii', 'SECONDARY', 3),
        ('bench-press', 'pectoralis_major_clavicular', 'SECONDARY', 4),

        ('close-grip-bench-press', 'triceps_brachii', 'PRIMARY', 1),
        ('close-grip-bench-press', 'pectoralis_major_sternal', 'SECONDARY', 2),
        ('close-grip-bench-press', 'anterior_deltoid', 'SECONDARY', 3),

        ('incline-bench-press', 'pectoralis_major_clavicular', 'PRIMARY', 1),
        ('incline-bench-press', 'anterior_deltoid', 'PRIMARY', 2),
        ('incline-bench-press', 'triceps_brachii', 'SECONDARY', 3),
        ('incline-bench-press', 'pectoralis_major_sternal', 'SECONDARY', 4),

        ('dumbbell-bench-press', 'pectoralis_major_sternal', 'PRIMARY', 1),
        ('dumbbell-bench-press', 'anterior_deltoid', 'SECONDARY', 2),
        ('dumbbell-bench-press', 'triceps_brachii', 'SECONDARY', 3),

        ('overhead-press', 'anterior_deltoid', 'PRIMARY', 1),
        ('overhead-press', 'lateral_deltoid', 'PRIMARY', 2),
        ('overhead-press', 'triceps_brachii', 'SECONDARY', 3),
        ('overhead-press', 'upper_trapezius', 'SECONDARY', 4),
        ('overhead-press', 'pectoralis_major_clavicular', 'SECONDARY', 5),
        ('overhead-press', 'rectus_abdominis', 'SUPPORTING', 6),
        ('overhead-press', 'obliques', 'SUPPORTING', 7),

        ('deadlift', 'gluteus_maximus', 'PRIMARY', 1),
        ('deadlift', 'hamstrings', 'PRIMARY', 2),
        ('deadlift', 'erector_spinae', 'PRIMARY', 3),
        ('deadlift', 'quadriceps', 'SECONDARY', 4),
        ('deadlift', 'latissimus_dorsi', 'SUPPORTING', 5),
        ('deadlift', 'upper_trapezius', 'SUPPORTING', 6),
        ('deadlift', 'forearms', 'SUPPORTING', 7),

        ('romanian-deadlift', 'hamstrings', 'PRIMARY', 1),
        ('romanian-deadlift', 'gluteus_maximus', 'PRIMARY', 2),
        ('romanian-deadlift', 'erector_spinae', 'SECONDARY', 3),
        ('romanian-deadlift', 'forearms', 'SUPPORTING', 4),

        ('barbell-row', 'latissimus_dorsi', 'PRIMARY', 1),
        ('barbell-row', 'middle_trapezius', 'PRIMARY', 2),
        ('barbell-row', 'rhomboids', 'PRIMARY', 3),
        ('barbell-row', 'posterior_deltoid', 'SECONDARY', 4),
        ('barbell-row', 'biceps_brachii', 'SECONDARY', 5),
        ('barbell-row', 'erector_spinae', 'SUPPORTING', 6),

        ('dumbbell-row', 'latissimus_dorsi', 'PRIMARY', 1),
        ('dumbbell-row', 'middle_trapezius', 'SECONDARY', 2),
        ('dumbbell-row', 'rhomboids', 'SECONDARY', 3),
        ('dumbbell-row', 'biceps_brachii', 'SECONDARY', 4),

        ('pull-up', 'latissimus_dorsi', 'PRIMARY', 1),
        ('pull-up', 'biceps_brachii', 'SECONDARY', 2),
        ('pull-up', 'middle_trapezius', 'SECONDARY', 3),
        ('pull-up', 'rhomboids', 'SECONDARY', 4),
        ('pull-up', 'forearms', 'SUPPORTING', 5),

        ('chin-up', 'latissimus_dorsi', 'PRIMARY', 1),
        ('chin-up', 'biceps_brachii', 'PRIMARY', 2),
        ('chin-up', 'middle_trapezius', 'SECONDARY', 3),
        ('chin-up', 'forearms', 'SUPPORTING', 4),

        ('lat-pulldown', 'latissimus_dorsi', 'PRIMARY', 1),
        ('lat-pulldown', 'biceps_brachii', 'SECONDARY', 2),
        ('lat-pulldown', 'middle_trapezius', 'SECONDARY', 3),

        ('leg-press', 'quadriceps', 'PRIMARY', 1),
        ('leg-press', 'gluteus_maximus', 'SECONDARY', 2),
        ('leg-press', 'hamstrings', 'SECONDARY', 3),

        ('leg-extension', 'quadriceps', 'PRIMARY', 1),
        ('hamstring-curl', 'hamstrings', 'PRIMARY', 1),
        ('calf-raise', 'calves', 'PRIMARY', 1),

        ('bulgarian-split-squat', 'quadriceps', 'PRIMARY', 1),
        ('bulgarian-split-squat', 'gluteus_maximus', 'PRIMARY', 2),
        ('bulgarian-split-squat', 'gluteus_medius', 'SECONDARY', 3),
        ('bulgarian-split-squat', 'adductors', 'SECONDARY', 4),

        ('lunge', 'quadriceps', 'PRIMARY', 1),
        ('lunge', 'gluteus_maximus', 'PRIMARY', 2),
        ('lunge', 'gluteus_medius', 'SECONDARY', 3),
        ('lunge', 'adductors', 'SECONDARY', 4),

        ('bicep-curl', 'biceps_brachii', 'PRIMARY', 1),
        ('bicep-curl', 'forearms', 'SECONDARY', 2),

        ('tricep-pushdown', 'triceps_brachii', 'PRIMARY', 1),

        ('plank', 'rectus_abdominis', 'PRIMARY', 1),
        ('plank', 'transverse_abdominis', 'PRIMARY', 2),
        ('plank', 'obliques', 'SECONDARY', 3),
        ('plank', 'gluteus_maximus', 'SUPPORTING', 4),

        ('hanging-leg-raise', 'rectus_abdominis', 'PRIMARY', 1),
        ('hanging-leg-raise', 'obliques', 'SECONDARY', 2),
        ('hanging-leg-raise', 'forearms', 'SUPPORTING', 3)
)
INSERT INTO exercise_muscles (
    exercise_id,
    muscle_id,
    role,
    sort_order
)
SELECT
    e.id,
    m.id,
    mappings.role,
    mappings.sort_order
FROM mappings
         JOIN exercises e ON e.slug = mappings.exercise_slug
         JOIN muscles m ON m.code = mappings.muscle_code
ON CONFLICT (exercise_id, muscle_id, role) DO NOTHING;