import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DetailsIcon from '@material-ui/icons/AssignmentInd';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import ApiService from "../../services/api-service";
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { withSnackbar } from 'notistack';


class ListaClientesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            clientes: [],
            message: null,
            open: false,
            clienteId: null,
            openBuscar: false,
            findCliente: '',
        }
        this.viewCliente = this.viewCliente.bind(this);
        this.deleteCliente = this.deleteCliente.bind(this);
        this.editCliente = this.editCliente.bind(this);
        this.addCliente = this.addCliente.bind(this);
        this.reloadClienteList = this.reloadClienteList.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpenBuscar = this.handleClickOpenBuscar.bind(this);
        this.buscarCliente = this.buscarCliente.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleClickOpen(clienteId) {
        this.setState({
            open: true,
            clienteId: clienteId
        })
    }

    handleClose() {
        this.setState({
            open: false,
            clienteId: null
        })
    }

    handleClickOpenBuscar() {
        this.setState({
            openBuscar: true
        })
    }

    handleClickCloseBuscar() {
        this.setState({
            openBuscar: false
        })
    }


    componentDidMount() {
        this.reloadClienteList();
    }


    reloadClienteList() {
        ApiService.fetchClientes()
            .then((res) => {
                this.setState({ clientes: res.data })
            });
    }

    buscarCliente() {
        //to fix
        let flag1=false;
        let flag2=false;
        if (this.state.findCliente !== '') {
            ApiService.fetchClienteById(this.state.findCliente)
                .then((res) => {
                    this.setState({ clienteId: res.data.id });
                    this.viewCliente(this.state.clienteId);
                }).catch(flag1=true);
                
        }
        if (this.state.findCliente !== '') {
            ApiService.fetchClienteByCpf(this.state.findCliente)
                .then((res) => {
                    this.setState({ clienteId: res.data.id });
                    this.viewCliente(this.state.clienteId);
                }).catch(flag2=true);
                return;
        }
        if((flag1 === true && flag2 === true) || (this.state.findCliente === '')) {
            this.props.enqueueSnackbar('Cliente não encontrado.', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            });
        }
            
    }

    handleChange = name => ({ target: { value } }) => {
        this.setState({ [name]: value });
    }



    deleteCliente(clienteId) {
        ApiService.deleteCliente(clienteId)
            .then(response => {
                //this.setState({ message: 'Cliente deletado com sucesso.' });
                this.setState({
                    clientes: this.state.clientes.filter(cliente => cliente.id !== clienteId),
                    open: false,
                    clienteId: null
                });
                this.props.enqueueSnackbar('Cliente deletado com sucesso.', {
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                })
            })
            .catch(() => this.props.enqueueSnackbar('Não foi possível deletar o cliente.', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            }),
                this.handleClose());
    }

    viewCliente(id) {
        window.localStorage.setItem("clienteId", id);
        this.props.history.push('/view-cliente');
    }

    editCliente(id) {
        window.localStorage.setItem("clienteId", id);
        this.props.history.push('/edit-cliente');
    }

    addCliente() {
        window.localStorage.removeItem("clienteId");
        this.props.history.push('/add-cliente');
    }


    render() {
        const { findCliente } = this.state;
        return (
            <div>
                <Typography variant="h4" style={style}>Clientes - Últimas atualizações</Typography>
                <Button variant="contained" color="primary" onClick={() => this.addCliente()}>
                    Adicionar
                </Button>
                <Button variant="contained" color="default" startIcon={<SearchIcon />}
                    style={{ position: "absolute", right: 400 }} onClick={() => this.handleClickOpenBuscar()}>
                    Buscar
                </Button>
                <Dialog open={this.state.openBuscar} onClose={() => this.handleClickCloseBuscar()} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Buscar</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Busque um cliente por sua matrícula ou CPF
                        </DialogContentText>
                        <TextField autoFocus margin="normal" id="findCliente" placeholder="Matricula ou CPF" value={findCliente} fullWidth
                            onChange={this.handleChange('findCliente')}
                            style={{ height }} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                            inputProps={{ style: { height, padding: '0 10px', }, }} />
                        {/* <TextField margin="normal" id="clientePorCpf" label="CPF" fullWidth value={clientePorCpf}
                            onChange={this.handleChange('clientePorCpf')}
                            style={{ height }} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                            inputProps={{ style: { height, padding: '0 10px', }, }} /> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClickCloseBuscar()} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={() => this.buscarCliente()} color="primary">
                            <IconButton><SearchIcon /></IconButton>
                            Buscar
                        </Button>
                    </DialogActions>
                </Dialog>
                <br />
                <Table style={{ width: 1200 }}>
                    <TableHead>
                        <TableRow>

                            <TableCell style={{ width: '20%' }}>Matricula</TableCell>
                            <TableCell style={{ width: '30%' }}>Nome</TableCell>
                            <TableCell style={{ width: '30%' }}>Sobrenome</TableCell>
                            <TableCell style={{ width: '20%' }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.clientes.map(cliente => (
                            <TableRow hover key={cliente.id}>
                                <TableCell component="th" scope="row">
                                    {cliente.id}
                                </TableCell>
                                <TableCell>{cliente.nome}</TableCell>
                                <TableCell>{cliente.sobrenome}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => this.viewCliente(cliente.id)}><DetailsIcon color="primary" /></IconButton>
                                    <IconButton onClick={() => this.editCliente(cliente.id)}><EditIcon color="primary" /></IconButton>
                                    <IconButton onClick={() => this.handleClickOpen(cliente.id)}><DeleteIcon color="secondary" /></IconButton>
                                    <Dialog
                                        open={this.state.open}
                                        onClose={() => this.handleClose()}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Confirmação!"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Deseja realmente deletar este cliente?
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => this.handleClose()} variant="contained" color="default">
                                                Cancelar
                                            </Button>
                                            <Button onClick={() => this.deleteCliente(this.state.clienteId)} variant="contained" color="secondary" autoFocus>
                                                Confirmar
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        );
    }

}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

// height of the TextField
const height = 43

// magic number which must be set appropriately for height
const labelOffset = -6

// get this from your form library, for instance in
// react-final-form it's fieldProps.meta.active
// or provide it yourself - see notes below
const focused = 1

export default withSnackbar(ListaClientesComponent);