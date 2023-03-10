import './datatable.scss';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {
  userColumns,
  userRows,
  productColumns,
  productRows,
} from '../../datatablesource';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from '../../api/axios';
import React from 'react';

// const func = ({params}) => {
//   console.log(params);
// }

const Datatable = ({ inputs }) => {
  const deleteOrder = async (id) => {
    let from = window.location.pathname.split('/')[2];
    if (from == 'products') {
      from = 'cars';
    }
    const res = await axios.delete(`/${from}/${id}`);
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='cellAction'>
            <Link
              to={`/admin/${inputs.from}/${params.id}`}
              style={{ textDecoration: 'none' }}
            >
              {inputs.from != 'products' && (
                <div className='viewButton'>View</div>
              )}
            </Link>

            <div
              className='deleteButton'
              onClick={function () {
                deleteOrder(params.id);
              }}
            >
              Delete
            </div>

            <Link
              to={`/admin/products/${params.id}`}
              style={{ textDecoration: 'none' }}
            >
              {inputs.from === 'products' && (
                <div className='editButton'>Edit</div>
              )}
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className='datatable'>
      <div className='datatableTitle'>
        {inputs.title}

        {inputs.from === 'products' && (
          <Link
            to='/admin/products/new'
            style={{ textDecoration: 'none' }}
            className='link'
          >
            Add new
          </Link>
        )}
      </div>
      <DataGrid
        getRowId={(row) => row._id}
        rows={inputs.dataRows}
        columns={inputs.dataColumn.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
