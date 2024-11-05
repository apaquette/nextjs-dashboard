import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks:{
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

            // // redirect if logged in but not on dashboard
            // if(isLoggedIn && !isOnDashboard)
            //     return Response.redirect(new URL('/dashboard', nextUrl));

            // // return true if on dashboard and logged in
            // // OR
            // // return true if loggedIn but not on dashboard
            // return (isOnDashboard && isLoggedIn) || (!isOnDashboard && isLoggedIn)

            //TODO: project code to be reworked with better/more intuitive logic
            if(isOnDashboard){
                if(isLoggedIn) return true;
                return false;
            } else if (isLoggedIn){
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [],  //add providers
} satisfies NextAuthConfig;