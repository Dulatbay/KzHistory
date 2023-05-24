import {useAppDispatch} from "@/shared/model";
import {logoutThunk} from "@/features/authentication/Logout/model/logout";

export function LogoutButton() {
    const dispatch = useAppDispatch()

    const onConfirmLogout = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        e.preventDefault()

        dispatch(logoutThunk())
    }

    return (
        <a href="#" onClick={onConfirmLogout}>
            logout
        </a>
    )
}
