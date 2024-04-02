 import { NextRequest } from "next/server";
 import Cookies from "js-cookie"
 
export default function cookieSet (token:string) {
  Cookies.set("token", token)
}
