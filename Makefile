install: # копирование пакетов
	npm ci

link: # установка пакета
	npm link

publish: # отладка
	npm publish --dry-run

lint: # запускает линтер
	npx eslint .

test: # запускает тест
	npm run test

test-coverage: # запускает тест-кавер
	npm test -- --coverage --coverageProvider=v8