#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only --no-align -c"

echo -e "\n~~~~~ MY SALON ~~~~~"
echo -e "\nWelcome to My Salon, how can I help you?"

BOOKING_MENU(){

  if [[ $1 ]]
  then
    echo -e "\nI could not find that service. What would you like today?"
  fi

  SERVICES=$($PSQL "select service_id, name from services order by service_id")

  echo "$SERVICES" | while IFS="|" read SERVICE_ID SERVICE_NAME
  do
    echo "$SERVICE_ID) $SERVICE_NAME"
  done

  read SERVICE_ID_SELECTED

  if [[ ! $SERVICE_ID_SELECTED =~ ^[0-9]+$ ]]
  then
    BOOKING_MENU again
  else
    SERVICE_ID_SELECTED=$($PSQL "select service_id from services where service_id=$SERVICE_ID_SELECTED")

    if [[ -z $SERVICE_ID_SELECTED ]]
    then
      BOOKING_MENU again
    else
      echo -e "\nWhat's your phone number?"
      read CUSTOMER_PHONE

      CUSTOMER_NAME=$($PSQL "select name from customers where phone='$CUSTOMER_PHONE'")

      if [[ -z $CUSTOMER_NAME ]]
      then
        echo -e "\nI don't have a record for that phone number, what's your name?"
        read CUSTOMER_NAME

        INSERT_CUSTOMER_RESULT=$($PSQL "insert into customers(name, phone) values('$CUSTOMER_NAME', '$CUSTOMER_PHONE')")
      fi

      SERVICE_NAME=$($PSQL "select name from services where service_id=$SERVICE_ID_SELECTED")

      echo -e "\nWhat time would you like your $SERVICE_NAME, $CUSTOMER_NAME?"
      read SERVICE_TIME

      CUSTOMER_ID_SELECTED=$($PSQL "select customer_id from customers where phone='$CUSTOMER_PHONE'")
      INSERT_APPOINTMENT_RESULT=$($PSQL "insert into appointments(customer_id, service_id, time) values($CUSTOMER_ID_SELECTED, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")
      
      echo -e "\nI have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME."
    fi
  fi

}

BOOKING_MENU