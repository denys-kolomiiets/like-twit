import Header from "@/components/Header";
import { NextPageContext } from "next";
import React from "react";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
const Notifications = () => {
  return (
    <>
      <Header label="Notifications" />
    </>
  );
};

export default Notifications;
