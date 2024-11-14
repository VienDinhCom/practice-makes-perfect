-- https://pgexercises.com/questions/aggregates/fachoursbymonth.html

select facid, sum(slots) as slots from cd.bookings
where starttime >= '2012-09-01' and starttime < '2012-10-01'
group by facid
order by slots;