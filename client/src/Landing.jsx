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
  Card,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
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
  const [displayData, setDisplayData] = useState([]);

  const handleETA = async () => {
    try {
      const url = "http://127.0.0.1:8000/busETA/";
      const result = await axios.post(url, {
        BusStopCode: busStopNumber.value,
        ServiceNo: busServiceNumber.value,
      });
      const data = result.data.Services;
      // console.log(data);
      setDisplayData(data);
    } catch (error) {
      console.error(error);
    }
  };

  //if busStopNumber is not '', use it to retrieve bus services at that bus stop, and those bus services should replace AllBusServicesNumber
  useEffect(() => {
    if (busStopNumber.value != "") {
      setBusServiceNumber("");
      const getBusServicesFromBusStopNumber = async () => {
        try {
          const url = "http://127.0.0.1:8000/busETA/";
          const result = await axios.post(url, {
            BusStopCode: busStopNumber.value,
          });
          const data = result.data.Services;
          if (Array.isArray(data)) {
            const busServices = data.map((bus) => bus.ServiceNo);
            const formattedBusServices = [
              { value: "", label: "Select Option" },
              ...busServices.map((serviceNo) => ({
                value: serviceNo,
                label: serviceNo,
              })),
            ];
            setBusServicesToDisplay(formattedBusServices);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getBusServicesFromBusStopNumber();
    } else {
      setBusServiceNumber("");
      setBusServicesToDisplay(AllBusServiceNumbers);
    }
  }, [busStopNumber]);

  const calculateETA = (estimatedArrival) => {
    const currentDateTime = new Date();
    const estimatedArrivalDateTime = new Date(estimatedArrival);
    const timeDifferenceMs = estimatedArrivalDateTime - currentDateTime;
    const timeDifferenceMinutes = Math.ceil(timeDifferenceMs / (1000 * 60));
    return timeDifferenceMinutes <= 1 ? 'Arriving' : `${timeDifferenceMinutes} min`;
  };
  
  return (
    <div>
      <Flex align={"center"} height={"100vh"} bgColor={"grey"}>
        <Box
          w={"100%"}
          h={"100%"}
          margin={"auto"}
          bgColor={"white"}
          overflow={"auto"}
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
                              value={busStopNumber}
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
                              value={busServiceNumber}
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

                        <Box w={"100%"} h={"100%"}>
                          <TableContainer>
                            <Table variant="striped" colorScheme="cyan">
                              <TableCaption>
                                Data provided by LTA Singapore
                              </TableCaption>
                              {displayData.length > 0 && (
                                <Thead>
                                  <Tr>
                                    <Th w={"10%"}>Bus Service</Th>
                                    <Th w={"30%"}>ETA</Th>
                                    <Th>Type</Th>
                                  </Tr>
                                </Thead>
                              )}
                              <Tbody>
                                {displayData.map((obj, index) => (
                                  <Tr key={index}>
                                    <Td>{obj.ServiceNo}</Td>
                                    <Td>
                                    {calculateETA(obj.NextBus.EstimatedArrival)}
                                    </Td>
                                    <Td>
                                      {obj.NextBus.Type === "DD"
                                        ? "Double Decker"
                                        : obj.NextBus.Type === "SD"
                                        ? "Single Decker"
                                        : obj.NextBus.Type === "BD"
                                        ? "Bendy"
                                        : ""}
                                    </Td>
                                  </Tr>
                                ))}
                              </Tbody>
                            </Table>
                          </TableContainer>
                        </Box>
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
