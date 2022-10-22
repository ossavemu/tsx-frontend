import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Text,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Container,
  Highlight,
  Wrap,
  WrapItem,
  Button
} from '@chakra-ui/react'

import * as dataCompetitor from '../competitor/Competitor'

import { useState } from 'react'

const OVERVIEW_TAGS = [
  'Number of variables',
  'Number of observations',
  'Missing cells',
  'Missing cells (%)',
  'Duplicate rows',
  'Duplicate rows (%)',
  'Total size in memory',
  'Average record size in memory'
]

const AlertOverview = ({ alerts }: any) => {
  const variables = Object.keys(alerts)
  const contents = Object.values(alerts)
  const predicate = contents.map((content, index) => {
    const stringify = ' ' + content
    let pred = stringify.split(',')
    pred.pop()
    return pred.join(' ')
  })
  const status = contents.map((contents: any) => {
    return contents[contents.length - 1]
  })
  return (
    <>
      <TableContainer mt={2} pr={20} w={'100%'}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize={'2x1'}>Variable statistics</Th>
              <Th>{''}</Th>
            </Tr>
          </Thead>
          <Tbody fontSize={'sm'}>
            {predicate.map((pred, index) => {
              return (
                <Tr key={index}>
                  <Td>
                    <Highlight
                      query={variables}
                      styles={{
                        px: '2',
                        py: '1',
                        rounded: 'full',
                        color: 'red.500',
                        bg: 'red.50'
                      }}>
                      {variables[index] + pred}
                    </Highlight>
                  </Td>

                  <Td>
                    {status[index] === 'CONSTANT' ? (
                      <Highlight
                        query={status}
                        styles={{
                          fontSize: 'sm',
                          px: '2',
                          py: '1',
                          rounded: 'full',
                          color: 'white',
                          bg: 'orange.500'
                        }}>
                        {status[index]}
                      </Highlight>
                    ) : status[index] === 'HIGH CORRELATION' ? (
                      <Highlight
                        query={status}
                        styles={{
                          px: '2',
                          py: '1',
                          rounded: 'full',
                          color: 'white',
                          bg: 'gray.500'
                        }}>
                        {status[index]}
                      </Highlight>
                    ) : (
                      status[index] === 'UNIQUE' && (
                        <Highlight
                          query={status}
                          styles={{
                            px: '2',
                            py: '1',
                            rounded: 'full',
                            color: 'white',
                            bg: 'blue.500'
                          }}>
                          {status[index]}
                        </Highlight>
                      )
                    )}
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

const OverviewTable = ({ overview, variables }: any) => {
  const contents = Object.values(overview)

  return (
    <Wrap spacing="30px" justify="space-between">
      <WrapItem>
        <TableContainer w="124%" p="2">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize={'2x1'}>Dataset statistics</Th>
                <Th>{''}</Th>
              </Tr>
            </Thead>
            <Tbody fontSize={'sm'}>
              {contents.map((content: any, index) => {
                return (
                  <Tr key={index}>
                    <Td>{OVERVIEW_TAGS[index]}</Td>
                    <Td>{content}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </WrapItem>

      <WrapItem>
        <TableContainer mr={60} p="2" w="100%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize={'2x1'}>Variable statistics</Th>
                <Th>{''}</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Number of numeric variables</Td>
                <Td>{variables['numeric']}</Td>
              </Tr>
              <Tr>
                <Td>Number of numeric categorical</Td>
                <Td>{variables['categorical']}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </WrapItem>
    </Wrap>
  )
}

const OverviewCard = ({ setPage, dataset }: any) => {
  let { dataset$Alerts, dataset$Overview, dataset$Variables } = dataset
  const [tabIndex, setTabIndex] = useState(0)
  return (
    <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
      <Stack direction="row" alignItems="center">
        <Heading fontSize={'2xl'}>Overview</Heading>
      </Stack>

      <Stack justifyContent="space-between">
        <Tabs
          variant="soft-rounded"
          colorScheme="green"
          mt={4}
          onChange={(index) => {
            setTabIndex(index)
          }}>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>
              Alerts
              {tabIndex === 1 ? (
                <Text
                  mx={2}
                  px={2}
                  py={1}
                  rounded="full"
                  bg="white"
                  color="green.800"
                  fontSize="sm"
                  fontWeight={'bold'}>
                  {Object.keys(dataset$Alerts).length}
                </Text>
              ) : (
                <Text
                  mx={2}
                  px={2}
                  py={1}
                  rounded="full"
                  bg="gray.500"
                  color="white"
                  fontSize="xs">
                  {Object.keys(dataset$Alerts).length}
                </Text>
              )}
            </Tab>
            <Tab>Reproduction</Tab>
          </TabList>
          <TabPanels>
            <TabPanel w="full" h="full">
              <Container maxW={'container.xl'} p={0}>
                <OverviewTable
                  overview={dataset$Overview}
                  variables={dataset$Variables}
                />
              </Container>
            </TabPanel>
            <TabPanel>
              <AlertOverview alerts={dataset$Alerts} />
            </TabPanel>
            <TabPanel>
              <Text>xd</Text>
              <Button onClick={() => setPage('void')}></Button>
              <Button onClick={() => setPage('Competitor')}></Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Stack>
  )
}
const Overview = () => {
  const [page, setPage] = useState('Competitor')
  const [dataset$Alerts, dataset$Overview, dataset$Variables] = (() => {
    if (page === 'Competitor') {
      return [
        dataCompetitor.dataset$Alerts,
        dataCompetitor.dataset$Overview,
        dataCompetitor.dataset$Variables
      ]
    }
    return [[], [], []]
  })()

  return (
    <OverviewCard
      setPage={setPage}
      dataset={{
        dataset$Alerts,
        dataset$Overview,
        dataset$Variables
      }}
    />
  )
}
export default Overview
