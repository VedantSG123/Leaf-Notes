import { Box } from "@chakra-ui/react"
import { UserRes } from "../../../Helpers/Requests/searchUser"
import UserDisplayTile from "./UserDisplayTile"
import UserDisplaySkeleton from "./UserDisplaySkeleton"

interface properties {
  loading: boolean
  accounts: UserRes[] | undefined
  userClick: (user: UserRes) => void
}
function UserDisplayList({ loading, accounts, userClick }: properties) {
  return (
    <>
      <Box p={2} height={"400px"} overflowY={"auto"}>
        {loading ? (
          <UserDisplaySkeleton />
        ) : (
          accounts &&
          accounts.map((account, index) => {
            return (
              <UserDisplayTile
                key={index}
                name={account.name}
                email={account.email}
                _id={account._id}
                tileClick={() => userClick(account)}
              />
            )
          })
        )}
      </Box>
    </>
  )
}

export default UserDisplayList
