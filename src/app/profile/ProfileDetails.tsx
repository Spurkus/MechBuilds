"use client";
import { useAuthContext } from "@/src/context/Authentication";
import { useGlobalModalContext } from "@/src/context/GlobalModal";
import { adjustImageUrl } from "@/src/helper/helperFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/src/components/Loading";
import Image from "next/image";
import Link from "next/link";

const DEFAULT_IMAGE_SIZE = 1000;

const displaySocialLink = (link: string) => {
  return link.replace(/^(https?:\/\/)?(www\.)?/, "");
};

const ProfileBaseDetails = () => {
  const { username, displayName, pronouns, profilePicture } = useAuthContext();
  const { handleModalError } = useGlobalModalContext();

  if (!profilePicture) {
    handleModalError("User is invalid");
    return <Loading />;
  }

  // Check if pronouns == ["", ""]
  const pronounsDisplay = pronouns
    ? pronouns && pronouns.every((pronoun) => pronoun === "")
      ? ""
      : `(${pronouns.join("/")})`
    : "";

  return (
    <div className="flex flex-grow flex-col space-y-2">
      <div className="avatar mask self-center">
        <Image
          src={adjustImageUrl(profilePicture, DEFAULT_IMAGE_SIZE)}
          alt="Profile"
          className="rounded-[2.5rem]"
          width={DEFAULT_IMAGE_SIZE}
          height={DEFAULT_IMAGE_SIZE}
          quality={100}
        />
      </div>
      <div className="flex flex-col">
        <h2 className="username text-left font-satoshi text-2xl font-bold">
          {displayName}
          <a className="pl-1 text-lg font-normal text-gray-600">{pronounsDisplay}</a>
        </h2>
        <h3 className="font-light text-gray-500">{username}</h3>
      </div>
      <button className="btn btn-outline btn-info btn-sm rounded-xl">Edit Profile</button>
    </div>
  );
};

const ProfileExtraDetails = () => {
  const { userProfile } = useAuthContext();

  if (!userProfile) return <Loading />;

  return (
    <div className="flex flex-col space-y-2">
      {userProfile.bio && (
        <div className="flex flex-col space-y-1 font-light">
          <p>{userProfile.bio}</p>
        </div>
      )}
      {userProfile.socialLinks && (
        <div className="flex flex-col space-y-1 font-light">
          <h3 className="font-bold">Social Links</h3>
          <div className="flex flex-col space-y-2">
            {userProfile.socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm justify-start rounded-xl"
              >
                <div className="flex flex-row space-x-1">
                  <FontAwesomeIcon icon={faLink} className="mt-2" />
                  <p className="max-w-[11rem] truncate py-2">{displaySocialLink(link)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileDetails = () => {
  return (
    <div className="flex flex-grow flex-col rounded-[3rem] bg-base-300 p-6">
      <ProfileBaseDetails />
      <hr className="my-4 border-t border-gray-400" />
      <ProfileExtraDetails />
    </div>
  );
};

export default ProfileDetails;
