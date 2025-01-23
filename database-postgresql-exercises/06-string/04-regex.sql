-- https://pgexercises.com/questions/string/reg.html

select
  memid,
  telephone
from cd.members
where telephone ~ '[()]';
