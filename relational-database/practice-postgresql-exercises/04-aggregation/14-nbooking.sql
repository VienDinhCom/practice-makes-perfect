-- https://pgexercises.com/questions/aggregates/nbooking.html

select
  mems.surname,
  mems.firstname,
  bks.memid,
  min(bks.starttime)
from cd.bookings bks
inner join cd.members mems using(memid)
where bks.starttime > '2012-09-01'
group by bks.memid, mems.memid
order by memid;