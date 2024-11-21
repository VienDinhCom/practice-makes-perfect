-- https://pgexercises.com/questions/aggregates/facrev3.html

select
  facs.name,
  rank() over(order by sum(case when bks.memid=0 then facs.guestcost else facs.membercost end * slots) desc) as rank
from cd.bookings bks
inner join cd.facilities facs using(facid)
group by bks.facid, facs.facid
order by rank, name
limit 3;