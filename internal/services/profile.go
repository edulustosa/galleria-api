package services

import (
	"github.com/edulustosa/galleria-api/internal/models"
	"github.com/edulustosa/galleria-api/internal/repositories"
)

type Profile struct {
	usersRepository repositories.UsersRepository
}

func NewProfileService(ur repositories.UsersRepository) Profile {
	return Profile{ur}
}

type EditProfileRequest struct {
	Id                uint
	Username          string
	Bio               string
	ProfilePictureUrl string
}

func (p *Profile) Edit(req EditProfileRequest) (*models.User, error) {
	updatedUser, err := p.usersRepository.UpdateById(req.Id, repositories.EditProfileInput{
		Username:          req.Username,
		Bio:               req.Bio,
		ProfilePictureUrl: req.ProfilePictureUrl,
	})
	if err != nil {
		return nil, err
	}

	return updatedUser, nil
}

func (p *Profile) Get(id uint) (*models.User, error) {
	updatedUser, err := p.usersRepository.FindById(id)
	if err != nil {
		return nil, err
	}

	return updatedUser, nil
}
