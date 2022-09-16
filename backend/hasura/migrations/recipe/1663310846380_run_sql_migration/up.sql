CREATE OR REPLACE FUNCTION public.IS_FAVORITE (recipe_row recipe, hasura_session json)
RETURNS boolean AS $$
SELECT EXISTS (
    SELECT 1
    FROM favorites A
    WHERE A.user_id = CAST((hasura_session ->> 'x-hasura-user-id') AS uuid) AND A.recipe_id = recipe_row.id
);
$$ LANGUAGE sql STABLE;
