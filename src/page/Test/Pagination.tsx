import React, { useState } from "react";
import {
  TablePagination,
  Theme,
  useTheme,
  IconButton
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
      maxWidth: 204,
      "& .MuiInputBase-input": {
        paddingTop: 6
      }
    },
    input: {
      width: 48,
      height: 26,
      border: "1px solid #E0E0E0",
      borderRadius: 4
    },
    paginContainer: {
      display: "flex",
      padding: 5,
      backgroundColor: "#F5F5F5",
      borderBottom: "1px solid #E0E0E0",
      justifyContent: "center"
    },
    pagination: {
      "& .MuiIconButton-root": {
        padding: 0
      },
      "& .MuiTablePagination-toolbar": {
        minHeight: 32
      }
    }
  })
);

interface PaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function PaginationActions(props: PaginationActionsProps) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page + 1);
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
    </div>
  );
}

interface PaginationProps {
  dataLength: number;
  page: number;
  setPage: (newPage: number) => void;
  setCount: (newPage: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const {
    dataLength,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    setCount
  } = props;
  const classes = useStyles();
  const [pageStr, setPageStr] = useState("");

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const keyPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.which !== 13) {
      return;
    }
    const newPage: number = parseInt(pageStr, 10) - 1;
    const consPage: number =
      newPage < Math.floor(dataLength / rowsPerPage) && newPage >= 0
        ? newPage
        : newPage <= 0
        ? page
        : Math.floor(dataLength / rowsPerPage);
    setPage(consPage);
    setCount(consPage);
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageStr(event.target.value);
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
    setCount(newPage);
  };

  return (
    <div className={classes.paginContainer}>
      <input
        className={classes.input}
        value={pageStr}
        onKeyPress={keyPressEnter}
        onChange={inputChange}
      />
      <TablePagination
        className={classes.pagination}
        component='div'
        SelectProps={{
          inputProps: { "aria-label": "rows per page" }
        }}
        rowsPerPageOptions={[20]}
        count={dataLength}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(event, newPage) => handleChangePage(event, newPage)}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={PaginationActions}
      />
    </div>
  );
};

export default Pagination;
