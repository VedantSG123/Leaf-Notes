import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
  Heading,
  useDisclosure,
  ModalOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserDataFromLocalStorage, UserData } from "../../Helpers/Verify"
import { deleteUserDataFromLocalStorage } from "../../Helpers/Verify"

function AppBar() {
  const [user, setUser] = useState<UserData | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  useEffect(() => {
    const getUser = () => {
      const userdata = getUserDataFromLocalStorage()
      if (userdata) {
        setUser(userdata)
      }
    }
    getUser()
  })
  const { colorMode, toggleColorMode } = useColorMode()

  const logout = () => {
    deleteUserDataFromLocalStorage()
    navigate("/login")
  }
  return (
    <>
      <Box
        bg={useColorModeValue("light.50", "main.900")}
        px={4}
        width={"100%"}
        position={"sticky"}
        top={0}
        zIndex={100}
      >
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <Flex alignItems={"center"}>
            <Box>
              <Image src="/leaf-note-s.png" boxSize="30px" objectFit="cover" />
            </Box>
            <Box ml={"5px"}>
              <Heading size={"lg"}>Leaf Notes</Heading>
            </Box>
          </Flex>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? (
                  <MoonIcon color="blue.700" />
                ) : (
                  <SunIcon color="orange.400" />
                )}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} name={user?.data.name} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar size={"2xl"} name={user?.data.name} />
                  </Center>
                  <br />
                  <Center>
                    <p>{user?.data.name}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={() => navigate("/home/trash")}>
                    Recycle Bin
                  </MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={onOpen}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Logout ?</ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button onClick={logout} variant={"secondary"}>
                Logout
              </Button>
              <Button ml={2} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  )
}

export default AppBar
