package services

import (
	"errors"

	"github.com/edulustosa/galleria-api/internal/models"
	"github.com/edulustosa/galleria-api/internal/repositories"
)

type SubmitImage struct {
	usersRepository  repositories.UsersRepository
	imagesRepository repositories.ImagesRepository
}

func NewSubmitService(ur repositories.UsersRepository, ir repositories.ImagesRepository) SubmitImage {
	return SubmitImage{
		usersRepository:  ur,
		imagesRepository: ir,
	}
}

type SubmitImageRequest struct {
	UserId      uint
	Title       string
	Author      *string
	Description *string
	URL         string
}

func (si *SubmitImage) Execute(req SubmitImageRequest) (*models.Image, error) {
	_, err := si.usersRepository.FindById(req.UserId)
	if err != nil {
		return nil, errors.New("invalid credentials")
	}

	image := models.Image{
		UserId:      req.UserId,
		Title:       req.Title,
		Author:      req.Author,
		Description: req.Description,
		URL:         req.URL,
		Status:      models.PENDING,
		Likes:       0,
	}

	return si.imagesRepository.Create(&image)
}
