import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Input,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import UserDisplayList from "./UserDisplayList"
import RequestCnf from "./RequestCnf"
import { UserRes } from "../../../Helpers/Requests/searchUser"
import { getUserDataFromLocalStorage } from "../../../Helpers/Verify"
import search from "../../../Helpers/Requests/searchUser"

interface properties {
  noteId: string
  isOpen: boolean
  noteTitle: string
  onClose: () => void
}

function UserSearch({ noteId, isOpen, onClose, noteTitle }: properties) {
  const [accounts, setAccounts] = useState<UserRes[]>()
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<UserRes>()
  const toast = useToast()
  const userdata = getUserDataFromLocalStorage()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setLoading(true)

    if (userdata) {
      try {
        search(userdata.data.token, event.target.value, setAccounts)
      } catch (err) {
        toast({
          title: "Cannot fetch users",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const handleTileClick = (user: UserRes) => {
    setSelected(user)
  }

  const handleBack = () => {
    setSelected(undefined)
  }
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent mr={4} ml={4}>
          <ModalHeader>Search User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} mb={2}>
              <Input
                variant={"filled"}
                value={query}
                onChange={handleChange}
                placeholder="Enter username or email"
                autoComplete="off"
              />
            </Box>
            {selected ? (
              <RequestCnf
                user={selected}
                noteTitle={noteTitle}
                back={handleBack}
                noteId={noteId}
              />
            ) : (
              <UserDisplayList
                userClick={handleTileClick}
                loading={loading}
                accounts={accounts}
              />
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UserSearch
