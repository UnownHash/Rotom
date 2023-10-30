FROM node:16 AS build-env
COPY . /app
WORKDIR /app

RUN npm ci
RUN npm run build
# re-install without dev dependencies
RUN npm ci --omit=dev

FROM gcr.io/distroless/nodejs:16
COPY --from=build-env /app /rotom
WORKDIR /rotom
CMD ["dist/packages/server/main.js"]
