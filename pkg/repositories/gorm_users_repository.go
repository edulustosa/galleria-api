package repositories

import (
	"github.com/edulustosa/galleria-api/pkg/models"
	"gorm.io/gorm"
)

type usersRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UsersRepository {
	return &usersRepository{db}
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
		Username: username,
		Email: email,
		PasswordHash: passwordHash,
		Role: models.RoleUser,
	}

	err := ur.db.Create(&user).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}
