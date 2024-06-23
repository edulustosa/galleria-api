package main

import (
	"github.com/edulustosa/galleria-api/pkg/db"
	"github.com/edulustosa/galleria-api/pkg/env"
)

func main() {
	databaseURL := env.LoadEnv().DatabaseURL

	db.Init(databaseURL)
}
