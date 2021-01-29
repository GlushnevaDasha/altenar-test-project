import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuItem,
  Input,
  FormControl,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import Pagination from "./Pagination";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    sizeSmall: { padding: 0 },
    list: { padding: 0 }
  })
);

const Dropdown = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [count, setCount] = useState({
    max: rowsPerPage * (page + 1),
    min: rowsPerPage * page
  });
  const values = rows;
  const dataLength: number = values.length;

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  function editCount(newPage: number) {
    setCount({ max: rowsPerPage * (newPage + 1), min: rowsPerPage * newPage });
  }

  return (
    <div>
      <FormControl style={{ width: 250 }}>
        <Input
          id='standard-adornment-password'
          value={value}
          onChange={event => {
            setValueStr(event.target.value);
          }}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                className={classes.sizeSmall}
                size='small'
                onClick={() => {
                  setOpen(!open);
                }}
                onMouseDown={handleMouseDownPassword}
              >
                {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
        <Menu
          open={open}
          className={classes.list}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Pagination
            dataLength={dataLength}
            page={page}
            setPage={setPage}
            setCount={editCount}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
          {rows.map((row, index) => {
            return index < count.max && index >= count.min ? (
              <MenuItem
                button
                value={row.name}
                key={row.id}
                onClick={() => {
                  setValue(row.name);
                }}
              >
                {row.name}
              </MenuItem>
            ) : null;
          })}
        </Menu>
      </FormControl>
    </div>
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
