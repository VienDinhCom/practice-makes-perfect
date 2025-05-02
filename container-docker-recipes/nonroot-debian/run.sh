docker compose down

PUID=$(id -u) PGID=$(id -g) docker compose up --build

docker compose down