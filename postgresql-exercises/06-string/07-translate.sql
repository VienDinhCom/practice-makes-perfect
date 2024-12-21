-- https://pgexercises.com/questions/string/translate.html

select
  memid,
  regexp_replace(telephone, '\D', '', 'g')
from cd.members

-- OR

select
  memid,
  translate(telephone, '-() ', '')
from cd.members