-- https://pgexercises.com/questions/joins/threejoin.html

select distinct
  mems.firstname || ' ' || mems.surname as member,
  facs.name as facility
from cd.bookings bks
inner join cd.members mems using(memid)
inner join cd.facilities facs using(facid)
where facs.name like 'Tennis Court%'
order by member, facility;