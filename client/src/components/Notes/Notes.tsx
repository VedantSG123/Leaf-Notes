import {
  Tab,
  Tabs,
  TabList,
  Icon,
  Flex,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react"
import { HiUser, HiUserGroup } from "react-icons/hi2"
import Personal from "./Personal/Personal"
import Shared from "./Shared/Shared"

function Notes() {
  return (
    <>
      <Tabs variant="soft-rounded" colorScheme="green" mt={"20px"}>
        <Flex />
        <TabList
          w={"fit-content"}
          ml={"auto"}
          mr={"auto"}
          borderRadius={"9999px"}
          border={"2px solid"}
          borderColor={"green.100"}
        >
          <Tab>
            <Icon as={HiUser} mr={"6px"} />
            My Notes
          </Tab>
          <Tab>
            <Icon as={HiUserGroup} mr={"6px"} />
            Shared Notes
          </Tab>
        </TabList>
        <Flex />
        <TabPanels mt={"40px"}>
          <TabPanel>
            <Personal />
          </TabPanel>
          <TabPanel>
            <Shared />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Notes
