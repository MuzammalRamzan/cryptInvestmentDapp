import React, { useState } from "react";

const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((prev) => !prev);
  return { isOpen, onClose, onOpen, onToggle };
};

export default useDisclosure;
