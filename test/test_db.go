package test

import (
	"log"

	"github.com/edulustosa/galleria-api/internal/env"
	"github.com/edulustosa/galleria-api/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var TestDB *gorm.DB

func InitTestDB(dsn string) {
	var err error
	TestDB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to test database: ", err)
	}

	// Recreate schema
	err = TestDB.Migrator().DropTable(&models.User{}, &models.Image{}, &models.Comment{}, &models.Notification{})
	if err != nil {
		log.Fatalf("Failed to drop tables: %v", err)
	}
	err = TestDB.AutoMigrate(&models.User{}, &models.Image{}, &models.Comment{}, &models.Notification{})
	if err != nil {
		log.Fatalf("Failed to migrate test database: %v", err)
	}
}

func SetupTestDB() *gorm.DB {
	databaseURL := env.LoadEnv().DatabaseURL
	InitTestDB(databaseURL)
	return TestDB
}
