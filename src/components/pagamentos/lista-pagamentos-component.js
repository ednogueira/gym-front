import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import ApiService from "../../services/api-service";
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { withSnackbar } from 'notistack';
import DadosTabs from "../dados-tab-component";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

class ListaPagamentosComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pagamentos: [],
            message: null,
            open: false,
            pagamentoId: null,
            openBuscar: false,
            findPagamento: '',
            startDate: '',
            endDate: '',
            id: '',
            nome: '',
            sobrenome: '',
            cpf: '',
            rg: '',
            cep: '',
            rua: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            uf: '',
            telefone: '',
            tipoPlano: '',
            validadePlano: ''
        }
        this.deletePagamento = this.deletePagamento.bind(this);
        this.editPagamento = this.editPagamento.bind(this);
        this.addPagamento = this.addPagamento.bind(this);
        this.reloadPagamentoList = this.reloadPagamentoList.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpenBuscar = this.handleClickOpenBuscar.bind(this);
        this.handleClickCloseBuscar = this.handleClickCloseBuscar.bind(this);
        this.buscarPagamento = this.buscarPagamento.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkStatusPagamento = this.checkStatusPagamento.bind(this);
    }

    componentDidMount() {
        this.reloadPagamentoList();
        this.checkStatusPagamento();
    }


    handleStartDateChange = (date) => {
        this.setState({ startDate: date });
    };

    handleEndDateChange = (date) => {
        this.setState({ endDate: date });
    };

    handleClickOpen(pagamentoId) {
        this.setState({
            open: true,
            pagamentoId: pagamentoId
        })
    }

    handleClose() {
        this.setState({
            open: false,
            pagamentoId: null
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

    reloadPagamentoList() {
        ApiService.fetchPagamentos(window.localStorage.getItem("clienteId"))
            .then((res) => {
                this.setState({ pagamentos: res.data })
            });
    }

    checkStatusPagamento() {
        ApiService.fetchClienteById(window.localStorage.getItem("clienteId"))
            .then((res) => {
                let cliente = res.data;
                this.setState({
                id: cliente.id,
                nome: cliente.nome,
                sobrenome: cliente.sobrenome,
                cpf: cliente.cpf,
                rg: cliente.rg,
                cep: cliente.endereco.cep,
                rua: cliente.endereco.rua,
                numero: cliente.endereco.numero,
                complemento: cliente.endereco.complemento,
                bairro: cliente.endereco.bairro,
                cidade: cliente.endereco.cidade,
                uf: cliente.endereco.uf,
                telefone: cliente.telefone,
                tipoPlano: cliente.tipoPlano,
                validadePlano: cliente.validadePlano
                })
            });
    }

    buscarPagamento() {
        console.log(this.state.startDate);
        console.log(this.state.endDate);

        ApiService.fetchPagamentoByDate(this.state.endDate, this.state.startDate, window.localStorage.getItem("clienteId"))
            .then((res) => {
                this.setState({ pagamentos: res.data })
            })
            .catch(() => {
                this.props.enqueueSnackbar('Nenhum pagamento foi encontrado.', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                });
            });

        this.handleClickCloseBuscar();
    }

    handleChange = name => ({ target: { value } }) => {
        this.setState({ [name]: value });
    }



    deletePagamento(pagamentoId) {
        ApiService.deletePagamento(pagamentoId)
            .then(response => {
                //this.setState({ message: 'Pagamento deletado com sucesso.' });
                this.setState({
                    pagamentos: this.state.pagamentos.filter(pagamento => pagamento.id !== pagamentoId),
                    open: false,
                    pagamentoId: null
                });
                this.props.enqueueSnackbar('Pagamento deletado com sucesso.', {
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                })
            })
            .catch(() => this.props.enqueueSnackbar('Não foi possível deletar o pagamento.', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            }),
                this.handleClose());
    }

    editPagamento(id) {
        window.localStorage.setItem("pagamentoId", id);
        this.props.history.push('/edit-pagamento');
    }

    addPagamento() {
        window.localStorage.removeItem("pagamentoId");
        this.props.history.push('/add-pagamento');
    }


    render() {
        const { startDate, endDate } = this.state;
        const validadePlano = this.state.validadePlano;

        let alert;
        let today = new Date().toISOString().slice(0,10);
        console.log("Data de hj: " + today + " / Data validade: " + validadePlano);
        if (validadePlano >= today) {
            alert = <Alert variant="filled" severity="success">Cliente - Adimplente!</Alert>
        } else {
            alert = <Alert variant="filled" severity="error">Atenção! - Cliente inadimplente!</Alert>
        }

        return (
            <div>
                <div style={{ margin: "auto", width: "60%", padding: "10px" }}>
                    <DadosTabs tabs-initialSelectedIndex={"1"} />
                </div>
                <br />
                <Button variant="contained" color="primary" onClick={() => this.addPagamento()}>
                    Adicionar
                </Button>
                <Button variant="contained" color="default" startIcon={<SearchIcon />}
                    style={{ position: "absolute", right: 400 }} onClick={() => this.handleClickOpenBuscar()}>
                    Buscar
                </Button>
                <br /><br /><br />
                <div>
                    {alert}
                </div>
                <Dialog open={this.state.openBuscar} onClose={() => this.handleClickCloseBuscar()} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Buscar</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Busque um pagamento dentro de um período:
                        </DialogContentText>
                        <TextField type="date" autoFocus margin="normal" id="startDate" label="Data de início" value={startDate} fullWidth
                            onChange={this.handleChange('startDate')}
                            style={{ height }} InputLabelProps={{ shrink: true, style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                            inputProps={{ style: { height, padding: '0 10px', }, }} />
                        <TextField type="date" margin="normal" id="endDate" label="Data de término" value={endDate} fullWidth
                            onChange={this.handleChange('endDate')}
                            style={{ height }} InputLabelProps={{ shrink: true, style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                            inputProps={{ style: { height, padding: '0 10px', }, }} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClickCloseBuscar()} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={() => this.buscarPagamento()} color="primary">
                            <IconButton><SearchIcon /></IconButton>
                            Buscar
                        </Button>
                    </DialogActions>
                </Dialog>
                <br />
                <Table style={{ width: 1200 }}>
                    <TableHead>
                        <TableRow>

                            <TableCell style={{ width: '10%' }}>Id</TableCell>
                            <TableCell style={{ width: '20%' }}>Data Pagamento</TableCell>
                            <TableCell style={{ width: '25%' }}>Valor</TableCell>
                            <TableCell style={{ width: '25%' }}>Forma Pagamento</TableCell>
                            <TableCell style={{ width: '20%' }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.pagamentos.map(pagamento => (
                            <TableRow hover key={pagamento.id}>
                                <TableCell component="th" scope="row">
                                    {pagamento.id}
                                </TableCell>
                                <TableCell>{pagamento.dataPagamento}</TableCell>
                                <TableCell>{(pagamento.valor).toFixed(2)}</TableCell>
                                <TableCell>{pagamento.formaPagamento}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => this.editPagamento(pagamento.id)}><EditIcon color="primary" /></IconButton>
                                    <IconButton onClick={() => this.handleClickOpen(pagamento.id)}><DeleteIcon color="secondary" /></IconButton>
                                    <Dialog
                                        open={this.state.open}
                                        onClose={() => this.handleClose()}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Confirmação!"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Deseja realmente deletar este pagamento?
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => this.handleClose()} variant="contained" color="default">
                                                Cancelar
                                            </Button>
                                            <Button onClick={() => this.deletePagamento(this.state.pagamentoId)} variant="contained" color="secondary" autoFocus>
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

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

// eslint-disable-next-line no-unused-vars
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

export default withSnackbar(ListaPagamentosComponent);