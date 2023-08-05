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
} from "@chakra-ui/react"
import { HiUser, HiUserGroup } from "react-icons/hi2"
import { HiMiniEllipsisVertical } from "react-icons/hi2"

interface properties {
  title: string
  isGroup: boolean
  trash: () => void
}

function SubTile({ title, isGroup, trash }: properties) {
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
                <MenuItem onClick={trash}>Move to Trash</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default SubTile
