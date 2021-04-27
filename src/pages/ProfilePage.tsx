import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Friend } from "../models/friend.model";

interface ProfileRouteParams {
    id: string;
}

const emptyFriendObject = new Friend(
    "",
    "",
    "",
    {
    status: "",
    timestamp: ""
    }
);

const requestedInfo = new Friend(
    "f48c1eca-295d-4603-8433-bbfa645ce92a",
    "jerry123",
    "Jerry Smith",
    {
    status: "available",
    timestamp: "2017-07-21T17:32:28Z"
    }
);

const ProfilePage = () => {

    const { id } = useParams<ProfileRouteParams>();
    console.log(id);
    // under the assumption that our own id is known, for now ill write this as...
    // ...a get friend request to the api

    const hasFetchedData = useRef(false);
    const [profileInfo, setProfileInfo] = useState<Friend>(emptyFriendObject);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        // const myAbortController = new AbortController();
        let timer: ReturnType<typeof setTimeout>;
        const fetchFriendsHandler = () => {
          setIsLoading(true);
          timer = setTimeout(() => {
            setIsLoading(false);
            setProfileInfo(requestedInfo);
          }, 1000);
        }

        // const fetchInfoHandler = async () => {
        //   setIsLoading(true);
        //   const response = await fetch(
        //     "https://cloud.lucasantarella.com/api/v1/friends/{friendId}",
        //     {
        //       signal: myAbortController.signal,
        //     }
        //   );
        //   const data = await response.json();
        //
        //   const profileInfoHolder = new Friend(
        //     data[i].id,
        //     data[i].username,
        //     `${data[i].first_name} ${data[i].last_name}`,
        //     { status, timestamp: data[i].created_at }
        //   );
        // 
        //   setProfileInfo(profileInfoHolder);
        //   setIsLoading(false);
        // };
    
        if (!hasFetchedData.current) {
          fetchFriendsHandler();
          hasFetchedData.current = true;
        }
    
        return () => {
          // myAbortController.abort();
          clearTimeout(timer);
        };
    }, []);

    return (
        <div>
            {!isLoading && (
                <div>
                    <h3>
                        Username: {profileInfo.username}
                    </h3>
                    <h3>
                        Name: {profileInfo.name}
                    </h3>
                </div>
            )}
            {isLoading && <p>Loading Profile...</p>}
        </div>
    );
};

export default ProfilePage;