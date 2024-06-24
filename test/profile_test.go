package test

import (
	"testing"

	"github.com/edulustosa/galleria-api/internal/services"
	"github.com/edulustosa/galleria-api/internal/repositories"
)

func TestEditProfile(t *testing.T) {
	db := SetupTestDB()

	usersRepository := repositories.NewUsersRepository(db)
	sut := services.NewProfileService(usersRepository)

	user, err := usersRepository.Create("john doe", "foo@bar.com", "123456")
	if err != nil {
		t.Fatal("Failed to create user", err.Error())
	}

	input := services.EditProfileRequest{
		Id:                user.ID,
		Username:          "foobar",
		Bio:               "test",
		ProfilePictureUrl: "image_url",
	}

	updatedUser, err := sut.Edit(input)
	if err != nil {
		t.Fatal("Failed to update user")
	}

	t.Log(updatedUser)
}
