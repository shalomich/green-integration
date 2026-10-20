# green-integration

React + TypeScript приложение на Vite (MUI, React Query, React Hook Form, Zod).

## Требования

- Node.js 26.5.0 (версия зафиксирована в `package.json` через `engines` и `volta`)
- npm

## Запуск проекта

1. Установите зависимости:

   ```bash
   npm install
   ```

2. (Опционально) Укажите адрес API. Создайте файл `.env.local` в корне проекта:

   ```
   VITE_API_URL=https://your-api-url
   ```

   Если переменная не задана, используется пустая строка (запросы идут на тот же origin).

3. Запустите dev-сервер:

   ```bash
   npm start
   ```

   Приложение будет доступно по адресу http://localhost:3000.

## Скрипты

| Команда | Описание |
| --- | --- |
| `npm start` | Запуск dev-сервера |
| `npm run build` | Production-сборка в папку `build` |
| `npm run preview` | Локальный просмотр production-сборки |
| `npm test` | Запуск тестов (Vitest) |
| `npm run lint` | Проверка ESLint и Stylelint |
| `npm run lint:fix` | Проверка с автоисправлением |
