import Link from "next/link";
import {
  BookContent,
  BookDetails,
  BookImage,
  Container,
  ToggleShowMoreButton,
  UserDetails,
} from "./styles";
import { Avatar } from "../ui/Avatar";
import { Book, Rating, User } from "@prisma/client";
import { Heading, Text } from "../Typography";
import { getRelativeTimeString } from "@/utils/getRelativeTimeString";
import { RatingStars } from "../RatingStars";
import { userToggleShowMore } from "@/hooks/UserToggleShowMore";

export type RatingWithAuthorAndBook = Rating & {
  user: User;
  book: Book;
};

type RatingCardProps = {
  rating: RatingWithAuthorAndBook;
};

const MAX_SUMMARY_LENGHT = 180;

export const RatingCard = ({ rating }: RatingCardProps) => {
  const distance = getRelativeTimeString(new Date(rating.created_at), "pt-BR");

  const {
    text: bookSummary,
    toggleShowMore,
    isShowingMore,
  } = userToggleShowMore(rating.book.summary, MAX_SUMMARY_LENGHT);

  return (
    <>
      <Container>
        <UserDetails>
          <section>
            <Link href={`/profile/${rating.user_id}`}>
              <Avatar src={rating.user.avatar_url!} alt={rating.user.name} />
            </Link>

            <div>
              <Text>{rating.user.name}</Text>
              <Text size="sm" color="gray-400">
                {distance}
              </Text>
            </div>
          </section>

          <RatingStars rating={rating.rate} />
        </UserDetails>

        <BookDetails>
          <Link href={`/explore?book=${rating.book_id}`}>
            <BookImage
              width={108}
              height={152}
              alt={rating.book.name}
              src={rating.book.cover_url}
            />
          </Link>

          <BookContent>
            <div>
              <Heading size="xs">{rating.book.name}</Heading>
              <Text size="sm" color="gray-400">
                {rating.book.author}{" "}
              </Text>
            </div>

            <Text
              size="sm"
              color="gray-300"
              css={{
                marginTop: "$5",
              }}
            >
              {bookSummary}

              {rating.book.summary.length > MAX_SUMMARY_LENGHT && (
                <ToggleShowMoreButton onClick={toggleShowMore}>
                  {isShowingMore ? "ver menos" : "ver mais"}
                </ToggleShowMoreButton>
              )}
            </Text>
          </BookContent>
        </BookDetails>
      </Container>
    </>
  );
};
