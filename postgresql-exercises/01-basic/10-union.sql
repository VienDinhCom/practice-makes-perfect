-- https://pgexercises.com/questions/basic/union.html

select surname from cd.members
union
select name from cd.facilities;