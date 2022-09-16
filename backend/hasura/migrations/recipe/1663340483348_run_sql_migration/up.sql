CREATE OR REPLACE FUNCTION public.user_rates(recipe_row recipe, hasura_session json)
 RETURNS boolean
 LANGUAGE sql
 STABLE
AS $function$
SELECT EXISTS (
    SELECT 1
    FROM rating A
    WHERE A.user_id = CAST((hasura_session ->> 'x-hasura-user-id') as uuid)  AND A.recipe_id = recipe_row.id
);
$function$;
