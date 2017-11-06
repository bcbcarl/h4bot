RM := rm -rf

DOCKER := docker
COMPOSE := docker-compose
YARN := yarn

SERVICE := h4bot

.PHONY: all
all:: build

.PHONY: clean
clean::
	@$(COMPOSE) rm -fs
	@$(DOCKER) image prune -f

.PHONY: distclean
distclean:: clean
	@$(RM) $(CURDIR)/node_modules
	@$(GIT) reset --hard
	@$(GIT) clean -dfx

.PHONY: build
build::
	@$(DOCKER) build -t $(SERVICE) $(CURDIR)

.PHONY: start
start::
	@$(COMPOSE) run $(SERVICE) $(YARN) --offline
	@$(COMPOSE) up

.PHONY: stop
stop::
	@$(COMPOSE) down
