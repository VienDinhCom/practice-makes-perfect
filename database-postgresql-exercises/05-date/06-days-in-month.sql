-- https://pgexercises.com/questions/date/daysinmonth.html

with date as (
  select
    extract(month from date) as month,
    date
  from generate_series('2012-01-01'::timestamp, timestamp '2012-12-31', interval '1 day') as date
)

select
  month,
  count(*) || ' days' as length
from date
group by month
order by month;