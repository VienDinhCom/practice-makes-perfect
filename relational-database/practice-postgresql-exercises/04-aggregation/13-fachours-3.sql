-- https://pgexercises.com/questions/aggregates/fachours3.html

select
  bks.facid,
  facs.name,
  round(sum(bks.slots) * 0.5, 2)
from cd.bookings bks
inner join cd.facilities facs using(facid)
group by bks.facid, facs.facid
order by facid;