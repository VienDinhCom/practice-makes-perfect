-- https://pgexercises.com/questions/updates/deletewh2.html

delete from cd.members
where memid not in (select memid from cd.bookings);