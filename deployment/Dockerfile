# syntax=docker/dockerfile:experimental
FROM node:10 as build-deps
WORKDIR /usr/src/app/

# Install npm deps
RUN mkdir -p -m 0600 ~/.ssh && \
    ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts && \
    ssh-keygen -F github.com -l -E sha256 \
        | grep -q "SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8"
RUN git config --system url."ssh://git@github.com/".insteadOf "https://github.com/"

COPY package.json package-lock.json ./
RUN --mount=type=ssh mkdir -p /var/ssh && \
    GIT_SSH_COMMAND="ssh -o \"ControlMaster auto\" -o \"ControlPersist 300\" -o \"ControlPath /var/ssh/%r@%h:%p\"" \
    npm install

# Copy src
COPY ./tsconfig.json ./
COPY ./public/ ./public/
COPY ./src/ ./src/

# Make production build
RUN npm run build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY ./deployment/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
