package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	UserID  uint
	ImageID uint
	Content string
}
