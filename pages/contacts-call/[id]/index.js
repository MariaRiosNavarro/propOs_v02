import styled, { keyframes } from "styled-components";
import { callEndSVG } from "../../../components/assets/contactsSVG";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import { StyledLoading } from "../../../components/components.style";
import Image from "next/image";
import contactplaceholder from "../../../components/assets/contactplaceholder.jpg";
//--------------------STYLE

const StyledCallContainer = styled.div`
  background-color: #080202;
  margin: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const StyledBigHeader = styled.h2`
  display: inline;
  font-size: x-large;
  font-weight: bold;
  position: absolute;
  top: 6rem;
  margin: 0;
  color: var(--lightBG);
`;

//Animation for the red button

const callanimation = keyframes`
0% {
  transform:scale(1);
}
50%{
  transform:scale(1.4);
}
100%{
  transform:scale(1);
}
`;

const StyledButton = styled.div`
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  background-color: red;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${callanimation} 2s infinite;
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
  padding-bottom: 0.5rem;
`;

//----------------------------------------------- FUNCTION------------HERE

export default function CallContactsDetail() {
  const router = useRouter();
  const { query } = router;
  const { id } = query;

  const {
    data: contact,
    isLoading,
    error,
  } = useSWR(`/api/contacts-call/${id}`);

  if (isLoading)
    return <StyledLoading>Verbindung wird hergestellt...</StyledLoading>;
  if (error) return <h2>Error...</h2>;

  return (
    <>
      <StyledCallContainer>
        <StyledBigHeader>{contact.name}</StyledBigHeader>
        <StyledImage
          src={contact.photo || contactplaceholder}
          alt="Contact Photo"
          width={200}
          height={200}
        />
        <Link href={"/contacts"}>
          <StyledButton>{callEndSVG}</StyledButton>
        </Link>
      </StyledCallContainer>
    </>
  );
}
