package db

import (
	"log"

	"github.com/edulustosa/galleria-api/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Gorm *gorm.DB

func Init(dns string) {
	var err error

	Gorm, err = gorm.Open(postgres.Open(dns), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}

	// Auto-migrate models
	err = Gorm.AutoMigrate(
		&models.User{},
		&models.Image{},
		&models.Comment{},
		&models.Notification{},
	)
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}
}
