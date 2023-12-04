interface IGetGoogleUserInfoResponse {
  payload: GoogleUserInfo;
}

interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
}

export { IGetGoogleUserInfoResponse };
