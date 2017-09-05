import React from 'react'
import PropTypes from 'prop-types'

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import EditIcon from 'material-ui-icons/Edit'
import DeleteIcon from 'material-ui-icons/Delete'

const ContactsTable = ({ contacts }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Prefix</TableCell>
        <TableCell>First Name</TableCell>
        <TableCell>Last Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Edit</TableCell>
        <TableCell>Delete</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {contacts.map(c => {
      return (
        <TableRow
            hover
            key={c._id}
        >
          <TableCell>{c.name.prefix}</TableCell>
          <TableCell>{c.name.first}</TableCell>
          <TableCell>{c.name.last}</TableCell>
          <TableCell><a href={`mailto:${c.email}`}>{c.email}</a></TableCell>
          <TableCell>
            <IconButton
                aria-label="Edit"
                color="accent"
            >
              <EditIcon />
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton
                aria-label="Edit"
                color="accent"
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      )
    })}
    </TableBody>
  </Table>
)

ContactsTable.propTypes = {
  contacts: PropTypes.array.isRequired,
}

export default ContactsTable