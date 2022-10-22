import {
  Stack,
  Heading,
  Wrap,
  WrapItem,
  Text,
  Container,
  Highlight,
} from "@chakra-ui/react";

import * as dataCompetitor from "../competitor/Competitor";

const VariablesCard = () => {
  const data = dataCompetitor.dataset$VarData;
  console.log(data[0], data[0][1]);
  return (
    <>
      {data.map((variable: any, index: any) => {
        return (
          <Stack key={index} p="4" boxShadow="lg" m="4" borderRadius="sm">
            <Wrap spacing="30px" justify="space-between">
              <WrapItem>
                <Stack direction="column" alignItems="left" p={2}>
                  <Heading fontSize={"xl"} color={"green.800"}>
                    {variable[0]}
                  </Heading>
                  <Text fontSize={"sm"}>{variable[1].type}</Text>
                  <Stack direction="column">
                    <Text
                      fontSize="xs"
                      style={{
                        display: "inline",
                        whiteSpace: "pre",
                        lineHeight: "200%",
                      }}
                    >
                      <Highlight
                        query={variable[1].is}
                        styles={{
                          px: "1.5",
                          py: ".5",
                          rounded: "full",
                          color: "red.500",
                          bg: "red.50",
                        }}
                      >
                        {variable[1].isRepeat > 1
                          ? (variable[1].is + "\n").repeat(variable[1].isRepeat)
                          : variable[1].is}
                      </Highlight>
                    </Text>
                  </Stack>
                </Stack>
              </WrapItem>
            </Wrap>
          </Stack>
        );
      })}
    </>
  );
};

const Variables = () => {
  return (
    <>
      <Stack px="6" py="2">
        <Heading fontSize={"2xl"}>Variables</Heading>
      </Stack>
      <VariablesCard />
    </>
  );
};
export default Variables;
