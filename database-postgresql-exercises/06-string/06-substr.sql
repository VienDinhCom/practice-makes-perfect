-- https://pgexercises.com/questions/string/substr.html

select
  substr(surname, 1, 1) as letter,
  count(*)
from cd.members
group by letter
order by letter;