
.PHONY: up down

up-node:
	@nodemon server

up-mysql:
	@docker-compose up

down:
	@docker-compose down -v --remove-orphans

run-sql:
	@docker exec -i mysql_container mysql -u root -ppassword groupomania < ./sql/main.sql
	