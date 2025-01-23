-- https://pgexercises.com/questions/joins/simplejoin2.html

select
  starttime as start,
  name
from cd.bookings bks
inner join cd.facilities facs using(facid)
where
  facs.name like 'Tennis Court%'
  and bks.starttime >= '2012-09-21'
  and bks.starttime < '2012-09-22'
order by start;