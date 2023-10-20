import {
  Box,
  Button,
  Icon,
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react"
import { HiUser, HiUserGroup } from "react-icons/hi2"
import { HiMiniEllipsisVertical } from "react-icons/hi2"
import UserSearch from "../UserSearch/UserSearch"

interface properties {
  title: string
  isGroup: boolean
  isDeleted: boolean
  noteId: string
  trash: () => void
  deleteNote: () => void
}

function SubTile({
  title,
  isGroup,
  trash,
  isDeleted,
  deleteNote,
  noteId,
}: properties) {
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure()
  const {
    isOpen: searchIsOpen,
    onOpen: searchOnOpen,
    onClose: searchOnClose,
  } = useDisclosure()
  return (
    <>
      <Box
        backgroundColor={useColorModeValue("primary.100", "dark.900")}
        style={{
          borderRight: "1px solid #ccc",
          borderLeft: "1px solid #ccc",
          borderBottom: "1px solid #ccc",
        }}
        p={2}
        height={"78px"}
      >
        <Box>
          <Text ml={3}>{title === "" ? "Untitled" : title}</Text>
        </Box>
        <Box mt={2} display={"flex"} justifyContent={"space-between"}>
          <Box>
            <Button rounded={"full"} variant={"link"}>
              {isGroup ? <Icon as={HiUserGroup} /> : <Icon as={HiUser} />}
            </Button>
          </Box>
          <Box>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
              >
                <Icon as={HiMiniEllipsisVertical} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={trash}>
                  {isDeleted ? "Restore" : "Move to Trash"}
                </MenuItem>
                {isDeleted && (
                  <MenuItem onClick={deleteOnOpen}>Delete Permanently</MenuItem>
                )}
                <MenuItem onClick={searchOnOpen}>Add Collaborator</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Box>
      <Modal onClose={deleteOnClose} isOpen={deleteIsOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure to permanently delete this Note?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                deleteOnClose()
                deleteNote()
              }}
              variant={"secondary"}
            >
              Delete
            </Button>
            <Button ml={2} onClick={deleteOnClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <UserSearch
        onClose={searchOnClose}
        noteId={noteId}
        noteTitle={title}
        isOpen={searchIsOpen}
      />
    </>
  )
}

export default SubTile
