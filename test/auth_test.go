package test

import (
	"testing"

	"github.com/edulustosa/galleria-api/internal/services"
	"github.com/edulustosa/galleria-api/internal/repositories"
)

func TestRegister(t *testing.T) {
	db := SetupTestDB()

	usersRepository := repositories.NewUsersRepository(db)
	sut := services.NewAuth(usersRepository)

	req := services.RegisterRequest{
		Username: "john doe",
		Email:    "foo@bar.com",
		Password: "12345678",
	}

	user, err := sut.Register(req)
	if err != nil {
		t.Fatal("Failed to register: ", err.Error())
	}

	t.Log("Created user: ", user)
}

func TestRegisterFail(t *testing.T) {
	db := SetupTestDB()

	usersRepository := repositories.NewUsersRepository(db)
	sut := services.NewAuth(usersRepository)

	req := services.RegisterRequest{
		Username: "john doe",
		Email:    "foo@bar.com",
		Password: "12345678",
	}

	sut.Register(req)
	_, err := sut.Register(req)
	if err == nil {
		t.Fatal()
	}

	t.Log("Register successfully failed: ", err.Error())
}

func TestLogin(t *testing.T) {
	db := SetupTestDB()

	usersRepository := repositories.NewUsersRepository(db)
	sut := services.NewAuth(usersRepository)

	req := services.RegisterRequest{
		Username: "john doe",
		Email:    "foo@bar.com",
		Password: "12345678",
	}

	createdUser, err := sut.Register(req)
	if err != nil {
		t.Fatal("Failed to register: ", err.Error())
	}

	loginReq := services.LoginRequest{
		Email:    "foo@bar.com",
		Password: "12345678",
	}

	user, err := sut.Login(loginReq)
	if err != nil {
		t.Fatal("Failed to login: ", err.Error())
	}

	t.Log(user)
	t.Log(createdUser)
}

func TestLoginFail(t *testing.T) {
	db := SetupTestDB()

	usersRepository := repositories.NewUsersRepository(db)
	sut := services.NewAuth(usersRepository)

	req := services.RegisterRequest{
		Username: "john doe",
		Email:    "foo@bar.com",
		Password: "12345678",
	}

	_, err := sut.Register(req)
	if err != nil {
		t.Fatal("Failed to register: ", err.Error())
	}

	loginReq := services.LoginRequest{
		Email:    "foo@bar.com",
		Password: "123456789",
	}

	_, err = sut.Login(loginReq)
	if err == nil {
		t.Fatal("It's possible to login with a fake password")
	}

	t.Log("Not possible to login with a fake password: ", err.Error())
}
