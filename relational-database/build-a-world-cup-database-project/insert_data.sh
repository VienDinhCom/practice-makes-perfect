#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

echo $($PSQL "truncate teams, games")

INSERT_TEAM() {
  
  TEAM_ID="$($PSQL "select team_id from teams where name='$1'")"

  if [[ -z $TEAM_ID ]]
  then
    INSERT_TEAM_RESULT="$($PSQL "insert into teams(name) values('$1')")"

    if [[ $INSERT_TEAM_RESULT == 'INSERT 0 1' ]]
    then
      echo Inserted into teams, $1
    fi
  fi 
}

cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
  if [[ $YEAR != year ]]
  then
    INSERT_TEAM "$WINNER"
    INSERT_TEAM "$OPPONENT"

    WINNER_ID="$($PSQL "select team_id from teams where name='$WINNER'")"
    OPPONENT_ID="$($PSQL "select team_id from teams where name='$OPPONENT'")"

    INSERT_GAME_RESULT=$($PSQL "insert into games(year, round, winner_id, opponent_id, winner_goals, opponent_goals) values($YEAR, '$ROUND', $WINNER_ID, $OPPONENT_ID, $WINNER_GOALS, $OPPONENT_GOALS)") 

    if [[ $INSERT_GAME_RESULT == 'INSERT 0 1' ]]
    then
      echo Inserted into games, $WINNER vs $OPPONENT
    fi
  fi
done
