import {UserProfile} from "../components/UserProfile.tsx";
import {useAuthStore} from "../store/authStore.ts";
import {SetNickname} from "../components/SetNickname.tsx";

const UserPage = () => {

    const user = useAuthStore(state => state.user)

    return (
        <div>
            {user?.displayName ? <UserProfile/> : <SetNickname/>}
        </div>
    );
};

export default UserPage;