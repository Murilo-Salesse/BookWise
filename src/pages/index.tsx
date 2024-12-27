import { useSession } from "next-auth/react";
import { NextPageWithLayout } from "./_app";
import { DefaultLayout } from "@/layouts/defaultLayout";
import { HomeContainer } from "@/styles/pages/home";
import { LatestRatings } from "@/components/LatestRatings";
import { PopularBooks } from "@/components/PopularBooks";

const HomePage: NextPageWithLayout = () => {
  const { data } = useSession();

  return (
    <>
      <HomeContainer>
        <LatestRatings />
        <PopularBooks />
      </HomeContainer>
    </>
  );
};

HomePage.getLayout = (page) => {
  return (
    <div>
      <DefaultLayout title="Inicio">{page}</DefaultLayout>
    </div>
  );
};

export default HomePage;
