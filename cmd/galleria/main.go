package main

import (
	"github.com/edulustosa/galleria-api/internal/db"
	"github.com/edulustosa/galleria-api/internal/env"
)

func main() {
	databaseURL := env.LoadEnv().DatabaseURL

	db.Init(databaseURL)
}
