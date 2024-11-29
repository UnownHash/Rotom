FROM node:22 AS build-env

COPY package.json package-lock.json /app/
WORKDIR /app

ENV HUSKY=0

RUN npm ci
COPY . /app
ENV NODE_ENV=production
RUN npm run build
# re-install without dev dependencies
RUN npm ci --omit=dev

FROM gcr.io/distroless/nodejs22-debian12

COPY --from=build-env /app /rotom
WORKDIR /rotom
CMD ["dist/packages/server/main.js"]
