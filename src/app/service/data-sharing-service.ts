import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import UserDTO from "../model/user-dto";

@Injectable()
export class DataSharingService {
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userDTO: BehaviorSubject<UserDTO | null> = new BehaviorSubject<UserDTO | null>(null);
}
