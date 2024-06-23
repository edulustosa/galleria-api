package models

type Role string

const (
	RoleUser    Role = "user"
	RoleCurator Role = "curator"
)

type Status string

const (
	StatusPending  Status = "pending"
	StatusApproved Status = "approved"
	StatusRejected Status = "rejected"
)
