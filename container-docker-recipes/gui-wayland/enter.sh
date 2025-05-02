xhost +si:localuser:$USER >/dev/null

docker exec -u user -it container alacritty