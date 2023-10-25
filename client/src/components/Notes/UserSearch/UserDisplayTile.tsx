import { Box, Avatar, useColorModeValue, Button } from "@chakra-ui/react"
import { UserRes } from "../../../Helpers/Requests/searchUser"
interface properties extends UserRes {
  tileClick: () => void
}

function UserDisplayTile({ name, email, tileClick }: properties) {
  const bg = useColorModeValue("secondary.50", "tertiary.900")

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        backgroundColor={bg}
        borderRadius={16}
        p={2}
        width={"100%"}
        justifyContent={"flex-start"}
        textAlign={"left"}
        height={16}
        mt={2}
        as={Button}
        onClick={tileClick}
      >
        <Box>
          <Avatar name={name} />
        </Box>
        <Box ml={2}>
          <Box>{name}</Box>
          <Box>{email}</Box>
        </Box>
      </Box>
    </>
  )
}

export default UserDisplayTile
