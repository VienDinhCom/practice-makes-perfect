#! /bin/bash

PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"

echo -e "\n~~~~~ MY SALON ~~~~~\n"

echo -e "Welcome to My Salon, how can I help you?\n"

BOOKING_MENU() {

  if [[ $1 ]]
  then
    echo -e "\n$1\n"
  fi

  SERVICES=$($PSQL "select service_id, name from services")

  echo "$SERVICES" | sed 's/ | /) /; s/\s*//';

  read SERVICE_ID_SELECTED;

  if [[ ! $SERVICE_ID_SELECTED =~ ^[0-9]+$ ]]
  then
    SERVICE_NAME_SELECTED=$(echo $($PSQL "select name from services where service_id=$SERVICE_ID_SELECTED") | sed -E 's/^ *//')

    if [[ -z $SERVICE_NAME_SELECTED ]]
    then
      BOOKING_MENU "I could not find that service. What would you like today?"
    else
      echo -e "\nWhat's your phone number?"
      read CUSTOMER_PHONE

      CUSTOMER_NAME=$(echo $($PSQL "select name from customers where phone='$CUSTOMER_PHONE'") | sed -E 's/^ *//')

      if [[ -z $CUSTOMER_NAME ]]
      then
        echo -e "\nI don't have a record for that phone number, what's your name?"
        read CUSTOMER_NAME

        INSERT_CUSTOMER_RESULT=$($PSQL "insert into customers(name, phone) values('$CUSTOMER_NAME', '$CUSTOMER_PHONE')")
      fi

      CUSTOMER_ID_SELECTED=$($PSQL "select customer_id from customers where phone='$CUSTOMER_PHONE'")

      echo -e "\nWhat time would you like your $SERVICE_NAME_SELECTED, $CUSTOMER_NAME?"
      read SERVICE_TIME

      INSERT_APPOINTMENT_RESULT=$($PSQL "insert into appointments(customer_id, service_id, time) values($CUSTOMER_ID_SELECTED, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")

      echo -e "\nI have put you down for a $SERVICE_NAME_SELECTED at $SERVICE_TIME, $CUSTOMER_NAME."
    fi

  else
    BOOKING_MENU "I could not find that service. What would you like today?"
  fi


  
}

BOOKING_MENU