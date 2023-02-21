install: # копирование пакетов
	npm ci

link: # установка пакета
	npm link

publish: # отладка
	npm publish --dry-run

lint: # запускает линтер
	npx eslint .

test: # запускает тест
    npm test