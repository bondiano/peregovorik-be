up:
	docker-compose up -d
down:
	docker-compose down
start:
	docker-compose up --build
prod:
	docker-compose -f ./docker-compose.prod.yaml up --build -d
debug:
	DEBUG_CMD=start:debug docker-compose up
build:
	docker-compose build --no-cache
clear-volumes:
	sudo rm -rf ./data_mongo/*
