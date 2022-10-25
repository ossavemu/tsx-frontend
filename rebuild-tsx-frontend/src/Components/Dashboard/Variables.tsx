import {
  Stack,
  Heading,
  Grid,
  GridItem,
  Text,
  Highlight,
  TableContainer,
  Tbody,
  Table,
  Tr,
  Td
} from '@chakra-ui/react'

const PanelVarId = ({ variable }: any) => {
  return (
    <>
      <Stack direction='column' alignItems='left' p={2}>
        <Heading fontSize={'xl'}>{variable[0]}</Heading>
        <Text fontSize={'sm'}>{variable[1].type}</Text>
        <Stack direction='column'>
          <Text
            fontSize='xs'
            style={{
              display: 'inline',
              whiteSpace: 'pre',
              lineHeight: '200%'
            }}
          >
            <Highlight
              query={variable[1].is}
              styles={{
                px: '1.5',
                py: '.5',
                rounded: 'full',
                color: 'red.500',
                bg: 'red.50'
              }}
            >
              {variable[1].isRepeat > 1
                ? (variable[1].is + '\n').repeat(variable[1].isRepeat)
                : variable[1].is}
            </Highlight>
          </Text>
        </Stack>
      </Stack>
    </>
  )
}

const TabSmallContainer = ({ variable, filterCallback }: any) => {
  return (
    <>
      {Object.keys(variable[1]).filter(filterCallback).length > 7 && (
        //Chakra UI Table with the width of the parent container, but change in a mobile view
        <TableContainer maxW='100%' overflowX='auto'>
          <Table variant='simple' size={'sm'}>
            <Tbody>
              {Object.keys(variable[1])
                .filter(filterCallback)
                .map((value: string | number, index: number) => {
                  const content = Object.entries(variable[1])
                  const tabContent: any = (() => {
                    const validContent = content.filter(
                      content => content[0] === value
                    )
                    return validContent[0][1]
                  })()
                  if (index > 6)
                    return (
                      <Tr key={index}>
                        <Td>
                          <Text as='b' fontSize={'sm'}>
                            {value}
                          </Text>
                        </Td>
                        <Td>{tabContent}</Td>
                      </Tr>
                    )
                })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

const VariablesCard = ({ dataSource }: any) => {
  const [data] = dataSource
  const filterCallback: any = (key: string | number) =>
    key !== 'is' && key !== 'type' && key !== 'isRepeat'
  const NewTableGenerator = ({ variable }: any) => {
    return (
      <>
        {Object.keys(variable[1])
          .filter(filterCallback)
          .map((value: string | number, index: number) => {
            const content = Object.entries(variable[1])
            const tabContent: any = (() => {
              const validContent = content.filter(
                content => content[0] === value
              )
              return validContent[0][1]
            })()
            if (index <= 6)
              return (
                <Tr key={index}>
                  <Td>
                    <Text as='b' fontSize={'sm'}>
                      {value}
                    </Text>
                  </Td>
                  <Td>{tabContent}</Td>
                </Tr>
              )
          })}
      </>
    )
  }
  return (
    <>
      {data.map((variable: any, index: number) => {
        return (
          <Stack key={index} p='4' boxShadow='lg' m='4' borderRadius='sm'>
            <Grid>
              <GridItem w='100%'>
                <PanelVarId variable={variable} />
              </GridItem>
              <GridItem w='100%'>
                <TableContainer mt={2} pr={20}>
                  <Table variant='simple' size={'sm'}>
                    <Tbody>
                      <NewTableGenerator variable={variable} />
                    </Tbody>
                  </Table>
                </TableContainer>
              </GridItem>
              <GridItem w='30%' h='full'>
                <TabSmallContainer
                  variable={variable}
                  filterCallback={filterCallback}
                />
              </GridItem>
            </Grid>
          </Stack>
        )
      })}
    </>
  )
}

const Variables = ({ data }: any) => {
  return (
    <>
      <Stack px='6' py='2'>
        <Heading fontSize={'2xl'}>Variables</Heading>
      </Stack>
      <VariablesCard dataSource={data} />
    </>
  )
}
export default Variables
