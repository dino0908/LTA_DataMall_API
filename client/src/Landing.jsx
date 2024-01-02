import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
// These are the default breakpoints

function Landing() {
  const breakpoints = {
    base: "0em", // 0px
    sm: "30em", // ~480px. em is a relative unit and is dependant on the font-size.
    md: "48em", // ~768px
    lg: "62em", // ~992px
    xl: "80em", // ~1280px
    "2xl": "96em", // ~1536px
  };

  return (
    <div>
      <Flex align={"center"} height={"100vh"} bgColor={"grey"}>
        <Box w={"70%"} h={"90%"} margin={"auto"} bgColor={"white"}>
          <Tabs h={"100%"}>
            <TabList mb="1em" h={"6%"}>
              <Tab>
                <Text size={"lg"}>Bus Service</Text>
              </Tab>
              <Tab>
                <Text size={"lg"}>Carpark Availability</Text>
              </Tab>
              <Tab>
                <Text size={"lg"}>Live Traffic</Text>
              </Tab>
            </TabList>
            <TabPanels h={"94%"}>
              <TabPanel h={"100%"}>
                <Box h={"10%"}>
                  <Heading fontSize={[20, 28, 40]} color={"#8C1B55"}>
                    NextBus Arrival Timings
                  </Heading>
                  <Text fontSize={[13, 15, 20]} marginTop={"10px"}>
                    Find out the estimated arrival time of your next bus!
                  </Text>
                </Box>
                <Box h={"90%"} marginTop={"20px"}>
                  <Tabs isFitted variant="enclosed" w={"100%"} h={"100%"}>
                    <TabList mb="1em" h={"6%"}>
                      <Tab
                        _selected={{ bgColor: "#8C1B55", color: "white" }}
                        bgColor={"#e3e3e3"}
                      >
                        <Text fontSize={[9, 12, 16]}>Search by Bus Number</Text>
                      </Tab>
                      <Tab
                        _selected={{ bgColor: "#8C1B55", color: "white" }}
                        bgColor={"#e3e3e3"}
                      >
                        <Text fontSize={[9, 12, 16]}>
                          Search by Bus Stop Number
                        </Text>
                      </Tab>
                    </TabList>
                    <TabPanels h={"94%"}>
                      <TabPanel h={"90%"} bgColor={"blue"}>
                        content
                      </TabPanel>
                      <TabPanel h={"90%"}>
                        <p>two!</p>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
              </TabPanel>

              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </div>
  );
}

export default Landing;
