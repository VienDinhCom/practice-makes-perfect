-- https://pgexercises.com/questions/aggregates/fachoursbymonth2.html

select
  facid,
  extract(month from starttime) as month,
  sum(slots) as slots
from cd.bookings
where extract(year from starttime) = 2012
group by facid, month
order by facid, month, slots;