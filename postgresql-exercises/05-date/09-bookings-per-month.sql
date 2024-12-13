-- https://pgexercises.com/questions/date/bookingspermonth.html

with subquery as (
  select
    date_trunc('month', starttime) as month
  from cd.bookings
)

select
  month,
  count(*)
from subquery
group by month
order by month;

-- OR

select
  date_trunc('month', starttime) as month,
  count(*)
from cd.bookings
group by month
order by month;