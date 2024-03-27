import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PUBLIC_ROUTES, AUTH_ROUTES, DEFAULT_REDIRECTED_ROUTE, PREFIX_ROUTE } from "@/routes"
export const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const isLogin = !!req.auth;
  const {nextUrl}=req
  const isAuthRoutes=AUTH_ROUTES.includes(nextUrl.pathname);
  const isApiRoutes=nextUrl.pathname.startsWith(PREFIX_ROUTE);
  const isPublicRoutes=PUBLIC_ROUTES.includes(nextUrl.pathname);

  if(isApiRoutes){
    return 
  }
  if(isAuthRoutes){
    if(isLogin){
      return Response.redirect(new URL (DEFAULT_REDIRECTED_ROUTE,nextUrl));
    }else{
      return 
    }
  }
  if(!isLogin&&!isPublicRoutes){
    return Response.redirect(new URL ("/auth/login",nextUrl));
  }
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}