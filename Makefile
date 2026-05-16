.PHONY: dev start docker-up docker-down db-migrate db-seed db-studio

dev:
	npm run dev

start:
	npm run start

docker-up:
	docker compose up -d postgres

docker-down:
	docker compose down

db-migrate:
	cd apps/server && npm run db:migrate

db-seed:
	cd apps/server && npm run db:seed

db-studio:
	cd apps/server && npm run db:studio
