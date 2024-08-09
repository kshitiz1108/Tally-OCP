import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
  } from "@chakra-ui/react";
import React from 'react'
import { LANGUAGE_VERSIONS } from "../constant";

const LanguageSelector = ({ language, onSelect }) => {
    const languages = Object.entries(LANGUAGE_VERSIONS);
    const activecolor = "white";
  return (
    <Box  ml={2} mb={4}>
         <Text mb={2} fontSize="lg" color={activecolor}>
        Language:
        </Text>
            <Menu>
        <MenuButton as={Button}>javascript</MenuButton>
        <MenuList bg="#110c1b">
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              color={lang === language ? activecolor : "white"}
              bg={lang === language ? "gray.900" : "transparent"}
              _hover={{
                color: activecolor,
                bg: "gray.900",
              }}
              onClick={() => onSelect(lang)}
            >
              {lang}
              &nbsp;
              <Text as="span" color="gray.600" fontSize="sm">
                ({version})
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default LanguageSelector