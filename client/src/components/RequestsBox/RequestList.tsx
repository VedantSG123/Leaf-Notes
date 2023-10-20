import { Box } from "@chakra-ui/react"
import { getUserDataFromLocalStorage } from "../../Helpers/Verify"
import useAxios from "../../Helpers/Hooks/useAxios"
import RequestTileSkeleton from "./RequestTileSkeleton"
import RequestTile from "./RequestTile"
import { Collaborator } from "../../Helpers/Types"

function RequestList() {
  const token = getUserDataFromLocalStorage()?.data.token
  const { response, loading } = useAxios<Collaborator[]>({
    url: `${import.meta.env.VITE_APIURL}/api/collab/getRequests`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return (
    <Box p={2} height={"400px"} overflowY={"auto"}>
      {loading ? (
        <RequestTileSkeleton />
      ) : response ? (
        response.map((collaborator, index) => {
          return <RequestTile key={index} collaborator={collaborator} />
        })
      ) : (
        <Box>Failed to get Requests</Box>
      )}
    </Box>
  )
}

export default RequestList
