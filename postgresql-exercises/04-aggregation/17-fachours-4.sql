-- https://pgexercises.com/questions/aggregates/fachours4.html


with rank as (
  select
    facid,
    sum(slots) as slots,
    rank() over (order by sum(slots) desc)
  from cd.bookings
  group by facid
)

select facid, slots from rank where rank = 1;


-- OR

select
  facid,
  sum(slots) as slots
from cd.bookings
group by facid
order by slots desc 
limit 1;
