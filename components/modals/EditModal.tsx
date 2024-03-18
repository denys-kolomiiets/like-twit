import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCoverImage(currentUser?.coverImage);
    setProfileImage(currentUser?.profileImage);
    setBio(currentUser?.bio || "");
    setUsername(currentUser?.username);
    setName(currentUser?.name);
  }, [
    currentUser?.coverImage,
    currentUser?.profileImage,
    currentUser?.bio,
    currentUser?.username,
    currentUser?.name,
  ]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });
      mutateFetchedUser();

      toast.success("Updated");

      editModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    editModal,
    name,
    username,
    bio,
    mutateFetchedUser,
    profileImage,
    coverImage,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );

  return (
    <Modal
      onClose={editModal.onClose}
      disabled={isLoading}
      isOpen={editModal.isOpen}
      actionLabel="Save"
      onSubmit={onSubmit}
      title="Edit your profile"
      body={bodyContent}
    />
  );
};

export default EditModal;
