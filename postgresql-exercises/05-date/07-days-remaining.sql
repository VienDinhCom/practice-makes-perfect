-- https://pgexercises.com/questions/date/daysremaining.html

select date_trunc('month', date + interval '1 month') - date from (select date_trunc('day', '2012-02-11 01:00:00'::timestamp) as date) as subquery;


