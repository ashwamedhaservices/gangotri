import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { fullName, toTitleCase } from '../../utils/text-typecase';
import { isValidImage } from '../../utils/upload-media';
import { Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { createSearchParams, useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Row({ row }) {
  const navigate = useNavigate();
  const { user, kyc, bank_accounts, nominees, addresses } = row;
  const [open, setOpen] = React.useState(false);

  
  const [openModal, setOpenModal] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState('');
  const [currentImageType, setCurrentImageType] = React.useState('');
  const handleOpen = (url, type) => {
    setOpenModal(true);
    setCurrentImage(url);
    setCurrentImageType(toTitleCase(type));
  }
  const handleClose = () => {
    setOpenModal(false);
    setCurrentImage('');
    setCurrentImageType('');
  }
  const handleNavigate = (pathname, params) => {
    navigate({
      pathname,
      search: `?${createSearchParams(params)}`,
    }, { replace: true });
  }

  const handleEdit = (imageType) => {
    console.log('edit', imageType.toLowerCase());
    if(imageType.toLowerCase() === 'pan') {
      handleNavigate('/pan-upload', { id: kyc.id });
    } else {
      handleNavigate('/address-proof-upload', { id: kyc.id });
    }
  }

  return (
    <React.Fragment>
      <ImageModal openModal={openModal} handleClose={handleClose} currentImage={currentImage} currentImageType={currentImageType} handleEdit={handleEdit}/>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {fullName(user.fname, user.mname, user.lname)}
        </TableCell>
        <TableCell align="right">{user.mobile_number}</TableCell>
        <TableCell align="right">{user.email ? user.email : 'NA'}</TableCell>
        <TableCell align="right">{user.referral_code}</TableCell>
        <TableCell align="right">{toTitleCase(user.state)}</TableCell>
        <TableCell align="right">{user.subscribed ? 'Yes' : 'No'}</TableCell>
      </TableRow>
      <TableRow sx={{background: 'rgba(145, 158, 171, 0.16)'}}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>

            <Box sx={{ margin: 1, marginTop: 2, marginBottom: 2 }}>
              <KycTable kyc={kyc} handleNavigate={handleNavigate} handleOpen={handleOpen}/>
            </Box>

            <Box sx={{ margin: 1, marginTop: 2, marginBottom: 2 }}>
              <BankAccountTable bankAccounts={bank_accounts} handleNavigate={handleNavigate}/>
            </Box>

            <Box sx={{ margin: 1, marginTop: 2, marginBottom: 2 }}>
              <NomineesTable nominees={nominees} handleNavigate={handleNavigate}/>
            </Box>

            <Box sx={{ margin: 1, marginTop: 2, marginBottom: 2 }}>
              <AddressTable addresses={addresses} handleNavigate={handleNavigate} />
            </Box>

          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

const ImageModal = ({ openModal, handleClose, currentImage, currentImageType, handleEdit }) => {
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {currentImageType} image
        </Typography>
        <div>
          <img
            src={currentImage}
            alt={currentImageType}
            loading="lazy"
          />
        </div>
        <EditIcon onClick={() => handleEdit(currentImageType)}/>
      </Box>
    </Modal>
  );
}

const KycTable = ({ kyc, handleNavigate, handleOpen }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Kycs
      </Typography>
      <Table aria-label="kyc table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Id proof no</TableCell>
            <TableCell align="right">Id proof type</TableCell>
            <TableCell align="right">Id proof image</TableCell>
            <TableCell align="right">Address proof no</TableCell>
            <TableCell align="right">Address proof type</TableCell>
            <TableCell align="right">Address proof image</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={kyc.id}>
            <TableCell align="right">{fullName(kyc.name)}</TableCell>
            <TableCell align="right">{kyc.id_proof_no}</TableCell>
            <TableCell align="right">{kyc.id_proof_type?.toUpperCase()}</TableCell>
            <TableCell align="right">
              { isValidImage(kyc.id_proof_url) ?
              <img src={kyc.id_proof_url} 
                height="30px" 
                width="30px" 
                alt={kyc.id_proof_type}
                onClick={() => handleOpen(kyc.id_proof_url, kyc.id_proof_type)}
              />
              : 'Not uploaded'}
            </TableCell>
            <TableCell align="right">{kyc.address_proof_no}</TableCell>
            <TableCell align="right">{kyc.address_proof_type?.toUpperCase()}</TableCell>
            <TableCell align="right">{ 
            isValidImage(kyc.address_proof_url) ?
              <img src={kyc.address_proof_url} 
                height="30px" 
                width="30px" 
                alt={kyc.address_proof_type}
                onClick={() => handleOpen(kyc.address_proof_url, kyc.address_proof_type)}
              />
              : 'Not uploaded'}</TableCell>
            <TableCell align="right">
              <EditIcon onClick={() => handleNavigate('/pan', { id: kyc.id })}/>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

const BankAccountTable = ({bankAccounts, handleNavigate}) => {
  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Bank accounts
      </Typography>
      <Table aria-label="bank table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Account number</TableCell>
            <TableCell align="right">Account type</TableCell>
            <TableCell align="right">IFSC Code</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bankAccounts && bankAccounts.map((bank) => (
            <TableRow key={bank.id}>
              <TableCell align="right">{bank.account_number}</TableCell>
              <TableCell align="right">{bank.account_type}</TableCell>
              <TableCell align="right">{bank.ifsc}</TableCell>
              <TableCell align="right">
                <EditIcon onClick={() => handleNavigate('/bank', { id: bank.id })}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

const NomineesTable = ({ nominees, handleNavigate }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Nominees
      </Typography>
      <Table aria-label="nominee table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Relationship</TableCell>
            <TableCell align="right">Dob</TableCell>
            <TableCell align="right">Relationship with gurdian</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nominees && nominees.map((nominee) => (
            <TableRow key={nominee.id}>
              <TableCell align="right">{fullName(nominee.name)}</TableCell>
              <TableCell align="right">{toTitleCase(nominee.relationship)}</TableCell>
              <TableCell align="right">{nominee.dob ? nominee.dob : 'NA'}</TableCell>
              <TableCell align="right">{nominee.relationship_with_gurdian ? toTitleCase(nominee.relationship_with_gurdian) : 'NA'}</TableCell>
              <TableCell align="right">
                <EditIcon onClick={() => handleNavigate('/nominee', { id: nominee.id })}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

const AddressTable = ({ addresses, handleNavigate }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Address
      </Typography>
      <Table aria-label="address table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Address name</TableCell>
            <TableCell align="right">Address line one</TableCell>
            <TableCell align="right">Address line two</TableCell>
            <TableCell align="right">Address line three</TableCell>
            <TableCell align="right">Address type</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Postal Code</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addresses && addresses.map((address) => (
            <TableRow key={address.id}>
              <TableCell align="right">{fullName(address.name)}</TableCell>
              <TableCell align="right">{address.address_line_one}</TableCell>
              <TableCell align="right">{address.address_line_two}</TableCell>
              <TableCell align="right">{address.address_line_three}</TableCell>
              <TableCell align="right">{toTitleCase(address.address_type)}</TableCell>
              <TableCell align="right">{toTitleCase(address.city)}</TableCell>
              <TableCell align="right">{toTitleCase(address.state)}</TableCell>
              <TableCell align="right">{toTitleCase(address.country)}</TableCell>
              <TableCell align="right">{address.postal_code ? address.postal_code : 'NA'}</TableCell>
              <TableCell align="right">
                <EditIcon onClick={() => handleNavigate('/address', { id: address.id })}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}


export default function CollapsibleKycedTable({ kycs }) {
  console.log('CollapsibleKycedTable', kycs)
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Fullname</TableCell>
            <TableCell align="right">Mobile</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Referral Code</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Subscribed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {kycs.map((kyc) => (
            <Row key={kyc.user.id} row={kyc} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}