import { Box, CircularProgress, Container } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";
import preprocessorMessage from "/components/Message/MessageForm/preprocessorMessage";
import MessageForm from "/components/Message/MessageForm";
import setData from "/helpers/setData";
import { createMessage } from "/queries/mutations";

function MessageFormPage() {
  const router = useRouter();
  const mutation = useMutation(
    async (newFormData) => {
      await setData(createMessage, { data: newFormData });
    },
    {
      mutationKey: "createMessage",
      onSuccess: (data, variables) => {
        console.log("onSuccess", data, variables);
      },
    }
  );
  const handleSubmit = async (values) => {
    const modifiedValues = preprocessorMessage(values);
    await new Promise((r) => setTimeout(r, 500));

    mutation.mutate(
      { ...modifiedValues },
      {
        onSuccess: async (_res) => {
          router.push("/Message");
        },
        onError: async (err, varia) => {
          console.log("onError", err, varia);
        },
      }
    );

    if (mutation.isError) {
      console.log("failed", mutation.error);
    }
    if (mutation.onSettled) {
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>;
    }
  };
  if (mutation.isSuccess) {
  }

  return (
    <>
      <Head>
        <title>CT Add Message</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Container maxWidth="lg" sx={{ height: "90vh", pt:4 }}>
        <MessageForm handleSubmit={handleSubmit} />
      </Container>
    </>
  );
}

export default MessageFormPage;
