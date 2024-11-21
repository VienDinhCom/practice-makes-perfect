-- https://pgexercises.com/questions/aggregates/fachours2.html

with slotsByFacid as (select facid, sum(slots) as totalslots from cd.bookings group by facid)

select facid, totalslots from slotsByFacid where totalslots = (select max(totalslots) from slotsByFacid);

-- OR

select facid, sum(slots) as slots from cd.bookings group by facid order by slots desc limit 1;