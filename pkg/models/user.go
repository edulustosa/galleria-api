package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username          string
	Email             string `gorm:"unique"`
	PasswordHash      string
	Bio               *string
	ProfilePictureURL *string
	Role

	Images        []Image
	Comments      []Comment
	Notifications []Notification
}
