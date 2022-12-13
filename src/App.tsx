import { forwardRef } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import MaterialTable from "material-table";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import "./App.css";

import Schemas from "../schemas.json";

interface IDatasource {
  id: string;
  name: string;
  owner: string;
  tables: ITable[];
}

interface ITable {
  name: string;
  columns: string[];
  num_rows: number;
  tables?: ITable[];
}

interface ITableRow {
  id: string;
  name: string;
  owner?: string;
  parentId?: string;
  columns?: string;
}

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function App() {
  const defaultMaterialTheme = createTheme({
    palette: {
      primary: {
        main: "#4caf50",
      },
      secondary: {
        main: "#ff9100",
      },
    },
    mixins: {
      toolbar: {
        backgroundImage: "linear-gradient(to right, #f5f5f5, #e0e0e0)",
      },
    },
    typography: {
      fontSize: 14,
    },
  });

  const processData = (idataSources) => {
    const res: ITableRow[] = [];

    idataSources.forEach((idataSource) => {
      // Append the IDataSource object without the tables property
      res.push({
        id: idataSource.id,
        name: idataSource.name,
        owner: idataSource.owner,
      });

      // Append the tables from the IDataSource object, setting the parentId property
      // Need to do this recursively for tables nested in more than 2 levels
      idataSource.tables.forEach((table: ITable) => {
        res.push({
          ...table,
          id: Math.random().toString(),
          parentId: idataSource.id,
          columns: table.columns.toString(),
        });
      });
    });

    return res;
  };

  // const processData = (idataSources) => {
  //   const res: ITableRow[] = [];

  //   idataSources.forEach((idataSource) => {
  //     // Append the IDataSource object without the tables property
  //     res.push({
  //       id: idataSource.id,
  //       name: idataSource.name,
  //       owner: idataSource.owner,
  //     });

  //     // Recursively process the tables from the IDataSource object, setting the parentId property
  //     const processTables = (tables, parentId) => {
  //       tables.forEach((table) => {
  //         res.push({
  //           ...table,
  //           id: Math.random().toString(),
  //           parentId: parentId,
  //           columns: table.columns.toString(),
  //         });
  //         processTables(table.tables, table.id);
  //       });
  //     };
  //     processTables(idataSource.tables, idataSource.id);
  //   });

  //   return res;
  // };

  return (
    <div className="App">
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          icons={tableIcons}
          title="Datawisp Technical"
          data={processData(Schemas)}
          columns={[
            { title: "Name", field: "name" },
            { title: "Owner", field: "owner" },
            { title: "Columns", field: "columns" },
          ]}
          parentChildData={(row, rows) =>
            rows.find((a) => a.id === row.parentId)
          }
          options={{
            selection: true,
          }}
          onSelectionChange={(rows) => {
            alert("Selected id is:  " + rows[0].id);
          }}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
