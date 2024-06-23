package services

import (
	"errors"

	"github.com/edulustosa/galleria-api/pkg/models"
	"github.com/edulustosa/galleria-api/pkg/repositories"
	"golang.org/x/crypto/bcrypt"
)

type Auth struct {
	usersRepository repositories.UsersRepository
}

type RegisterRequest struct {
	Username string
	Email    string
	Password string
}

func NewAuth(ur repositories.UsersRepository) Auth {
	return Auth{ur}
}

func (a *Auth) Register(req RegisterRequest) (*models.User, error) {
	userWithSameEmail, _ := a.usersRepository.FindByEmail(req.Email)
	if userWithSameEmail != nil {
		return nil, errors.New("user already exists")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	return a.usersRepository.Create(req.Username, req.Email, string(hashedPassword))
}

type LoginRequest struct {
	Email    string
	Password string
}

func (a *Auth) Login(req LoginRequest) (*models.User, error) {
	user, err := a.usersRepository.FindByEmail(req.Email)
	if err != nil {
		return nil, errors.New("invalid credentials")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password))
	if err != nil {
		return nil, errors.New("invalid credentials")
	}

	return user, nil
}
