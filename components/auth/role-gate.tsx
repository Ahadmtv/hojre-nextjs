import { UserRole } from "@prisma/client"
import FormError from "./form-error"

interface RoleGateProps {
    allowedUser: UserRole|undefined,
    children: React.ReactNode

}
export const RoleGate = ({ allowedUser, children }: RoleGateProps) => {
    if (allowedUser === "USER") {
        return (
            <FormError message="این محتوا برای شما پنهان میباشد" />
        )
    }
    return (
        <>
            {children}
        </>
    )
}