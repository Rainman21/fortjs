export class User {
  constructor(user) {
    this.id = Number(user.id);
    this.name = user.name;
    this.gender = user.gender;
    this.address = user.address;
    this.emailId = user.emailId;
    this.password = user.password;
  }
}