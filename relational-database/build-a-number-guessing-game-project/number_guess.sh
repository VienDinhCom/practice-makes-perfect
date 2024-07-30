#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

SECRET_NUMBER=$((RANDOM % 1000 + 1))
NUMBER_OF_GUESSES=0

echo "Enter your username:"
read USERNAME

USER_SELECTED_ID=$($PSQL "select user_id from users where username='$USERNAME'")

if [[ -z $USER_SELECTED_ID ]]
then
  INSERT_USER_RESULT=$($PSQL "insert into users(username) values('$USERNAME')")

  if [[ $INSERT_USER_RESULT == 'INSERT 0 1' ]]
  then
    echo -e "\nWelcome, $USERNAME! It looks like this is your first time here."

    USER_SELECTED_ID=$($PSQL "select user_id from users where username='$USERNAME'")
  fi
else
  GAMES_PLAYED=$($PSQL "select count(*) from games where user_id=$USER_SELECTED_ID")
  BEST_GAME_GUESSES=$($PSQL "select min(number_of_guesses) from games where user_id=$USER_SELECTED_ID")

  echo -e "\nWelcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME_GUESSES guesses."
fi

READ_GUESSED_NUMBER() {
  read GUESSED_NUMBER

  (( NUMBER_OF_GUESSES++ ))

  if [[ ! $GUESSED_NUMBER =~ ^[0-9]+$ ]]
  then
    echo -e "\nThat is not an integer, guess again:"
    read GUESSED_NUMBER
  fi
}

until [[ $GUESSED_NUMBER == $SECRET_NUMBER ]]
do

  if [[ -z $GUESSED_NUMBER ]]
  then 
    echo -e "\nGuess the secret number between 1 and 1000:"
    READ_GUESSED_NUMBER
  fi

  if [[ $GUESSED_NUMBER > $SECRET_NUMBER ]]
  then
    echo -e "\nIt's lower than that, guess again:"
    READ_GUESSED_NUMBER
  fi

  if [[ $GUESSED_NUMBER < $SECRET_NUMBER ]]
  then
    echo -e "\nIt's higher than that, guess again:"
    READ_GUESSED_NUMBER
  fi
  
done

INSERT_GAME_RESULT=$($PSQL "insert into games(user_id, secret_number, number_of_guesses) values($USER_SELECTED_ID, $SECRET_NUMBER, $NUMBER_OF_GUESSES)")

if [[ $INSERT_GAME_RESULT == 'INSERT 0 1' ]]
then
  echo -e "\nYou guessed it in $NUMBER_OF_GUESSES tries. The secret number was $SECRET_NUMBER. Nice job!"
fi








