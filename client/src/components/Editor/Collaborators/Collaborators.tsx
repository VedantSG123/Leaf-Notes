import {
  Menu,
  MenuButton,
  MenuList,
  Box,
  Button,
  Icon,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { HiUserGroup } from "react-icons/hi2"
import useAxios from "../../../Helpers/Hooks/useAxios"
import { Account as AccountType } from "../../../Helpers/Types"
import { getUserDataFromLocalStorage } from "../../../Helpers/Verify"
import Account from "./Account"
import UserSearch from "../../Notes/UserSearch/UserSearch"
type properties = {
  noteId: string
  isOwner: boolean
  title: string
}

function Collaborators({ noteId, isOwner, title }: properties) {
  const token = getUserDataFromLocalStorage()?.data.token
  const bg = useColorModeValue("secondary.50", "tertiary.900")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { response } = useAxios<AccountType[]>({
    url: `${
      import.meta.env.VITE_APIURL
    }/api/collab/getCollaborators?noteId=${noteId}`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          variant={"ghost"}
          leftIcon={<Icon as={HiUserGroup} />}
        ></MenuButton>
        <MenuList
          pr={2}
          pl={2}
          maxH={"300px"}
          maxW={"350px"}
          width={"100%"}
          overflowY={"auto"}
        >
          {isOwner && (
            <Box
              display={"flex"}
              alignItems={"center"}
              backgroundColor={bg}
              borderRadius={8}
              width={"100%"}
              justifyContent={"center"}
              textAlign={"left"}
              mt={1}
              as={Button}
              leftIcon={<AddIcon />}
              height={14}
              onClick={onOpen}
            >
              Add Collaborator
            </Box>
          )}
          {response ? (
            response.map((account, index) => {
              return index === response.length - 1 ? (
                <Account
                  name={account.name}
                  email={account.email}
                  _id={account._id}
                  key={index}
                  isOwner={isOwner}
                  isAuthor={false}
                  noteId={noteId}
                />
              ) : (
                <Account
                  name={account.name}
                  email={account.email}
                  _id={account._id}
                  key={index}
                  isOwner={isOwner}
                  isAuthor={true}
                  noteId={noteId}
                />
              )
            })
          ) : (
            <div>loading.....</div>
          )}
        </MenuList>
      </Menu>
      <UserSearch
        onClose={onClose}
        noteId={noteId}
        noteTitle={title}
        isOpen={isOpen}
      />
    </>
  )
}

export default Collaborators
