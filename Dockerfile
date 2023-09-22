FROM node:18-bullseye as builder
RUN mkdir /builder
WORKDIR /builder
COPY . .
RUN npm install
RUN npm run build

FROM node:18-alpine
RUN mkdir /dist
COPY --from=builder /builder/dist /dist
COPY --from=builder /builder/package.json /dist/package.json
WORKDIR /dist

RUN ls -l

RUN npm install --omit=dev
 

CMD ["node", "main"]
