import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import UserDTO, {
    GetTokenValidityResponse,
    UserCreateRequest, UserCreateResponse,
    UserCreateResponseStatusType,
    UserLoginRequest, UserLoginResponse,
    UserUpdateRequest, UserUpdateResponse
} from "../model/user-dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient
  ) {
  }

  userUrlString = `${environment.apiUrl}/users`
  sessionUrlString = `${environment.apiUrl}/session`

  token = () => {
    return sessionStorage.getItem("token")
  }

  headers = () => {
    return {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set("Authorization", this.token() ? `Bearer ${this.token()}` : "")
    }
  }

  login(request: UserLoginRequest): Promise<UserLoginResponse | null> {
    return new Promise((resolve, reject) => {
      let result: UserLoginResponse | null = null;
      this._http.post<UserLoginResponse>(`${this.sessionUrlString}/login`, request, this.headers())
        .subscribe({
          next: (val: UserLoginResponse) => {
            result = val;
          },
          error: (err) => {
            console.error(err);
            reject(err);
          },
          complete: () => {
            resolve(result);
          }
        });
    });
  }

  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      const subscription = this._http.post<void>(`${this.sessionUrlString}/logout`, null, this.headers())
        .subscribe({
          next: (val: void) => {
          },
          error: (err) => {
            console.error(err);
            reject(err);
          },
          complete: () => {
            resolve();
          }
        });
    });
  }

  isTokenValid(): Promise<GetTokenValidityResponse | null> {
    return new Promise((resolve, reject) => {
      let result: GetTokenValidityResponse | null = null
      const subscription = this._http.get<GetTokenValidityResponse>(`${this.sessionUrlString}/token`, this.headers())
        .subscribe({
          next: (val: GetTokenValidityResponse) => {
            result = val;
          },
          error: (err) => {
            console.error(err);
            resolve(result);
          },
          complete: () => {
            resolve(result);
          }
        });
    });
  }

  getAllUsers(): Promise<UserDTO[]> {
    return new Promise((resolve, reject) => {
      let result: UserDTO[] = []
      const subscription = this._http.get<UserDTO[]>(this.userUrlString, this.headers())
        .subscribe({
          next: (val: UserDTO[]) => {
            result = val
          },
          error: (err) => {
            console.error(err);
            reject(err);
          },
          complete: () => {
            resolve(result);
          }
        });
    });
  }

  getUser(id: string): Promise<UserDTO | null> {
    return new Promise((resolve, reject) => {
      let result: UserDTO | null = null
      const subscription = this._http.get<UserDTO>(`${this.userUrlString}/${id}`, this.headers())
        .subscribe({
          next: (val: UserDTO) => {
            result = val
          },
          error: (err) => {
            console.error(err);
            reject(err);
          },
          complete: () => {
            resolve(result);
          }
        });
    });
  }

  createUser(request: UserCreateRequest): Promise<UserCreateResponse> {
    return new Promise((resolve, reject) => {
      let result: UserCreateResponse
      const subscription = this._http.post<UserCreateResponse>(this.userUrlString, request, this.headers())
        .subscribe({
          next: (val: UserCreateResponse) => {
            result = val
          },
          error: (err) => {
            result = err
            console.error(err);
            reject(err);
          },
          complete: () => {
            resolve(result);
          }
        });
    });
  }

  updateUser(id: string, request: UserUpdateRequest): Promise<UserUpdateResponse> {
    return new Promise((resolve, reject) => {
      let result: UserUpdateResponse
      const subscription = this._http.patch<UserUpdateResponse>(`${this.userUrlString}/${id}`, request, this.headers())
        .subscribe({
          next: (val: UserUpdateResponse) => {
            result = val
          },
          error: (err) => {
            console.error(err);
            reject(err);
          },
          complete: () => {
            resolve(result);
          }
        });
    });
  }

  removeUser(id: string): Promise<UserDTO | null> {
    return new Promise((resolve, reject) => {
      let result: UserDTO | null = null
      const subscription = this._http.delete<UserDTO>(`${this.userUrlString}/${id}`, this.headers())
        .subscribe({
          next: (val: UserDTO) => {
            result = val
          },
          error: (err) => {
            console.error(err);
            reject(err);
          },
          complete: () => {
            resolve(result);
          }
        });
    });
  }
}
