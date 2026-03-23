import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FilterListIcon from "@mui/icons-material/FilterList";
import "@/Styles/PatientTable/DataTable.css";
import { useNavigate } from "react-router-dom";
import { useWizard } from "../patientForm/components/Context/WizardContext";
import { EmptyData } from "@/Components/modules/patients/patientForm/components/utils/EmptyData";

import {
  getPatientsApi,
  deletePatientApi,
} from "../patientForm/components/utils/patientApi";

export default function DataTable() {

  //Used to move to form page
  const navigate = useNavigate();

  // Store selected id for edit
  const { setSelectedIndex } = useWizard();

  // State to store patient list
  const [patients, setPatients] = useState<any[]>([]);


  useEffect(() => {
    loadPatients();
  }, []);

  //Get data from API
  const loadPatients = async () => {
    const res = await getPatientsApi();
    setPatients(res.data);
  };

  //Get all column names
  const allFields = Object.keys(EmptyData);

  //Create object for visibility
  const defaultVisible = allFields.reduce((acc: any, field) => {

    //These columns visible by default
    acc[field] =
      field === "firstName" ||
      field === "lastName" ||
      field === "middleName" ||
      field === "dob" ||
      field === "sex" ||
      field === "ssn";

    return acc;

  }, {});

  //gets the saved columns
  const [visibleColumns, setVisibleColumns] =
    useState<any>(() => {

      const saved =
        localStorage.getItem("visibleColumns");

      return saved
        ? JSON.parse(saved)
        : defaultVisible;

    });

  //Save when changed columns
  useEffect(() => {

    localStorage.setItem(
      "visibleColumns",
      JSON.stringify(visibleColumns)
    );

  }, [visibleColumns]);

  //Open the menu near this HTML element
  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);


  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //Show / hide column
  const handleToggleColumn = (field: string) => {
  setVisibleColumns((prev: any) => {

    const visibleCount =
      Object.values(prev).filter(Boolean).length;

    // block if only 3 visible and trying to hide
    if (prev[field] && visibleCount === 3) {
      return prev;
    }

    return {
      ...prev,
      [field]: !prev[field],
    };

  });
};
  //Show all columns

  const handleCheckAll = () => {
    const allTrue: any = {};

    allFields.forEach((field) => {
      allTrue[field] = true;
    });

    setVisibleColumns(allTrue);
  };

  //clear all the field but the default ones

  const handleClearAll = () => {
    setVisibleColumns(defaultVisible);
  };

  const rows = patients.map((p) => ({

    id: p.id,

    ...p.patient,

    dob: p.patient.dob
      ? new Date(p.patient.dob).toLocaleDateString()
      : "",

  }));

  const handleDelete = async (id: number) => {

    if (confirm("are you sure you want to delete this record")) {

      await deletePatientApi(id);

      loadPatients();
    }
  };

  const handleEdit = (id: number) => {

    setSelectedIndex(id);

    navigate("/form");
  };

  //craetes base columns
  const baseColumns = allFields.map((field) => ({

    field,

    headerName: field,

    width: 180,

  }));

  const columns = [

    ...baseColumns,

    {
      field: "actions",
      headerName: "Actions",
      width: 220,

      renderCell: (params: any) => (

        <>
          {/* edit button */}
          <button
            className="action-btn edit-btn"
            onClick={() => handleEdit(params.row.id)}
          >
            Edit
          </button>

          {/* delete button */}
          <button
            className="action-btn delete-btn"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </button>

        </>

      ),
    },
  ];



  return (

    <div className="table-page">

      <div className="table-card">

        {/* TOP BAR */}

        <div className="table-top-bar">

          <div className="left-side">

            {/* filter icon */}
            <button
              className="filter-btn"
              onClick={handleMenuOpen}
            >
              <FilterListIcon />
              Filter
            </button>

          </div>

          {/* Add patient */}
          <div className="right-side">

            <button
              className="add-btn"
              onClick={() => navigate("/form")}
            >
              Add Patient
            </button>

          </div>

          {/* used to show a popup dropdown menu attached to a button */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >

            <div className="filter-actions">

              <button
                className="filter-action-btn"
                onClick={handleCheckAll}
              >
                Check All
              </button>

              <button
                className="filter-action-btn"
                onClick={handleClearAll}
              >
                Reset
              </button>

            </div>

            {allFields.map((field) => (

              // a row inside an filter
              <MenuItem
                key={field}
                onClick={() => handleToggleColumn(field)}
              >
                {/* <Checkbox
                  checked={visibleColumns[field] ?? false}
                  onClick={(e) => {
                    e.stopPropagation();   // stop MenuItem click
                    handleToggleColumn(field);
                  }}
                /> */}

                <Checkbox
  checked={visibleColumns[field] ?? false}

  disabled={
    visibleColumns[field] === true &&
    Object.values(visibleColumns).filter(Boolean).length === 3
  }

  onClick={(e) => {
    e.stopPropagation();
    handleToggleColumn(field);
  }}
/>

                {field}
              </MenuItem>

            ))}

          </Menu>

        </div>

        <Paper className="table-paper">

          <DataGrid

            rows={rows}

            columns={columns}

            columnVisibilityModel={visibleColumns}

            onColumnVisibilityModelChange={(model) =>
              setVisibleColumns(model)
            }

            pagination

            pageSizeOptions={[10, 20, 50]} // options in dropdown

            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10, // default page size
                  page: 0,
                },
              },
            }}

            sx={{
              height: "100%",
              width: "100%",
            }}

          />

        </Paper>

      </div>

    </div>
  );
}