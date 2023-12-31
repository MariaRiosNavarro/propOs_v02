import styled from "styled-components";
import { useRouter } from "next/router";
import Navigation from "../../../../components/Navigation";
import ContactForm from "../../../../components/ContactForm";
import useSWR from "swr";
import {
  PageContainer,
  StyledButtonsContainer,
} from "../../../../components/components.style";
//new library to make confirm delete message, styles in styles.js
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ThemeContext } from "../../../_app";
import { useContext } from "react";

const StyledSuccessMessage = styled.h5`
  text-align: center;
  background-color: green;
  padding: 1rem;
  margin: 4rem;
  border-radius: 8px;
`;

const StyledButton = styled.button`
  background-color: var(--primary-color);
  border: none;
  border-radius: 8px;
  padding: 1rem;
  width: 20rem;
  &:hover {
    background-color: var(--hover-color);
  }
`;
//----------------------------------------------- FUNCTION------------HERE

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const id = router.query.id;
  const {
    data: contact,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/contacts/${id}`);

  const { theme, customColor } = useContext(ThemeContext);

  async function handleEdit(contactData) {
    console.log(contactData);
    const response = await fetch(`/api/contacts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });
    if (response.ok) {
      console.log(response);
      mutate();
    }

    router.push(`/contacts`);
  }
  if (!isReady || isLoading || error || !id) return <h2>Loading</h2>;

  async function handleDelete() {
    await fetch(`/api/contacts/${id}`, {
      method: "DELETE",
    });
    router.push("/contacts");
  }

  //ConfirmAlert Library

  function submitDelete() {
    confirmAlert({
      message: "Kontakt löschen?",
      buttons: [
        {
          label: "löschen",
          onClick: () => handleDelete(),
        },
        {
          label: "Abrechen",
        },
      ],
    });
  }

  return (
    <>
      <PageContainer theme={theme} customColor={customColor}>
        <ContactForm
          onSubmit={handleEdit}
          formName="edit-contact"
          defaultData={contact}
        />
        <StyledButtonsContainer>
          <StyledButton onClick={submitDelete}>loschen</StyledButton>
        </StyledButtonsContainer>
        <Navigation />
      </PageContainer>
    </>
  );
}
