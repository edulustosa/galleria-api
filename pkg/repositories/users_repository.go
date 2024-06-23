package repositories

import "github.com/edulustosa/galleria-api/pkg/models"

type UsersRepository interface {
	FindByEmail(email string) (*models.User, error)
	Create(username, email, passwordHash string) (*models.User, error)
}
