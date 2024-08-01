#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

ELEMENTS_QUERY="select atomic_number, name, symbol, type, atomic_mass, melting_point_celsius, boiling_point_celsius from elements left join properties using(atomic_number) left join types using(type_id)"

PRINT_ELEMENT() {
  if [[ $ELEMENT ]]
  then
    echo $1 | while IFS="|" read ATOMIC_NUMBER NAME SYMBOL TYPE ATOMIC_MASS MELTING_POINT_CELSIUS BOILING_POINT_CELSIUS
    do
      echo -e "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT_CELSIUS celsius and a boiling point of $BOILING_POINT_CELSIUS celsius."  
    done
  else 
    echo "I could not find that element in the database."
  fi
}

if [[ ! $1 ]]
then
  echo "Please provide an element as an argument."
elif [[ $1 =~ ^[0-9]+$ ]]
then
  ELEMENT=$($PSQL "$ELEMENTS_QUERY where atomic_number=$1")
  PRINT_ELEMENT "$ELEMENT"
else
  ELEMENT=$($PSQL "$ELEMENTS_QUERY where symbol='$1' or name='$1'")
  PRINT_ELEMENT "$ELEMENT"
fi