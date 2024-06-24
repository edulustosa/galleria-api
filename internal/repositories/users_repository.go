package repositories

import (
	"github.com/edulustosa/galleria-api/internal/models"
	"gorm.io/gorm"
)

type EditProfileInput struct {
	Username          string
	Bio               string
	ProfilePictureUrl string
}

type UsersRepository interface {
	FindById(id uint) (*models.User, error)
	FindByEmail(email string) (*models.User, error)
	Create(username, email, passwordHash string) (*models.User, error)
	UpdateById(id uint, input EditProfileInput) (*models.User, error)
}

type usersRepository struct {
	db *gorm.DB
}

func NewUsersRepository(db *gorm.DB) UsersRepository {
	return &usersRepository{db}
}

func (ur *usersRepository) FindById(id uint) (*models.User, error) {
	var user models.User

	err := ur.db.First(&user, id).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (ur *usersRepository) FindByEmail(email string) (*models.User, error) {
	var user models.User

	err := ur.db.Where("email = ?", email).First(&user).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (ur *usersRepository) Create(username, email, passwordHash string) (*models.User, error) {
	user := models.User{
		Username:     username,
		Email:        email,
		PasswordHash: passwordHash,
		Role:         models.USER,
	}

	err := ur.db.Create(&user).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (ur *usersRepository) UpdateById(id uint, input EditProfileInput) (*models.User, error) {
	user, err := ur.FindById(id)
	if err != nil {
		return nil, err
	}

	if input.Username != "" {
		user.Username = input.Username
	}

	if input.Bio != "" {
		user.Bio = &input.Bio
	}

	if input.ProfilePictureUrl != "" {
		user.ProfilePictureURL = &input.ProfilePictureUrl
	}

	err = ur.db.Save(&user).Error
	if err != nil {
		return nil, err
	}

	return user, nil
}
