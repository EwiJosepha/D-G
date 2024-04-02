
import { NextResponse, type NextRequest } from "next/server";
import { verify } from "./app/utils/pathManager";

export default function middleware(req: NextRequest) {


  const verify1 = req.cookies.get("token")

  const url = req.url

  // if (!verify1 && url.includes("/dashboard")) {
  //   return NextResponse.redirect("http://localhost:3000/login")
  // }

  // if (verify1 && url === "http://localhost:3000/login") {
  //   return NextResponse.redirect("http://localhost:3000/dashboard")
  // }



}