import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
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

class ListaFeriasComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ferias: [],
            message: null,
            open: false,
            feriasId: null,
            openBuscar: false,
            findFerias: '',
            startDate: '',
            endDate: '',
        }
        this.deleteFerias = this.deleteFerias.bind(this);
        this.addFerias = this.addFerias.bind(this);
        this.reloadFeriasList = this.reloadFeriasList.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpenBuscar = this.handleClickOpenBuscar.bind(this);
        this.handleClickCloseBuscar = this.handleClickCloseBuscar.bind(this);
        this.buscarFerias = this.buscarFerias.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.formatDate = this.formatDate.bind(this);
    }

    componentDidMount() {
        this.reloadFeriasList();
    }


    handleStartDateChange = (date) => {
        this.setState({ startDate: date });
    };

    handleEndDateChange = (date) => {
        this.setState({ endDate: date });
    };

    handleClickOpen(feriasId) {
        this.setState({
            open: true,
            feriasId: feriasId
        })
    }

    handleClose() {
        this.setState({
            open: false,
            feriasId: null
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

    reloadFeriasList() {
        ApiService.fetchFerias(window.localStorage.getItem("clienteId"))
            .then((res) => {
                this.setState({ ferias: res.data })
            });
    }

    buscarFerias() {
        console.log(this.state.startDate);
        console.log(this.state.endDate);

        ApiService.fetchFeriasByDate(this.state.endDate, this.state.startDate, window.localStorage.getItem("clienteId"))
            .then((res) => {
                this.setState({ ferias: res.data })
            })
            .catch(() => {
                this.props.enqueueSnackbar('Não foi possível encontrar férias no período informado.', {
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



    deleteFerias(feriasId) {
        ApiService.deleteFerias(feriasId)
            .then(response => {
                this.setState({
                    ferias: this.state.ferias.filter(ferias => ferias.id !== feriasId),
                    open: false,
                    feriasId: null
                });
                this.props.enqueueSnackbar('Férias deletada com sucesso.', {
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                })
            })
            .catch(() => this.props.enqueueSnackbar('Não foi possível deletar férias.', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            }),
                this.handleClose());
    }

    addFerias() {
        window.localStorage.removeItem("feriasId");
        this.props.history.push('/add-ferias');
    }

    formatDate(date) {
        var p = date.split(/\D/g)
        return [p[2],p[1],p[0] ].join("/")
    }


    render() {
        const { startDate, endDate } = this.state;

        return (
            <div>
                <div style={{ margin: "auto", width: "60%", padding: "10px" }}>
                    <DadosTabs tabs-initialSelectedIndex={"2"} />
                </div>
                <br />
                <Button variant="contained" color="primary" onClick={() => this.addFerias()}>
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
                            Busque por férias dentro de um período:
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
                        <Button onClick={() => this.buscarFerias()} color="primary">
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
                            <TableCell style={{ width: '20%' }}>Data de Início</TableCell>
                            <TableCell style={{ width: '25%' }}>Data de Término</TableCell>
                            <TableCell style={{ width: '20%' }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.ferias.map(ferias => (
                            <TableRow hover key={ferias.id}>
                                <TableCell component="th" scope="row">
                                    {ferias.id}
                                </TableCell>
                                <TableCell>{this.formatDate(ferias.dataInicio)}</TableCell>
                                <TableCell>{this.formatDate(ferias.dataTermino)}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => this.handleClickOpen(ferias.id)}><DeleteIcon color="secondary" /></IconButton>
                                    <Dialog
                                        open={this.state.open}
                                        onClose={() => this.handleClose()}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Confirmação!"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Deseja realmente deletar estas férias?
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => this.handleClose()} variant="contained" color="default">
                                                Cancelar
                                            </Button>
                                            <Button onClick={() => this.deleteFerias(this.state.feriasId)} variant="contained" color="secondary" autoFocus>
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

export default withSnackbar(ListaFeriasComponent);