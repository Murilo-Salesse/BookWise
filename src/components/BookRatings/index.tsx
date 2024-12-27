import { Fragment, useState } from "react";
import { Text } from "../Typography";
import { Link } from "../ui/Link";
import { RatingWithAuthor, UserRatingCard } from "../UserRatingCard";
import { Container } from "./styles";
import { RatingForm } from "../RatingForm";
import { useSession } from "next-auth/react";
import { X } from "@phosphor-icons/react";
import { LoginDialog } from "../LoginDialog";

type BookRatingProps = {
  ratings: RatingWithAuthor[];
  bookId: string;
};

export const BookRatings = ({ bookId, ratings }: BookRatingProps) => {
  const { status, data: session } = useSession();
  const [showForm, setShowForm] = useState(false);

  const isAuthenticated = status === "authenticated";

  const handleRate = () => {
    if (!isAuthenticated) return;
    setShowForm(true);
  };

  const sortedRatingsByDate = ratings.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const RatingWrapper = isAuthenticated ? Fragment : LoginDialog;

  const canRate = ratings.every((x) => x.user_id !== session?.user?.id);

  return (
    <Container>
      <header>
        <Text>Avaliações</Text>
        {canRate && (
          <RatingWrapper>
            <Link withoutIcon onClick={handleRate} text="Avaliar" />
          </RatingWrapper>
        )}
      </header>

      <section>
        {showForm && (
          <RatingForm bookId={bookId} onCancel={() => setShowForm(false)} />
        )}
        {sortedRatingsByDate.map((rating) => {
          return <UserRatingCard key={rating.id} rating={rating} />;
        })}
      </section>
    </Container>
  );
};
