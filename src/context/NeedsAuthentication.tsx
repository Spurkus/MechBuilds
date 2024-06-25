"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "@/src/context/Authentication";
import Loading from "@/src/components/Loading";

export interface NeedsAuthenticationProps {
  children: React.ReactNode;
}

const NeedsAuthentication = ({ children }: NeedsAuthenticationProps) => {
  const { authenticated } = useAuthContext();
  const router = useRouter();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!authenticated) {
      router.push("/");
    }
  }, [authenticated, router]);

  // Show loading screen while checking authentication
  if (!authenticated) {
    return (
      <div className="flex w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  return <>{children}</>;
};

export default NeedsAuthentication;
