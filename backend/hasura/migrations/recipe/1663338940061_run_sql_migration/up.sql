CREATE OR REPLACE FUNCTION public.average_rating(recipe_row recipe)
 RETURNS double precision
 LANGUAGE sql
 STABLE
AS $function$
    select AVG(rating) FROM rating where recipe_id = recipe_row.id;
$function$;
