import {
  BooksGrid,
  ExploreContainer,
  TagsContainer,
} from "@/styles/pages/explore";
import { NextPageWithLayout } from "./_app";
import { DefaultLayout } from "@/layouts/defaultLayout";
import { PageTitle } from "@/components/ui/PageTitle";
import { Binoculars, MagnifyingGlass } from "@phosphor-icons/react";
import { Input } from "@/components/ui/Form/Input";
import { useState } from "react";
import { Tag } from "@/components/ui/Tag";
import { BookCard, BookWithAvgRating } from "@/components/BookCard";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@prisma/client";
import { api } from "@/lib/axios";

const ExplorePage: NextPageWithLayout = () => {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string | null>();

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await api.get("/books/categories");
      return data?.categories ?? [];
    },
  });

  const { data: books } = useQuery<BookWithAvgRating[]>({
    queryKey: ["books", selectedTags],
    queryFn: async () => {
      const { data } = await api.get("/books", {
        params: {
          category: selectedTags,
        },
      });
      return data?.books ?? [];
    },
  });

  const filteredBooks = books?.filter((book) => {
    return (
      book.name.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <ExploreContainer>
        <header>
          <PageTitle title="Explorar" icon={<Binoculars size={32} />} />

          <Input
            placeholder="Buscar livro ou autor"
            icon={<MagnifyingGlass size={20} />}
            css={{
              maxWidth: 433,
            }}
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
        </header>

        <TagsContainer>
          <Tag
            active={selectedTags === null}
            onClick={() => setSelectedTags(null)}
          >
            Tudo
          </Tag>

          {categories?.map((categorie) => {
            return (
              <Tag
                key={categorie?.id}
                active={selectedTags === categorie.id}
                onClick={() => setSelectedTags(categorie.id)}
              >
                {categorie?.name}
              </Tag>
            );
          })}
        </TagsContainer>

        <BooksGrid>
          {filteredBooks?.map((book) => {
            return <BookCard key={book?.id} book={book} size="lg" />;
          })}
        </BooksGrid>
      </ExploreContainer>
    </>
  );
};

ExplorePage.getLayout = (page) => {
  return (
    <div>
      <DefaultLayout title="Inicio">{page}</DefaultLayout>
    </div>
  );
};

export default ExplorePage;
