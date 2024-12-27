import { ComponentProps } from "@stitches/react";
import { Container } from "./styles";
import { ReactNode } from "react";
import { Heading } from "@/components/Typography";

type PageTypeProps = ComponentProps<typeof Container> & {
  icon: ReactNode;
  title: string;
};

export const PageTitle = ({ title, icon, ...props }: PageTypeProps) => {
  return (
    <>
      <Container {...props}>
        {icon}
        <Heading size="lg">{title}</Heading>
      </Container>
    </>
  );
};
