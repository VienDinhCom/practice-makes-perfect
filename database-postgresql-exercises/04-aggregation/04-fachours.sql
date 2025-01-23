-- https://pgexercises.com/questions/aggregates/fachours.html

select facid, sum(slots) from cd.bookings
group by facid
order by facid;