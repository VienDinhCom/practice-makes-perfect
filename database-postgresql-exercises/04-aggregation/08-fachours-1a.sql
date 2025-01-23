-- https://pgexercises.com/questions/aggregates/fachours1a.html

select
  facid,
  sum(slots)
from cd.bookings
group by facid having sum(slots) > 1000
order by facid;