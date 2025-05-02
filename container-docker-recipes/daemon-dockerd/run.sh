export PUID=$(id -u)
export PGID=$(id -g)

docker compose up --build

docker compose down