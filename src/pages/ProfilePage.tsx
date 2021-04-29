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
    status: 0,
    timestamp: ""
    }
);

const ProfilePage = () => {

    const { id } = useParams<ProfileRouteParams>();
    // under the assumption that our own id is known, for now ill write this as...
    // ...a get friend request to the api

    const hasFetchedData = useRef(false);
    const [profileInfo, setProfileInfo] = useState<Friend>(emptyFriendObject);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        const myAbortController = new AbortController();
        const fetchInfoHandler = () => {
          setIsLoading(true);
          fetch(`https://cs490.lucasantarella.com/api/v1/friends/${id}`, {
            method: 'GET',
            credentials: 'include',
            signal: myAbortController.signal
          })
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              setIsLoading(false);
              setProfileInfo(json);
            }).catch((err) => {
              console.log(err);
              setIsLoading(false);
          });
        };
    
        if (!hasFetchedData.current) {
          fetchInfoHandler();
          hasFetchedData.current = true;
        }
    
        return () => {
          myAbortController.abort();
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