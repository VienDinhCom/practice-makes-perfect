#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

ELEMENT_SELECTOR="select atomic_number, symbol, name, atomic_mass, melting_point_celsius, boiling_point_celsius, type from elements inner join properties using(atomic_number) inner join types using(type_id)"

PRINT_ELEMENT() {
  echo $1 | while IFS="|" read ATOMIC_NUMBER SYMBOL NAME ATOMIC_MASS MELTING_POINT_CELSIUS BOILING_POINT_CELSIUS TYPE
  do
   echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT_CELSIUS celsius and a boiling point of $BOILING_POINT_CELSIUS celsius."
  done
}

NOT_FOUND_MESSAGE="I could not find that element in the database."

if [[ ! $1 ]]
then
  echo Please provide an element as an argument.
elif [[ $1 =~ ^[0-9]+$ ]]
then
  ELEMENT=$($PSQL "$ELEMENT_SELECTOR where atomic_number=$1")

  if [[ -z $ELEMENT ]]
  then
    echo $NOT_FOUND_MESSAGE
  else
    PRINT_ELEMENT "$ELEMENT"; 
  fi

else
  ELEMENT=$($PSQL "$ELEMENT_SELECTOR where symbol='$1' or name='$1'")

  if [[ -z $ELEMENT ]]
  then
    echo $NOT_FOUND_MESSAGE
  else
    PRINT_ELEMENT "$ELEMENT"; 
  fi
fi