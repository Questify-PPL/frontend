import { auth } from "@/auth";
import { Session } from "next-auth";
import { UserRoleEnum } from "@/lib/types/auth";
import { Profile, ProfileSection } from "@/components/profile";
import { titleCase } from "@/lib/utils";
import { ProfileFormWrapper } from "@/components/profile/ProfileForm";

export default async function ProfilePage() {
  const { user } = (await auth()) as Session;
  const roleSpecificData = {
    [UserRoleEnum.Respondent]: {
      pity: user.Respondent?.pity,
    },
    [UserRoleEnum.Creator]: {
      emailNotificationActive: user.Creator?.emailNotificationActive,
    },
    [UserRoleEnum.Admin]: {},
  };

  return (
    <section>
      <h1 className="sr-only">Profile</h1>
      <div className="bg-[#E5EEF0] min-h-20"></div>
      <div className="px-8 pb-[40px] sm:px-[100px]">
        <Profile user={user} />
        <ProfileFormWrapper user={user} />
        <hr className="mb-2" />
        {user.ssoUsername && (
          <>
            <ProfileSection
              title="SSO Information"
              subtitle="This information is belong to your SSO account"
              data={
                {
                  "SSO Username": user.ssoUsername,
                  NPM: user.id.replace("UI", ""),
                } as Record<string, string>
              }
            />
            <hr className="mb-2" />
          </>
        )}
        <ProfileSection
          title="Account Information"
          subtitle="This information is specific to your Questify account"
          data={
            {
              Roles: user.roles.map(titleCase).join(", "),
              Credit: String(user.credit),
            } as Record<string, string>
          }
        />
        <hr className="mb-2" />
        <ProfileSection
          title="Role Information"
          subtitle="This information is specific to your current active role"
          data={
            {
              "Active Role": titleCase(user.activeRole),
              ...roleSpecificData[user.activeRole as UserRoleEnum],
            } as Record<string, string>
          }
        />
      </div>
    </section>
  );
}
