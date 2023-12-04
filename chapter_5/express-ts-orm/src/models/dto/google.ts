interface IGetGoogleUserInfoResponse {
  payload: GoogleUserInfo;
}

interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
}

class GetGoogleUserInfoResponse implements IGetGoogleUserInfoResponse {
  private payload$: GoogleUserInfo;

  constructor(payload: GoogleUserInfo) {
    this.payload$ = payload;
  }

  public get payload$() {
    return this.payload$;
  }
}

export { IGetGoogleUserInfoResponse, GetGoogleUserInfoResponse };
