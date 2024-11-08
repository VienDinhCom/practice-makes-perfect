-- https://pgexercises.com/questions/joins/simplejoin.html

select starttime from cd.bookings bks
inner join cd.members mems using(memid)
where mems.firstname = 'David' and mems.surname = 'Farrell';