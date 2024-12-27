import { Book } from "@prisma/client";
import {
  BookDetails,
  BookImage,
  BookName,
  Container,
  ReadBadge,
} from "./styles";
import { Text } from "../Typography";
import { RatingStars } from "../RatingStars";
import { RatingsDialog } from "../RatingsDialog";

export type BookWithAvgRating = Book & {
  avgRating: number;
  alreadyRead: boolean;
};

type BookCardProps = {
  book: BookWithAvgRating;
  size?: "md" | "lg";
};

export const BookCard = ({ book, size = "md" }: BookCardProps) => {
  const IMG_SIZES = {
    md: {
      with: 64,
      height: 94,
    },
    lg: {
      with: 108,
      height: 151,
    },
  };

  const currentSize = IMG_SIZES[size];

  return (
    <RatingsDialog bookId={book?.id}>
      <Container>
        {book.alreadyRead && <ReadBadge>LIDO</ReadBadge>}

        <BookImage
          width={currentSize.with}
          height={currentSize.height}
          alt={book.name}
          src={book.cover_url}
          css={{ minWidth: currentSize.with }}
        />

        <BookDetails>
          <div>
            <BookName size="xs">{book.name}</BookName>

            <Text size="sm" color="gray-400">
              {book.author}
            </Text>
          </div>

          <RatingStars rating={book.avgRating} />
        </BookDetails>
      </Container>
    </RatingsDialog>
  );
};
