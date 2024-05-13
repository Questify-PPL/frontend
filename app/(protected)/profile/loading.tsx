import { auth } from "@/auth";
import {
  ProfileFormWrapperLoading,
  ProfileLoading,
  ProfileSectionLoading,
} from "@/components/common";
import { Session } from "next-auth";

export default async function Loading() {
  const { user } = (await auth()) as Session;

  return (
    <div>
      <div className="bg-[#E5EEF0] min-h-20"></div>
      <div className="px-8 pb-[40px] sm:px-[100px]">
        <ProfileLoading />
        <ProfileFormWrapperLoading />
        <hr className="mb-2" />
        {user.ssoUsername && (
          <>
            <ProfileSectionLoading
              title="SSO Information"
              subtitle="This information is belong to your SSO account"
            />
            <hr className="mb-2" />
          </>
        )}
        <ProfileSectionLoading
          title="Account Information"
          subtitle="This information is specific to your Questify account"
        />
        <hr className="mb-2" />
        <ProfileSectionLoading
          title="Role Information"
          subtitle="This information is specific to your current active role"
        />
      </div>
    </div>
  );
}
