-- https://pgexercises.com/questions/string/pad.html

select
  lpad(zipcode::text, 5, '0') as zip
from cd.members
order by zip;