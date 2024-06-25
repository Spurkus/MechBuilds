"use client";
import { useState } from "react";
import { useAuthContext } from "@/src/context/Authentication";
import { useGlobalModalContext } from "@/src/context/GlobalModal";
import { Timestamp } from "firebase/firestore";
import {
  adjustImageUrl,
  ensureHttpsLink,
  formatPronouns,
  formatSocialLink,
} from "@/src/helper/helperFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/src/components/Loading";
import Image from "next/image";
import Link from "next/link";
import EditProfile from "./EditProfile";

export const DEFAULT_IMAGE_SIZE = 1000;

const ProfileBaseDetails = () => {
  const { username, displayName, pronouns, profilePicture } = useAuthContext();
  const { handleModalError } = useGlobalModalContext();
  const [editProfile, setEditProfile] = useState(false);

  if (!profilePicture) {
    handleModalError("User is invalid");
    return <Loading />;
  }

  const toggleEditProfile = () => {
    setEditProfile(!editProfile);
  };

  const openModal = () => {
    const element = document.getElementById("editprofilemodal");
    if (element instanceof HTMLDialogElement) {
      element.showModal();
      toggleEditProfile();
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="avatar mask flex w-full grow self-center">
        <Image
          src={adjustImageUrl(profilePicture, DEFAULT_IMAGE_SIZE)}
          alt="Profile"
          className="aspect-square rounded-[2.5rem]"
          width={DEFAULT_IMAGE_SIZE}
          height={DEFAULT_IMAGE_SIZE}
          quality={100}
        />
      </div>
      <div className="flex flex-col">
        <h2 className="username text-left text-2xl font-bold">
          {displayName}
          <a className="pl-1 text-lg font-normal text-gray-600">{formatPronouns(pronouns, true)}</a>
        </h2>
        <h3 className="font-light text-gray-500">{username}</h3>
      </div>
      <button className="btn btn-outline btn-info btn-sm rounded-xl" onClick={openModal}>
        Edit Profile
      </button>
      <EditProfile open={editProfile} toggleEditProfile={toggleEditProfile} />
    </div>
  );
};

const ProfileExtraDetails = () => {
  const { userProfile } = useAuthContext();
  if (!userProfile)
    return (
      <div className="mt-0.5 flex grow flex-col items-center">
        <Loading />
      </div>
    );

  const joinedDate = new Date((userProfile.joinedDate as unknown as Timestamp).toDate());

  return (
    <div className="flex flex-col space-y-2">
      {userProfile.bio && <p className="font-light leading-5">{userProfile.bio}</p>}
      {userProfile.socialLinks.length !== 0 && (
        <div className="flex flex-col space-y-1 font-light">
          <h3 className="font-bold">Social Links</h3>
          <div className="flex flex-col space-y-2">
            {userProfile.socialLinks.map((link, index) => (
              <Link
                key={index}
                href={ensureHttpsLink(link)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm justify-start rounded-xl"
              >
                <div className="flex flex-row space-x-1">
                  <FontAwesomeIcon icon={faLink} className="mt-2" />
                  <p className="max-w-[11rem] truncate py-2">{formatSocialLink(link)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="flex w-full grow flex-col items-center">
        <h3 className="font-bold">User Joined</h3>
        <span className="text-sm font-bold leading-3 text-gray-500">
          {joinedDate.toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

const ProfileDetails = () => {
  return (
    <div className="flex w-full flex-col rounded-[3rem] bg-base-300 p-6">
      <ProfileBaseDetails />
      <hr className="my-4 border-t border-gray-400" />
      <ProfileExtraDetails />
    </div>
  );
};

export default ProfileDetails;
