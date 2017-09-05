NAME=iac-app
VERSION=1.0
PORT_MAP=3300:3300

default: deploy

deploy: buildapp build push

# Build and run locally
buildl: buildapp build rund

build:
	docker build --rm -t pulpfree/$(NAME):$(VERSION) .

# Run in local development mode
rund:
	docker run --name $(NAME) --env NODE_ENV=development -p $(PORT_MAP) -d pulpfree/$(NAME):$(VERSION)

# production run command
# sudo docker run --name iac-app --env NODE_ENV=production -p 3300:3300 -d pulpfree/iac-app:1.0

# Push to remote docker repo
push:
	docker push pulpfree/$(NAME):$(VERSION)

buildapp:
	yarn build