import { useSession } from "next-auth/react";
import {
  ActionsContainer,
  Container,
  FormContainer,
  UserDetails,
} from "./styles";
import { Avatar } from "../ui/Avatar";
import { Heading } from "../Typography";
import { RatingStars } from "../RatingStars";
import { FormEvent, useState } from "react";
import { TextArea } from "../ui/TextArea";
import { ActionIcon } from "../ui/ActionIcon";
import { Check, X } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

type RatingFormProps = {
  onCancel: () => void;
  bookId: string;
};

export const RatingForm = ({ onCancel, bookId }: RatingFormProps) => {
  const [currentRate, setcurrentRate] = useState(0);
  const [description, setDescription] = useState("");

  const { data: session } = useSession();
  const submitDisabled = !description.trim() || !currentRate;
  const user = session?.user;

  const queryClient = useQueryClient();

  async function handleAddComents() {
    await api.post(`/books/${bookId}/rate`, {
      description,
      rating: currentRate, // Mantém 'rating' como nome do campo
    });
    onCancel();
  }

  const { mutateAsync: handleRate } = useMutation({
    mutationFn: handleAddComents,
    onSuccess: () => {
      queryClient.invalidateQueries(["book", bookId]);
      queryClient.invalidateQueries(["books"]);
      onCancel();
    },
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (submitDisabled) return;
    await handleRate();
  };

  return (
    <Container>
      {user && (
        <UserDetails>
          <section>
            <Avatar alt={user.name} src={user.avatar_url} />
            <Heading size="xs">{user.name}</Heading>
          </section>

          <RatingStars
            size="lg"
            rating={currentRate}
            setRating={setcurrentRate}
          />
        </UserDetails>
      )}

      <FormContainer onSubmit={handleSubmit}>
        <TextArea
          placeholder="Escreva sua avaliação"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          maxLength={450}
        />

        <ActionsContainer>
          <ActionIcon
            type="button"
            onClick={onCancel}
            iconColor="purple100"
            icon={<X />}
          />
          <ActionIcon
            iconColor="green100"
            icon={<Check />}
            disabled={submitDisabled}
          />
        </ActionsContainer>
      </FormContainer>
    </Container>
  );
};
