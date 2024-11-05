import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks:{
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

            if(!isOnDashboard && isLoggedIn) return Response.redirect(new URL('/dashboard', nextUrl)); //redirect to dashboard if logged in


            // true if not on dashboard and not logged in
            // OR
            // true if logged in
            // false otherwise (not logged in)
            return (!isOnDashboard && !isLoggedIn) || isLoggedIn;

            //TODO: project code to be reworked with better/more intuitive logic
            // if(isOnDashboard){
            //     if(isLoggedIn) return true;
            //     return false; // redirect to login
            // } else if (isLoggedIn){
            //     return Response.redirect(new URL('/dashboard', nextUrl));
            // }
            // return true;
        },
    },
    providers: [],  //add providers
} satisfies NextAuthConfig;