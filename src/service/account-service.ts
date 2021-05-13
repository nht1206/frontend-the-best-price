import { AxiosResponse } from "axios";
import http from "@/service/http";
import Page from "@/models/Page";
import { SignupPayload } from "./auth-service";

export interface AccountResponse {
  id: number;
  username: string;
  fullName: string;
  address: string;
  email: string;
  phoneNumber: string;
  registerDay: string;
}

function confirmEmail(token: string): Promise<AxiosResponse<any>> {
  return http.get("registerConfirm?token=" + token);
}

function getListGuestAccount(
  params: string
): Promise<AxiosResponse<Page<AccountResponse>>> {
  return http.get<Page<AccountResponse>>("user/listGuestAccount" + params);
}

function getListRetailerAccount(
  params: string
): Promise<AxiosResponse<Page<AccountResponse>>> {
  return http.get<Page<AccountResponse>>("user/listRetailerAccount" + params);
}

function createGuestAccount(payload: SignupPayload) {
  return http.post("user/createGuestAccount", payload);
}

export default {
  getListGuestAccount,
  getListRetailerAccount,
  confirmEmail,
  createGuestAccount,
};
