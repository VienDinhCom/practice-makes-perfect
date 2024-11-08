-- https://pgexercises.com/questions/joins/tjsub.html

with costs as (
  select
    mems.firstname || ' ' || mems.surname as member,
    facs.name as facility,
    case
      when mems.memid = 0 then facs.guestcost
      else facs.membercost
    end * bks.slots as cost
  from cd.bookings bks
  inner join cd.members mems using(memid)
  inner join cd.facilities facs using(facid)
  where
    bks.starttime >= '2012-09-14'
    and bks.starttime < '2012-09-15'
  order by cost desc
)

select * from costs where cost > 30;