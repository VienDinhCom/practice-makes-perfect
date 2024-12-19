-- https://pgexercises.com/questions/string/concat.html

select
  surname || ', ' || firstname as name
from cd.members;