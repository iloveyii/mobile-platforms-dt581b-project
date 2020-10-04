<TableContainer component={Paper}>
  <Table className={classes.table} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell align="right">Email</TableCell>
        <TableCell align="right">Address</TableCell>
        <TableCell align="right">X</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      { users.map((row, i) =>
        <TableRow
          style={{ cursor: "pointer" }}
          key={i}
          onClick={(e) => {
            e.preventDefault();
            props.editAction(row);
            this.setState({openPopup:true});
          }}
        >
          <TableCell onClick={()=>{ props.editAction(row); this.setState({openPopup:true}) } component="th" scope="row">{row.name}</TableCell>
          <TableCell onClick={()=>{ props.editAction(row); this.setState({openPopup:true}) } align="right">{row.email}</TableCell>
          <TableCell onClick={()=>{ props.editAction(row); this.setState({openPopup:true}) } align="right">{row.address}</TableCell>
          <TableCell align="right">
            <Button
              style={{ float: "right", padding: 3 }}
              margin="normal"
              size="small"
              variant="contained"
              color="primary"
              onClick={(e) => { deleted(row); this.setState({openConfirmDialog:true}); } }
            >
              <CancelPresentationOutlinedIcon />
            </Button>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
  <ConfirmDialog onDelete={deleted} showDialog={showDialog} setShowDialog={setShowDialog} action={()=>console.log('delete')} />
  <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
    <Form />
  </Popup>
</TableContainer>
