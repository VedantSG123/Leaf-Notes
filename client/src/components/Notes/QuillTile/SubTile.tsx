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

interface properties {
  title: string
  isGroup: boolean
  isDeleted: boolean
  trash: () => void
  deleteNote: () => void
}

function SubTile({ title, isGroup, trash, isDeleted, deleteNote }: properties) {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
                  <MenuItem onClick={onOpen}>Delete Permanently</MenuItem>
                )}
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Box>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
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
                onClose()
                deleteNote()
              }}
              variant={"secondary"}
            >
              Delete
            </Button>
            <Button ml={2} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SubTile
