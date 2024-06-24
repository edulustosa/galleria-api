package repositories

import (
	"github.com/edulustosa/galleria-api/internal/models"
	"gorm.io/gorm"
)

type ImagesRepository interface {
	FindById(id uint) (*models.Image, error)
	Create(image *models.Image) (*models.Image, error)
}

type imagesRepository struct {
	db *gorm.DB
}

func NewImagesRepository(db *gorm.DB) ImagesRepository {
	return &imagesRepository{db}
}

func (ir *imagesRepository) FindById(id uint) (*models.Image, error) {
	var image models.Image

	if err := ir.db.First(&image, id).Error; err != nil {
		return nil, err
	}

	return &image, nil
}

func (ir *imagesRepository) Create(image *models.Image) (*models.Image, error) {
	if err := ir.db.Create(image).Error; err != nil {
		return nil, err
	}

	return image, nil
}
