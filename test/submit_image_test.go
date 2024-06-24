package test

import (
	"testing"

	"github.com/edulustosa/galleria-api/internal/services"
	"github.com/edulustosa/galleria-api/internal/repositories"
)

func TestSubmitImage(t *testing.T) {
	db := SetupTestDB()

	usersRepository := repositories.NewUsersRepository(db)
	imagesRepository := repositories.NewImagesRepository(db)
	sut := services.NewSubmitService(usersRepository, imagesRepository)

	user, err := usersRepository.Create("john doe", "foo@bar.com", "123456")
	if err != nil {
		t.Fatal("Failed to create user", err.Error())
	}

	imageRequest := services.SubmitImageRequest{
		UserId: user.ID,
		Title: "art work",
		URL: "imageurl.com",
	}

	image, err := sut.Execute(imageRequest)
	if err != nil {
		t.Fatal("Failed to create submit image", err.Error())
	}

	t.Log(image)

	image, err = imagesRepository.FindById(image.ID)
	if err != nil {
		t.Fatal("Failed to get image: ", err.Error())
	}

	t.Log(image)
}
