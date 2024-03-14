import React, { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      //TODO add  register and log in
      registerModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [registerModal]);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUserName(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-center mt-4 text-neutral-400">
      <p>
        Already have an account?{" "}
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          Sign in
        </span>
      </p>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      onClose={registerModal.onClose}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
