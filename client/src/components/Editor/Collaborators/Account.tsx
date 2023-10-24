import {
  Box,
  Avatar,
  useColorModeValue,
  Button,
  IconButton,
  Tag,
  TagLabel,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { MinusIcon } from "@chakra-ui/icons"
import { AxiosResponse } from "axios"
import { Account as AccountType } from "../../../Helpers/Types"
import { getUserDataFromLocalStorage } from "../../../Helpers/Verify"
import useButtonAxios from "../../../Helpers/Hooks/useButtonAxios"

interface properties extends AccountType {
  isOwner: boolean
  isAuthor: boolean
  noteId: string
}

function Account({ name, email, _id, isOwner, isAuthor, noteId }: properties) {
  const bg = useColorModeValue("secondary.50", "tertiary.900")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const token = getUserDataFromLocalStorage()?.data.token

  const showStatus = (res: AxiosResponse | null, error: string | null) => {
    if (res && !error) {
      if (res.status == 200) {
        toast({
          title: "Success",
          duration: 3000,
          isClosable: true,
          status: "success",
        })
        onClose()
      }
    } else {
      toast({
        title: "Error",
        duration: 3000,
        description: error,
        isClosable: true,
        status: "error",
      })
    }
  }
  const { loading, callApi } = useButtonAxios({
    url: `${import.meta.env.VITE_APIURL}/api/collab/removeCollab`,
    method: "put",
    body: {
      noteId: noteId,
      collabId: _id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    after: showStatus,
  })

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        backgroundColor={bg}
        borderRadius={8}
        p={2}
        width={"100%"}
        justifyContent={"space-between"}
        textAlign={"left"}
        mt={1}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <Box>
            <Avatar size={"xs"} name={name} />
          </Box>
          <Box ml={2} fontSize={12}>
            <Box>{name}</Box>
            <Box>{email}</Box>
          </Box>
        </Box>
        {isAuthor ? (
          isOwner && (
            <IconButton
              aria-label="remove user"
              isRound={true}
              variant={"solid"}
              icon={<MinusIcon />}
              size={"xs"}
              ml={4}
              colorScheme={"red"}
              onClick={onOpen}
            />
          )
        ) : (
          <Tag
            colorScheme={"secondary"}
            size={"sm"}
            ml={4}
            borderRadius={"full"}
          >
            Owner
          </Tag>
        )}
      </Box>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent mr={4} ml={4}>
          <ModalHeader>
            Are you sure to remove
            {
              <Tag
                size="sm"
                colorScheme="blue"
                borderRadius="full"
                p={1}
                mr={2}
                ml={2}
              >
                <Avatar size="xs" name={name} mr={1} />
                <TagLabel mr={1}>{name}</TagLabel>
              </Tag>
            }
            from collaborators for this note ?
          </ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme={"red"} onClick={callApi} disabled={loading}>
              Remove
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

export default Account
