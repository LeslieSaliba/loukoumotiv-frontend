import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
];

const AllMissionsDash = () => {
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'status',
        header: `Status`,
        size: 120,
      },
      {
        accessorKey: 'title', //access nested data with dot notation
        header: 'Titre',
        size: 120,
      },
      {
        accessorKey: 'partner',
        header: 'Partenaire',
        size: 120,
      },
      {
        accessorKey: 'time.date', //normal accessorKey
        header: 'Date',
        size: 120,
      },
      {
        accessorKey: 'time.hours', //normal accessorKey
        header: 'Horaires',
        size: 120,
      },
      {
        accessorKey: 'city',
        header: 'Localisation',
        size: 120,
      },
      {
        accessorKey: 'state',
        header: 'Rémunération',
        size: 120,
      },
      {
        accessorKey: 'requiredMembers',
        header: 'Masseurs requis',
        size: 120,
      },
      {
        accessorKey: 'state',
        header: `S'y inscrire`,
        size: 120,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};

export default AllMissionsDash;