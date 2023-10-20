import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import RequestList from "./RequestList"
type properties = {
  isOpen: boolean
  onClose: () => void
}

function RequestBox({ onClose, isOpen }: properties) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent mr={4} ml={4}>
        <ModalHeader>Collaboration Requests</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={-2}>
          <RequestList />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RequestBox
