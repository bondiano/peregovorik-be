up:
	docker-compose up -d
down:
	docker-compose down
start:
	docker-compose up --build
debug:
	DEBUG_CMD=start:debug docker-compose up
build:
	docker-compose build --no-cache
clear-volumes:
	sudo rm -rf ./data/*
