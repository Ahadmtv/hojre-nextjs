'use server';
import { signIn } from "@/auth";
import { DEFAULT_REDIRECTED_ROUTE } from "@/routes";


export const google = async (provider:"google"|"github") => {
    try {
        await signIn(provider, {
                redirectTo: DEFAULT_REDIRECTED_ROUTE
        })
    } catch (error) {

    }
}