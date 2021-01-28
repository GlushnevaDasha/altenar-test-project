import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  ListItemText
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Pagination from "./Pagination";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 204,
      width: 204,
      "& .MuiInputBase-input": {
        paddingTop: 6
      }
    }
  })
);

const Dropdown = () => {
  const [page, setPage] = useState(0);
  const [value, setValue] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [maxCount, setMaxCount] = useState(rowsPerPage * (page + 1));
  const [minCount, setMinCount] = useState(rowsPerPage * page);
  const classes = useStyles();
  const dataLength: number = rows.length;
  const setCount = (newPage: number) => {
    setMaxCount(rowsPerPage * (newPage + 1));
    setMinCount(rowsPerPage * newPage);
  };

  useEffect(() => {
    setCount(page);
    setValue(value);
  }, [page, value]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    event.preventDefault();
    const newValue = event.target.value as string[];
    setValue(newValue);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => {
    event.preventDefault();
    setPage(newPage);
    setCount(newPage);
  };

  return (
    <Box className={classes.root}>
      <FormControl size='small' fullWidth>
        <Select
          id='competitors-dropdown'
          multiple
          value={value}
          onChange={handleChange}
          // onClose={handleClose}
          renderValue={selected => (selected as string[]).join(", ")}
        >
          <Pagination
            dataLength={dataLength}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            onChangePage={handleChangePage}
          />
          {rows.map((row, index) => {
            return index < maxCount && index >= minCount ? (
              <MenuItem button value={row.name} key={index}>
                <ListItemText primary={row.name} />
              </MenuItem>
            ) : null;
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;

interface Data {
  name: string;
}

function createData(name: string): Data {
  return { name };
}

export const rows = [
  createData("Liga 0"),
  createData("Liga 1"),
  createData("Liga 2"),
  createData("Liga 3"),
  createData("Liga 4"),
  createData("Liga 5"),
  createData("Liga 6"),
  createData("Liga 7"),
  createData("Liga 8"),
  createData("Liga 9"),
  createData("Liga 10"),
  createData("Liga 11"),
  createData("Liga 12"),
  createData("Liga 13"),
  createData("Liga 14"),
  createData("Liga 15"),
  createData("Liga 16"),
  createData("Liga 17"),
  createData("Liga 18"),
  createData("Liga 19"),
  createData("Liga 20"),
  createData("Liga 21"),
  createData("Liga 22"),
  createData("Liga 23"),
  createData("Liga 24"),
  createData("Liga 25"),
  createData("Liga 26"),
  createData("Liga 27"),
  createData("Liga 28"),
  createData("Liga 29")
];
