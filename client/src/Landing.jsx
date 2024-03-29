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
  HStack,
  Button,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Show,
  Input,
} from "@chakra-ui/react";
import Select from "react-select";
import AllBusServiceNumbers from "./data/AllBusServiceNumbers";
import AllBusStopCodes from "./data/AllBusStopCodes";
import AllAreas from "./data/AllAreas";
import AllCarParks from "./data/AllCarParks";
import axios from "axios";

function Landing() {
  const [area, setArea] = useState("");
  const [carParkSearch, setCarParkSearch] = useState("");
  const [busStopNumber, setBusStopNumber] = useState("");
  const [busServiceNumber, setBusServiceNumber] = useState("");
  const [busServicesToDisplay, setBusServicesToDisplay] =
    useState(AllBusServiceNumbers);
  const [displayData, setDisplayData] = useState([]);
  const [displayCarparkData, setDisplayCarparkData] = useState([]);

  //every time there is change in area or search, call api to update displaycarparkdata
  useEffect(() => {
    const updateCarParks = async () => {
      try {
        const url = "http://127.0.0.1:8000/carpark/";
        const areaSelected = area.value;
        const search = carParkSearch;
        if (areaSelected || search || areaSelected == "") {
          const result = await axios.post(url, {
            area: areaSelected,
            search: search,
          });
          setDisplayCarparkData(result.data);
          console.log(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    updateCarParks();
  }, [area, carParkSearch]);

  const handleETA = async () => {
    try {
      const url = "http://127.0.0.1:8000/busETA/";
      const busStopCode = busStopNumber.value;
      const serviceNo = busServiceNumber.value;
      if (busStopCode != "") {
        const result = await axios.post(url, {
          BusStopCode: busStopCode,
          ServiceNo: serviceNo,
        });
        const data = result.data.Services;
        // console.log(data);
        setDisplayData(data);
      } else {
        //busStopCode is empty, user chose 'select option'
        setDisplayData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleETA();
  }, [busStopNumber, busServiceNumber]);

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
    if (isNaN(timeDifferenceMinutes)) {
      return "No Data";
    }
    return timeDifferenceMinutes <= 1
      ? "Arriving"
      : `${timeDifferenceMinutes} min`;
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
              <Tab isDisabled>
                <Text fontSize={[12, 15, 20]}>Live Traffic</Text>
              </Tab>
            </TabList>
            <TabPanels h={"94%"}>
              <TabPanel h={"100%"}>
                <Box h={"10%"} textAlign={"center"}>
                  <Heading fontSize={[20, 28, 40]} color={"#8C1B55"}>
                    NextBus Arrival Timings
                  </Heading>
                  <Text fontSize={[12, 13, 18]} marginTop={"10px"}>
                    Find out the estimated arrival time of your next bus
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
                        <Text fontSize={["15px", "18px", "20px"]}>Search</Text>
                      </Tab>
                      <Tab
                        _selected={{ bgColor: "#8C1B55", color: "white" }}
                        bgColor={"#e3e3e3"}
                      >
                        <Text fontSize={["15px", "18px", "20px"]}>
                          View Map
                        </Text>
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
                        {/* <Center>
                          <Button
                            w={"50%"}
                            maxW={"150px"}
                            bgColor={"#4e76e6"}
                            color={"white"}
                            onClick={handleETA}
                            _hover={{ bgColor: "#294db3", color: "white" }}
                          >
                            <Text fontSize={[10, 12, 18]}>Estimate</Text>
                          </Button>
                        </Center> */}

                        <Box w={"100%"} h={"100%"} marginTop={"20px"}>
                          <TableContainer>
                            <Show above="1300px">
                              <Table variant="striped" colorScheme="cyan">
                                <TableCaption>
                                  Data provided by LTA Singapore
                                </TableCaption>
                                {displayData && displayData.length > 0 && (
                                  <Thead>
                                    <Tr>
                                      <Th textAlign={"center"}>Bus Service</Th>
                                      <Th textAlign={"center"}>ETA</Th>
                                      <Th textAlign={"center"}>Crowd Level</Th>
                                      <Th textAlign={"center"}>Type</Th>
                                      <Th textAlign={"center"}>
                                        Subsequent Bus ETA
                                      </Th>
                                    </Tr>
                                  </Thead>
                                )}
                                <Tbody>
                                  {displayData &&
                                    displayData.map((obj, index) => (
                                      <Tr key={index}>
                                        <Td textAlign={"center"}>
                                          <Heading>{obj.ServiceNo}</Heading>
                                        </Td>
                                        <Td textAlign={"center"}>
                                          {calculateETA(
                                            obj.NextBus.EstimatedArrival
                                          )}
                                        </Td>

                                        <Td
                                          style={{
                                            color:
                                              obj.NextBus.Load === "SEA"
                                                ? "#05803a"
                                                : obj.NextBus.Load === "SDA"
                                                ? "orange"
                                                : obj.NextBus.Load === "LSD"
                                                ? "red"
                                                : "",
                                          }}
                                          textAlign={"center"}
                                        >
                                          {obj.NextBus.Load === "SEA"
                                            ? "Seats Available"
                                            : obj.NextBus.Load === "SDA"
                                            ? "Standing Available"
                                            : obj.NextBus.Load === "LSD"
                                            ? "Limited Standing"
                                            : ""}
                                        </Td>
                                        <Td textAlign={"center"}>
                                          {obj.NextBus.Type === "DD"
                                            ? "Double Decker"
                                            : obj.NextBus.Type === "SD"
                                            ? "Single Decker"
                                            : obj.NextBus.Type === "BD"
                                            ? "Bendy"
                                            : ""}
                                        </Td>
                                        <Td textAlign={"center"}>
                                          {calculateETA(
                                            obj.NextBus2.EstimatedArrival
                                          )}
                                        </Td>
                                      </Tr>
                                    ))}
                                </Tbody>
                              </Table>
                            </Show>
                            <Show below="1300px">
                              {displayData &&
                                displayData.map((obj, index) => (
                                  <Table key={index}>
                                    <Tr>
                                      <Th textAlign={"left"}>Bus Service</Th>
                                      <Td textAlign={"left"}>
                                        <Heading>{obj.ServiceNo}</Heading>
                                      </Td>
                                    </Tr>
                                    <Tr>
                                      <Th textAlign={"left"}>ETA</Th>
                                      <Td textAlign={"left"}>
                                        {calculateETA(
                                          obj.NextBus.EstimatedArrival
                                        )}
                                      </Td>
                                    </Tr>
                                    <Tr>
                                      <Th textAlign={"left"}>Crowd Level</Th>
                                      <Td
                                        style={{
                                          color:
                                            obj.NextBus.Load === "SEA"
                                              ? "#05803a"
                                              : obj.NextBus.Load === "SDA"
                                              ? "orange"
                                              : obj.NextBus.Load === "LSD"
                                              ? "red"
                                              : "",
                                        }}
                                        textAlign={"left"}
                                      >
                                        {obj.NextBus.Load === "SEA"
                                          ? "Seats Available"
                                          : obj.NextBus.Load === "SDA"
                                          ? "Standing Available"
                                          : obj.NextBus.Load === "LSD"
                                          ? "Limited Standing"
                                          : ""}
                                      </Td>
                                    </Tr>
                                    <Tr>
                                      <Th textAlign={"left"}>Type</Th>
                                      <Td textAlign={"left"}>
                                        {obj.NextBus.Type === "DD"
                                          ? "Double Decker"
                                          : obj.NextBus.Type === "SD"
                                          ? "Single Decker"
                                          : obj.NextBus.Type === "BD"
                                          ? "Bendy"
                                          : ""}
                                      </Td>
                                    </Tr>
                                    <Tr>
                                      <Th textAlign={"left"}>Sub Bus ETA</Th>
                                      <Td textAlign={"left"}>
                                        {calculateETA(
                                          obj.NextBus2.EstimatedArrival
                                        )}
                                      </Td>
                                    </Tr>
                                    <Tr>
                                      <Td></Td>
                                    </Tr>
                                  </Table>
                                ))}
                            </Show>
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

              <TabPanel h={"100%"}>
                <Box h={"10%"} textAlign={"center"}>
                  <Heading fontSize={[20, 28, 40]} color={"#8C1B55"}>
                    Carpark Availability
                  </Heading>
                  <Text fontSize={[12, 13, 18]} marginTop={"10px"}>
                    Check for available lots at various carparks
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
                        <Text fontSize={["15px", "18px", "20px"]}>Search</Text>
                      </Tab>
                      <Tab
                        _selected={{ bgColor: "#8C1B55", color: "white" }}
                        bgColor={"#e3e3e3"}
                      >
                        <Text fontSize={["15px", "18px", "20px"]}>
                          View Map
                        </Text>
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
                              Area
                            </Text>

                            <Select
                              value={area}
                              onChange={setArea}
                              options={AllAreas}
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
                                Search
                              </Text>
                            </Flex>

                            <Input
                              value={carParkSearch}
                              onChange={(e) => {
                                setCarParkSearch(e.target.value);
                              }}
                              placeholder={"Select"}
                            />
                          </Box>
                        </HStack>

                        <Box w={"100%"} h={"100%"} marginTop={"20px"}>
                          <TableContainer>
                            <Show above="1300px">
                              <Table variant="striped" colorScheme="cyan">
                                <TableCaption>
                                  Data provided by LTA Singapore
                                </TableCaption>
                                {displayCarparkData &&
                                  displayCarparkData.length > 0 && (
                                    <Thead>
                                      <Tr>
                                        <Th textAlign={"center"}>Car park</Th>
                                        <Th textAlign={"center"}>
                                          Available lots
                                        </Th>
                                      </Tr>
                                    </Thead>
                                  )}

                                <Tbody>
                                  {displayCarparkData &&
                                    displayCarparkData.length > 0 &&
                                    displayCarparkData.map((obj, index) => (
                                      <Tr key={index}>
                                        <Td textAlign={"center"}>
                                          <Text>{obj.Development}</Text>
                                        </Td>
                                        <Td textAlign={"center"}>
                                          <Text>
                                            {obj.AvailableLots < 0
                                              ? 0
                                              : obj.AvailableLots}
                                          </Text>
                                        </Td>
                                      </Tr>
                                    ))}
                                </Tbody>
                              </Table>
                            </Show>
                            <Show below="1300px">
                              {displayCarparkData &&
                                displayCarparkData.map((obj, index) => (
                                  <Table key={index}>
                                    <Tr>
                                      <Tr>
                                        <Td textAlign={"left"}>
                                          {obj.Development}
                                        </Td>
                                      </Tr>
                                      <Tr>
                                        <Td textAlign={"left"}>
                                          {obj.AvailableLots}
                                        </Td>
                                      </Tr>
                                      <Tr>
                                        <Td></Td>
                                      </Tr>
                                    </Tr>
                                  </Table>
                                ))}
                            </Show>
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
              <Box h={"10%"} textAlign={"center"}>
                  <Heading fontSize={[20, 28, 40]} color={"#8C1B55"}>
                    Live Traffic Images
                  </Heading>
                  <Text fontSize={[12, 13, 18]} marginTop={"10px"}>
                    View live traffic images at various locations in Singapore
                  </Text>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </div>
  );
}

export default Landing;
