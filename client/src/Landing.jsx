import React, { useState, useEffect } from "react";
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
  Input,
  HStack,
  Button,
  Center,
} from "@chakra-ui/react";
import Select from "react-select";
import AllBusServiceNumbers from "./data/AllBusServiceNumbers";
import AllBusStopCodes from "./data/AllBusStopCodes";
import axios from "axios";

function Landing() {
  const [busStopNumber, setBusStopNumber] = useState("");
  const [busServiceNumber, setBusServiceNumber] = useState("");
  const [busServicesToDisplay, setBusServicesToDisplay] =
    useState(AllBusServiceNumbers);

  const handleETA = async () => {
    try {
      const url = "http://127.0.0.1:8000/busETA/";
      const result = await axios.post(url, {
        BusStopCode: busStopNumber.value,
        ServiceNo: busServiceNumber.value,
      });
      const data = result.data.Services;
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  //if busStopNumber is not '', use it to retrieve bus services at that bus stop, and those bus services should replace AllBusServicesNumber
  useEffect(() => {
    const getBusServicesFromBusStopNumber = async () => {
      try {
        const url = "http://127.0.0.1:8000/getBusServices/";
        const result = await axios.post(url, {
          BusStopCode: busStopNumber.value,
        });
        const data = result.data.Services;
        const busServices = [];
        for (let bus of data) {
          busServices.push(bus.ServiceNo);
        }
        console.log(busServices);
        const formattedBusServices = [
          { value: "", label: "Select Option" },
          ...busServices.map((serviceNo) => ({
            value: serviceNo,
            label: serviceNo,
          })),
        ];

        console.log(formattedBusServices);
        setBusServicesToDisplay(formattedBusServices);
      } catch (error) {
        console.log(error);
      }
    };
    getBusServicesFromBusStopNumber();
  }, [busStopNumber]);

  return (
    <div>
      <Flex align={"center"} height={"100vh"} bgColor={"grey"}>
        <Box
          w={"100%"}
          h={"100%"}
          margin={"auto"}
          bgColor={"white"}
          overflow={"hidden"}
        >
          <Tabs h={"100%"}>
            <TabList mb="1em" h={"6%"}>
              <Tab>
                <Text fontSize={[12, 15, 20]}>Bus Service</Text>
              </Tab>
              <Tab>
                <Text fontSize={[12, 15, 20]}>Carpark Availability</Text>
              </Tab>
              <Tab>
                <Text fontSize={[12, 15, 20]}>Live Traffic</Text>
              </Tab>
            </TabList>
            <TabPanels h={"94%"}>
              <TabPanel h={"100%"}>
                <Box h={"10%"} textAlign={"center"}>
                  <Heading fontSize={[20, 28, 40]} color={"#8C1B55"}>
                    NextBus Arrival Timings
                  </Heading>
                  <Text fontSize={[13, 15, 20]} marginTop={"10px"}>
                    Find out the estimated arrival time of your next bus!
                  </Text>
                </Box>
                <Box h={"90%"} marginTop={"20px"}>
                  <Tabs
                    isFitted
                    variant="enclosed"
                    w={"60%"}
                    h={"100%"}
                    margin={"auto"}
                    minW={"350px"}
                  >
                    <TabList mb="1em" h={"6%"}>
                      <Tab
                        _selected={{ bgColor: "#8C1B55", color: "white" }}
                        bgColor={"#e3e3e3"}
                      >
                        <Text fontSize={[9, 12, 16]}>Search</Text>
                      </Tab>
                      <Tab
                        _selected={{ bgColor: "#8C1B55", color: "white" }}
                        bgColor={"#e3e3e3"}
                      >
                        <Text fontSize={[9, 12, 16]}>View Map</Text>
                      </Tab>
                    </TabList>
                    <TabPanels h={"94%"}>
                      <TabPanel h={"90%"} borderRadius={"10px"} w={"100%"}>
                        <HStack
                          align={"start"}
                          spacing={20}
                          marginTop={"20px"}
                          marginBottom={"30px"}
                        >
                          <Box w={"50%"} margin={"auto"}>
                            <Text
                              fontSize={[9, 16, 20]}
                              fontWeight={"bold"}
                              marginBottom={"10px"}
                              style={{ whiteSpace: "nowrap" }}
                            >
                              Bus Stop No.
                            </Text>

                            <Select
                              onChange={setBusStopNumber}
                              options={AllBusStopCodes}
                              placeholder={"Select"}
                            />
                          </Box>
                          <Box w={"50%"} margin={"auto"}>
                            <Flex flexDir={"row"}>
                              <Text
                                fontSize={[9, 16, 20]}
                                fontWeight={"bold"}
                                marginBottom={"10px"}
                                style={{ whiteSpace: "nowrap" }}
                              >
                                Bus Service No.
                              </Text>
                              <Text fontSize={[7, 9, 11]}>*optional</Text>
                            </Flex>

                            <Select
                              onChange={setBusServiceNumber}
                              options={busServicesToDisplay}
                              placeholder={"Select"}
                            />
                          </Box>
                        </HStack>
                        <Center>
                          <Button
                            w={"50%"}
                            bgColor={"#ec6c1c"}
                            color={"white"}
                            onClick={handleETA}
                          >
                            <Text fontSize={[10, 12, 18]}>
                              ESTIMATE ARRIVAL TIME
                            </Text>
                          </Button>
                        </Center>
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
