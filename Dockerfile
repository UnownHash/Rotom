FROM node:18 AS build-env
COPY . /app
WORKDIR /app

RUN npm ci --no-save
RUN npm run build
# re-install without dev dependencies
RUN npm ci --omit=dev

FROM gcr.io/distroless/nodejs:18
COPY --from=build-env /app /rotom
WORKDIR /rotom
CMD ["dist/packages/server/main.js"]
