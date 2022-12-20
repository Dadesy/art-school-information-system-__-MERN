class userDto {
  email;
  id;
  userName;
  roles;
  isActivated;

  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.userName = model.userName;
    this.roles = model.roles;
    this.isActivated = model.isActivated;
  }
}

export default userDto;
