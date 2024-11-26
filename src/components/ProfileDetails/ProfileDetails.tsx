"use client";
import { useState } from "react";
import { useAuthContext } from "@/src/context/Authentication";
import { useGlobalModalContext } from "@/src/context/GlobalModal";
import {
  adjustImageURL,
  ensureHttpsLink,
  formatDate,
  formatPronouns,
  formatLink,
  showModal,
} from "@/src/helper/helperFunctions";
import { DEFAULT_IMAGE_SIZE } from "@/src/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/src/components/General/Loading";
import Image from "next/image";
import Link from "next/link";
import EditProfile from "./EditProfile";
import { UserProfileType } from "@/src/types/user";

interface ProfileProps {
  userDetails?: UserProfileType;
}

const ProfileBaseDetails = ({ userDetails }: ProfileProps) => {
  const { username, displayName, pronouns, profilePicture } = useAuthContext();
  const usernameDetails = userDetails ? userDetails.username : (username as string);
  const displayNameDetails = userDetails ? userDetails.displayName : (displayName as string);
  const pronounsDetails = userDetails ? userDetails.pronouns : (pronouns as [string, string]);
  const profilePictureDetails = userDetails ? userDetails.profilePicture : (profilePicture as string);

  const { handleModalError } = useGlobalModalContext();
  const [editProfile, setEditProfile] = useState(false);

  if (!profilePicture) {
    handleModalError("User is invalid");
    return <Loading />;
  }

  const toggleEditProfile = () => setEditProfile(!editProfile);

  return (
    <div className="flex flex-row gap-2 sm:flex-col">
      <div className="avatar mask flex self-center max-sm:w-36 sm:grow">
        <Image
          src={adjustImageURL(profilePictureDetails, DEFAULT_IMAGE_SIZE)}
          alt="Profile"
          className="aspect-square rounded-3xl sm:rounded-[2.5rem]"
          width={DEFAULT_IMAGE_SIZE}
          height={DEFAULT_IMAGE_SIZE}
          quality={100}
        />
      </div>
      <div className="flex w-full flex-col justify-end">
        <h2 className="username text-left text-2xl font-bold">
          {displayNameDetails}
          <a className="pl-1 text-lg font-normal text-gray-600">{formatPronouns(pronounsDetails, true)}</a>
        </h2>
        <h3 className="font-light text-gray-500">{usernameDetails}</h3>
        {!userDetails && (
          <>
            <button
              className="btn btn-outline btn-info btn-sm mt-2 rounded-xl"
              onClick={() => showModal("editprofilemodal", toggleEditProfile)}
            >
              Edit Profile
            </button>
            <EditProfile open={editProfile} toggleEditProfile={toggleEditProfile} />
          </>
        )}
      </div>
    </div>
  );
};

const ProfileExtraDetails = ({ userDetails }: ProfileProps) => {
  const { userProfile } = useAuthContext();

  if (!userProfile && !userDetails)
    return (
      <div className="mt-0.5 flex grow flex-col items-center">
        <Loading />
      </div>
    );

  const userProfileDetails = userDetails ? userDetails : (userProfile as UserProfileType);
  return (
    <div className="flex flex-col space-y-2">
      {userProfileDetails.bio && <p className="font-light leading-5">{userProfileDetails.bio}</p>}
      {userProfileDetails.socialLinks.length !== 0 && (
        <div className="flex flex-col space-y-1 font-light">
          <h3 className="font-bold">Social Links</h3>
          <div className="flex flex-col space-y-2">
            {userProfileDetails.socialLinks.map((link, index) => (
              <Link
                key={index}
                href={ensureHttpsLink(link)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm justify-start rounded-xl"
              >
                <div className="flex flex-row space-x-1">
                  <FontAwesomeIcon icon={faLink} className="mt-2" />
                  <p className="max-w-[11rem] truncate py-2">{formatLink(link)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="flex w-full grow flex-col items-center">
        <h3 className="font-bold">User Joined</h3>
        <span className="text-sm font-bold leading-3 text-gray-500">{formatDate(userProfileDetails.joinedDate)}</span>
      </div>
    </div>
  );
};

const ProfileDetails = ({ userDetails }: ProfileProps) => {
  return (
    <div className="flex w-full flex-col rounded-[3rem] bg-base-300 p-6 pb-3">
      <ProfileBaseDetails userDetails={userDetails} />
      <hr className={`border-t border-gray-400 ${userDetails ? "my-2" : "my-3"}`} />
      <ProfileExtraDetails userDetails={userDetails} />
    </div>
  );
};

export default ProfileDetails;
