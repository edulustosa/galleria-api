# Requirements

This is an online art gallery where the site will have curators and regular users. Curators have the role of approving images to be displayed in the gallery, while registered users can submit their images for review.

## Functional

- [x] Allow new user registration.
- [x] Authentication via login (email/username and password).
- [ ] Password recovery option.
- [ ] Allow users to edit their profiles (profile picture, bio, etc.).
- [ ] Display profile information of other users (name, bio, submitted images, etc.).
- [ ] Allow registered users to submit images.
- [ ] Submission form with fields for title and description.
- [ ] Interface for curators to review and approve/reject submitted images.
- [ ] Notify users about the approval or rejection of their images.
- [ ] Display approved images in a public gallery.
- [ ] Image details with title, description, author, and tags.
- [ ] Allow users to comment on and like images.

## Non-Functional Requirements

- [ ] The database must be hosted on Vercel.
- [ ] Data should be stored in a PostgreSQL database.
- [ ] Users should be identified by a JWT.

## Business Rules

- [ ] Images must follow the gallery's content guidelines (e.g., no offensive content).
- [ ] Curators must review and moderate content submitted by users.
- [ ] Offensive comments can be removed, and users who violate the rules may be banned.
