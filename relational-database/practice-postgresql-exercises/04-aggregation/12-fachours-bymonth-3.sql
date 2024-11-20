-- https://pgexercises.com/questions/aggregates/fachoursbymonth3.html

select
  facid,
  extract(month from starttime) as month,
  sum(slots) as slots
from cd.bookings
where extract(year from starttime) = 2012
group by facid, month

union

select
  facid,
  null,
  sum(slots) as slots
from cd.bookings
where extract(year from starttime) = 2012
group by facid

union

select
  null,
  null,
  sum(slots) as slots
from cd.bookings
where extract(year from starttime) = 2012

order by facid, month, slots;

--OR

