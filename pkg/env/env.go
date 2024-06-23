package env

import (
	"log"
	"os"

	"github.com/subosito/gotenv"
)

type Env struct {
	DatabaseURL string
}

func LoadEnv() Env {
	err := gotenv.Load("../.env")
	if err != nil {
		log.Fatal("Failed to load env file")
	}

	return Env{
		DatabaseURL: os.Getenv("DATABASE_URL"),
	}
}
