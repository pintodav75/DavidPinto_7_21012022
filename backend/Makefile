
.PHONY: up down

up-node:
	@nodemon server

up-mysql:
	@docker-compose up

down:
	@docker-compose down

run-sql:
	@docker exec -i mysql_container mysql -u root -pubuntu groupomania < ./sql/main.sql
