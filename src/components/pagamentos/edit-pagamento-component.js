import React, { Component } from 'react'
import ApiService from "../../services/api-service";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withSnackbar } from 'notistack';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel'; 

class EditPagamentoComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            dataPagamento: '',
            formaPagamento: '',
            valor: '',
            tipoPlano: ''
            
        }
        this.savePagamento = this.savePagamento.bind(this);
        this.loadPagamento = this.loadPagamento.bind(this);
        this.getPlano = this.getPlano.bind(this);
    }

    componentDidMount() {
        this.loadPagamento();
        this.getPlano();
    }

    loadPagamento() {
        
        ApiService.fetchPagamentoById(window.localStorage.getItem("pagamentoId"))
            .then((response) => {
                let pagamento = response.data;
                this.setState({
                id: pagamento.id,
                dataPagamento: pagamento.dataPagamento,
                formaPagamento: pagamento.formaPagamento,
                valor: pagamento.valor,
                tipoPlano: pagamento.tipoPlano,
                })
            })
    }

    getPlano() {
        ApiService.fetchClienteById(window.localStorage.getItem("clienteId"))
            .then((res) => {
                let cliente = res.data;
                this.setState({
                tipoPlano: cliente.tipoPlano,
                })
            });
    }



    savePagamento = (e) => {
        e.preventDefault();
        const idCliente = window.localStorage.getItem("clienteId");
        const idPagamento = window.localStorage.getItem("pagamentoId");
        const plano = this.state.tipoPlano;
        const pagamento = { id: this.state.id, dataPagamento: this.state.dataPagamento, formaPagamento: this.state.formaPagamento, valor: this.state.valor};
        ApiService.editPagamento(idPagamento, idCliente, plano, pagamento)
            .then(res => {
                this.setState({ message: 'Pagamento atualizado com sucesso.' });
                this.props.enqueueSnackbar('Pagamento atualizado com sucesso.', {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                })
                this.props.history.push('/pagamentos');
            })
            .catch(
                () => this.props.enqueueSnackbar('Não foi possível atualizado o pagamento.', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                }
            ));
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        let today = new Date().toISOString().slice(0,10);

        return (

            <form style={formContainer}>
                <Typography variant="h4" style={style}>Editar pagamento</Typography>
                <br></br><br></br><br></br>
                <div style={{ display: "flex" }}>
                    <InputLabel id="formaPagamento-label" margin="normal" >
                        Forma de Pagamento:
                </InputLabel>
                    <Select
                        labelId="formaPagamento"
                        name="formaPagamento"
                        margin="normal"
                        style={{ marginLeft: 10, width: "8%", justifyContent: 'center' }}
                        value={this.state.formaPagamento}
                        onChange={this.handleChange}
                    >
                        <MenuItem value={"CREDITO"}>Crédito</MenuItem>
                        <MenuItem value={"DEBITO"}>Débito</MenuItem>
                        <MenuItem value={"DINHEIRO"}>Dinheiro</MenuItem>
                    </Select>
                </div>
                <div style={{ display: "flex" }}>
                    <TextField label="Valor" margin="normal" name="valor" required value={this.state.valor}
                        style={{ height, width: "20%" }} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ style: { height, padding: '0 14px', }, }}
                        onChange={this.onChange}
                    />

                    <TextField type="date" margin="normal" name="dataPagamento" label="Data do Pagamento" value={this.state.dataPagamento} fullWidth
                        onChange={this.onChange}
                        style={{ height, marginLeft: 30, width: "20%" }} InputLabelProps={{ shrink: true, style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ style: { height, padding: '0 10px', }, min: today }} />
                </div>
                <br /><br />
                <Button variant="contained" color="primary" onClick={this.savePagamento}>Salvar</Button>
            </form>
        );
    }
}

const formContainer = {
    display: 'inline',
    flexFlow: 'wrap'
};

const style = {
    display: 'flex',
    justifyContent: 'center'

}

// height of the TextField
const height = 44

// magic number which must be set appropriately for height
const labelOffset = -6

// get this from your form library, for instance in
// react-final-form it's fieldProps.meta.active
// or provide it yourself - see notes below
const focused = 1


export default withSnackbar(EditPagamentoComponent);