import { ReactElement } from "react";
import { HomeContainer } from "@/styles/pages/home";
import { NextPageWithLayout } from "../_app";
import { ProfileRating, ProfileRatings } from "@/components/ProfileRatings";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { DefaultLayout } from "@/layouts/defaultLayout";
import { ProfileDetails } from "@/components/ProfileDetails";

export type ProfileData = {
  ratings: ProfileRating[];
  user: {
    avatar_url: string;
    name: string;
    member_since: string;
  };
  readPages: number;
  ratedBooks: number;
  readAuthors: number;
  mostReadCategory?: string;
};

const ProfilePage: NextPageWithLayout = () => {
  const router = useRouter();
  const userId = router.query.id as string;

  const { data: session } = useSession();

  const isOwnProfile = session?.user?.id === userId;

  const { data: profile } = useQuery<ProfileData[]>({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const { data } = await api.get(`/profile/${userId}`);
      enabled: !!userId;
      return data?.profile ?? {};
    },
  });

  return (
    <HomeContainer>
      {!!profile ? (
        <>
          <ProfileRatings
            isOwnProfile={isOwnProfile}
            ratings={profile?.ratings}
          />
          <ProfileDetails profile={profile} />
        </>
      ) : (
        <h1>Carregando...</h1>
      )}
    </HomeContainer>
  );
};

ProfilePage.getLayout = (page: ReactElement) => {
  return <DefaultLayout title="Perfil">{page}</DefaultLayout>;
};

export default ProfilePage;
