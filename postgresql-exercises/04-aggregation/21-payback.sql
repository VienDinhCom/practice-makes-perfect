-- https://pgexercises.com/questions/aggregates/payback.html

select
  facs.name,
  facs.initialoutlay / (sum(
    case
      when bks.memid=0 then facs.guestcost
      else facs.membercost
    end * slots
  ) / 3 - facs.monthlymaintenance) as months
from cd.bookings bks
inner join cd.facilities facs using(facid)
group by facs.facid, bks.facid
order by name;