import {
  Box,
  Button,
  IconButton,
  Avatar,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { UserRes } from "../../../Helpers/Requests/searchUser"
import useButtonAxios from "../../../Helpers/Hooks/useButtonAxios"
import { AxiosResponse } from "axios"
import { getUserDataFromLocalStorage } from "../../../Helpers/Verify"

interface properties {
  user: UserRes
  back: () => void
  noteTitle: string
  noteId: string
}

function RequestCnf({ user, noteTitle, back, noteId }: properties) {
  const bg = useColorModeValue("secondary.50", "tertiary.900")
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
    url: `${import.meta.env.VITE_APIURL}/api/collab/createRequest`,
    method: "post",
    body: {
      noteId: noteId,
      collabId: user,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    after: showStatus,
  })
  return (
    <Box p={2} height={"400px"} overflowY={"auto"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <IconButton
          aria-label="return to search"
          icon={<ArrowBackIcon />}
          onClick={back}
        />
        <Button variant={"secondary"} onClick={callApi} disabled={loading}>
          Send
        </Button>
      </Box>
      <Box mt={2}>
        <Box mt={2}>Request to:</Box>
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
        >
          <Box>
            <Avatar name={user.name} />
          </Box>
          <Box ml={2}>
            <Box>{user.name}</Box>
            <Box>{user.email}</Box>
          </Box>
        </Box>
        <Box mt={2}>{`For: ${noteTitle}`}</Box>
      </Box>
    </Box>
  )
}

export default RequestCnf
