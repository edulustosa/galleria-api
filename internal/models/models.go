package models

import "gorm.io/gorm"

type Role string

const (
	USER    Role = "USER"
	CURATOR Role = "CURATOR"
)

type Status string

const (
	PENDING  Status = "PENDING"
	APPROVED Status = "APPROVED"
	REJECTED Status = "REJECTED"
)

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

type Image struct {
	gorm.Model
	UserId      uint
	Title       string
	Author      *string
	Description *string
	URL         string
	Likes       uint
	Status

	Comments []Comment
}

type Notification struct {
	gorm.Model
	UserID  uint
	Message string
	Read    bool
}

type Comment struct {
	gorm.Model
	UserID  uint
	ImageID uint
	Content string
}
