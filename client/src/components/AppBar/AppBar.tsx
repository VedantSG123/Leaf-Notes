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
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { getUserDataFromLocalStorage, UserData } from "../../Helpers/Verify"
import { useEffect, useState } from "react"

function AppBar() {
  const [user, setUser] = useState<UserData | null>(null)

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
  return (
    <>
      <Box
        bg={useColorModeValue("light.50", "dark.900")}
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
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default AppBar
