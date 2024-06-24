import { useAuthContext } from "@/src/context/Authentication";
import Loading from "@/src/components/Loading";

const PremiumAccount = () => {
  const { userProfile } = useAuthContext();
  if (!userProfile) return <Loading />;

  if (userProfile.premium) {
    return (
      <div className="flex flex-col space-y-2">
        <span>
          You are now one of my elite employees! You have no benefits as of yet but it will soon
          {" come >:)"}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2">
      <span>
        You are currently not a premium user. To become a premium user, you need to subscribe to{" "}
        <span className="font-sans">:3</span>
      </span>
      <button className="btn btn-outline btn-success btn-sm self-start rounded-xl pb-10">
        <span className="mt-[0.6rem] font-sans text-sm">Subscribe to :3</span>
      </button>
    </div>
  );
};

const DeleteAccount = () => {
  return (
    <div className="flex flex-col space-y-2">
      <span>
        If you delete your account, it <span className="font-bold">cannot</span> be recovered. All
        your information will be deleted.
      </span>
      <button className="btn btn-outline btn-error btn-sm self-start rounded-xl pb-10">
        <span className="mt-[0.6rem] text-sm">Delete Account</span>
      </button>
    </div>
  );
};

const AccountDetails = () => {
  const { userProfile } = useAuthContext();
  if (!userProfile) return <Loading />;
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <label className="text-2xl font-medium">Username</label>
          <span className="text-lg leading-5 text-gray-500">{userProfile.username}</span>
        </div>
        <button className="btn btn-outline btn-neutral btn-sm self-center rounded-xl pb-10">
          <span className="mt-[0.6rem] text-sm">Change Username</span>
        </button>
      </div>
      <div className="flex flex-col">
        <label>Email</label>
        <span className="leading-4 text-gray-500">{userProfile.email}</span>
      </div>
      <div className="flex flex-col">
        <label>Status</label>
        <span className="leading-4 text-gray-500">{userProfile.status}</span>
      </div>
    </div>
  );
};

const AccountSettings = () => {
  return (
    <>
      <div className="pb-1">
        <h1 className="font-regular font-clashgrotesk text-5xl">Account</h1>
        <hr className="border-t border-gray-700" />
      </div>
      <AccountDetails />
      <div className="pt-3">
        <h1 className="font-regular font-clashgrotesk text-4xl">Premium Account</h1>
        <hr className="border-t border-gray-700" />
      </div>
      <PremiumAccount />
      <div className="pt-3">
        <h1 className="font-regular font-clashgrotesk text-4xl text-red-500">Delete Account</h1>
        <hr className="border-t border-gray-700" />
      </div>
      <DeleteAccount />
    </>
  );
};

export default AccountSettings;
