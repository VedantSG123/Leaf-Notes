import { Box, Skeleton, Stack, useColorModeValue } from "@chakra-ui/react"

function TileSkeleton() {
  return (
    <Box maxW={"180px"} height={"280px"}>
      <Box width={"100%"} height={"200px"} p={4}>
        <Stack>
          <Skeleton>No Content</Skeleton>
          <Skeleton>No Content</Skeleton>
          <Skeleton>No Content</Skeleton>
          <Skeleton>No Content</Skeleton>
        </Stack>
      </Box>
      <Box
        width={"100%"}
        height={"78px"}
        backgroundColor={useColorModeValue("primary.100", "dark.900")}
        p={4}
      >
        <Skeleton>No Content</Skeleton>
      </Box>
    </Box>
  )
}

export default TileSkeleton
