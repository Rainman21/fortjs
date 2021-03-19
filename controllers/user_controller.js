// import { Controller, textResult, DefaultWorker } from 'fortjs'
// export class UserController extends Controller {
//   @DefaultWorker()
//   async default() {
//     return textResult('you have successfully created a user controller');
//   }
// }

import { Guards, Controller, jsonResult, DefaultWorker, HTTP_METHOD, HTTP_STATUS_CODE, Worker, Route } from 'fortjs'
import { UserService } from '../services/user_service';
import { ModelUserGuard } from '../guards/model_user_guard'

export class UserController extends Controller {
  @DefaultWorker()
  async getUsers() {
    const service = new UserService();
    return jsonResult(service.getUsers());
  }

  @Guards(ModelUserGuard)
  @Worker(HTTP_METHOD.Post)
  @Route("/")
  async addUser() {
    // const user = {
    //   name: this.body.name,
    //   gender: this.body.gender,
    //   address: this.body.address,
    //   emailId: this.body.emailId,
    //   password: this.body.password
    // };
    const user = this.data.user;
    const service = new UserService();
    const newUser = service.addUser(user);
    return jsonResult(newUser, HTTP_STATUS_CODE.Created);
  }

  @Worker(HTTP_METHOD.Put)
  @Guards(ModelUserGuard)
  @Route("/")
  async updateUser() {
    const user = this.data.user;
    const userUpdated = new UserService().updateUser(user);
    if (userUpdated === true) {
      return textResult("user updated");
    } else {
      return textResult("invalid user");
    }
  }


  @Worker(HTTP_METHOD.Get)
  @Route("/{id}")
  async getUser() {
    const userId = Number(this.param.id);
    const service = new UserService();
    const user = service.getUser(userId);
    if (user == null) {
      return textResult("invalid id");
    }
    return jsonResult(user);
  }

  @Worker(HTTP_METHOD.Delete)
  @Route("/{id}")
  async removeUser() {
    const userId = Number(this.param.id);
    const service = new UserService();
    const user = service.getUser(userId);
    if (user != null) {
      service.removeUser(userId);
      return textResult("user deleted");
    } else {
      return textResult("invalid user");
    }
  }
}