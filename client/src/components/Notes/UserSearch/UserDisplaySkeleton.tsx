import { VStack, Skeleton } from "@chakra-ui/react"

function UserDisplaySkeleton() {
  return (
    <>
      <VStack>
        <Skeleton height={16} mt={2} />
        <Skeleton height={16} mt={2} />
        <Skeleton height={16} mt={2} />
        <Skeleton height={16} mt={2} />
      </VStack>
    </>
  )
}

export default UserDisplaySkeleton
