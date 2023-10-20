import {
  Box,
  Avatar,
  useColorModeValue,
  Tag,
  useToast,
  Button,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Collaborator } from "../../Helpers/Types"
import { AxiosResponse } from "axios"
import useButtonAxios from "../../Helpers/Hooks/useButtonAxios"
import { getUserDataFromLocalStorage } from "../../Helpers/Verify"

type properties = {
  collaborator: Collaborator
}

export default function RequestTile({ collaborator }: properties) {
  const bg = useColorModeValue("secondary.50", "tertiary.900")
  const token = getUserDataFromLocalStorage()?.data.token
  const toast = useToast()

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

  const accept = useButtonAxios({
    url: `${import.meta.env.VITE_APIURL}/api/collab/acceptRequest`,
    method: "put",
    body: {
      requestId: collaborator.request._id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    after: showStatus,
  })

  const decline = useButtonAxios({
    url: `${import.meta.env.VITE_APIURL}/api/collab/declineRequest?requestId=${
      collaborator.request._id
    }`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    after: showStatus,
  })

  return (
    <>
      <Box backgroundColor={bg} borderRadius={16} p={4} width={"100%"} mt={2}>
        <Box>
          <Tag borderRadius="full" colorScheme="teal">
            From
          </Tag>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          textAlign={"left"}
          mt={2}
        >
          <Box>
            <Avatar name={collaborator.senderDetails.name} />
          </Box>
          <Box ml={2}>
            <Box>{collaborator.senderDetails.name}</Box>
            <Box>{collaborator.senderDetails.email}</Box>
          </Box>
        </Box>
        <Box mt={4}>
          <Tag borderRadius="full" colorScheme="yellow">
            <Link to={`/preview/${collaborator.request.note}`} target="_blank">
              Preview Note <ExternalLinkIcon mx="2px" />
            </Link>
          </Tag>
        </Box>
        <Box mt={4} display={"flex"} mb={1}>
          <Button
            variant={"secondary"}
            size={"sm"}
            onClick={accept.callApi}
            disabled={accept.loading || decline.loading}
          >
            Accept
          </Button>
          <Button
            ml={2}
            size={"sm"}
            onClick={decline.callApi}
            disabled={decline.loading || accept.loading}
          >
            Decline
          </Button>
        </Box>
      </Box>
    </>
  )
}
