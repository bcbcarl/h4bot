include common.mk

ARGS ?=

.PHONY: $(YARN)
$(YARN):
	@$(COMPOSE) run $(SERVICE) $(YARN) $(ARGS)
