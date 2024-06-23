package models

import "gorm.io/gorm"

type Image struct {
	gorm.Model
	UserId      string
	Title       string
	Author      string
	Description *string
	URL         string
	Likes       uint
	Status

	Comments []Comment
}
