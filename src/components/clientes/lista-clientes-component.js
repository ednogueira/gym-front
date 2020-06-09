import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import ApiService from "../../services/api-service";
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withSnackbar } from 'notistack';


class ListaClientesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            clientes: [],
            message: null,
            open: false,
            clienteId: null
        }
        this.deleteCliente = this.deleteCliente.bind(this);
        this.editCliente = this.editCliente.bind(this);
        this.addCliente = this.addCliente.bind(this);
        this.reloadClienteList = this.reloadClienteList.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    handleClickOpen(clienteId) {
        this.setState ({
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


    componentDidMount() {
        this.reloadClienteList();
    }


    reloadClienteList() {
        ApiService.fetchClientes()
            .then((res) => {
                this.setState({ clientes: res.data })
            });
    }


    deleteCliente(clienteId) {
        ApiService.deleteCliente(clienteId)
            .then(response => {
                //this.setState({ message: 'Cliente deletado com sucesso.' });
                this.setState({ clientes: this.state.clientes.filter(cliente => cliente.id !== clienteId),
                                open: false,
                                clienteId: null});
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

    editCliente(id) {
        window.localStorage.setItem("clienteId", id);
        this.props.history.push('/edit-cliente');
    }

    addCliente() {
        window.localStorage.removeItem("clienteId");
        this.props.history.push('/add-cliente');
    }


    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Clientes - Últimas atualizações</Typography>
                <Button variant="contained" color="primary" onClick={() => this.addCliente()}>
                    Adicionar
                </Button>
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

export default withSnackbar(ListaClientesComponent);