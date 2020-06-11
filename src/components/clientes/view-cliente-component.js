import React, { Component } from 'react'
import ApiService from "../../services/api-service";
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withSnackbar } from 'notistack';
import EditIcon from '@material-ui/icons/Edit';
import DadosTabs from "../dados-tab-component";
import Alert from '@material-ui/lab/Alert';

function estadoToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
      ? isoCode
          .toUpperCase()
          .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      : isoCode;
  }

class ViewClienteComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
        //this.saveCliente = this.saveCliente.bind(this);
        this.editCliente = this.editCliente.bind(this);
        this.loadCliente = this.loadCliente.bind(this);
    }

    componentDidMount() {
        this.loadCliente();
    }

    loadCliente() {
        ApiService.fetchClienteById(window.localStorage.getItem("clienteId"))
            .then((response) => {
                let cliente = response.data;
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
            })
    }

    editCliente(id) {
        window.localStorage.setItem("clienteId", id);
        this.props.history.push('/edit-cliente');
    }


    getSelectedItem(){
        // eslint-disable-next-line array-callback-return
        const item = estados.find((opt) => {
          if (opt.value === this.state.uf)
            return opt;
        })
        return item || {};
      }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    handleChange = (event) => {
        this.setState({
            uf: event.target.value
        });
    };

    render() {

        const planoAtual = this.state.tipoPlano;

        return (
            <div>
                <div style={{ margin: "auto", width: "60%", padding: "10px"}}>
                    <DadosTabs tabs-initialSelectedIndex={"0"} />
                </div>

                {/* <Typography variant="h4" style={style}>Dados do Cliente</Typography> */}
                
                <form style={formContainer}>
                    <br></br>
                    <TextField label="Matricula" margin="normal" name="id" value={this.state.id} 
                        style={{ height }} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }),},}}
                        inputProps={{ readOnly: true, style: { height, padding: '0 14px',},}}
                    onChange={this.onChange} />
                    <div style={{ margin: "auto", width: "60%", padding: "10px" }}><Alert variant="filled" margin="normal" style={{width: "40%"}} severity="info">Plano contrado: {planoAtual}</Alert></div>    
                    <div style={{  position: "absolute", right: 400}}>
                        <Fab color="primary" aria-label="add" onClick={() => this.editCliente(this.state.id)}>
                            <EditIcon />
                        </Fab>
                    </div>
                    <TextField label="Nome" fullWidth margin="normal" name="nome" value={this.state.nome} 
                        style={{ height }} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }),},}}
                        inputProps={{ readOnly: true, style: { height, padding: '0 14px',},}}
                    onChange={this.onChange} />

                    <TextField label="Sobrenome" fullWidth margin="normal" name="sobrenome" value={this.state.sobrenome} 
                        style={{ height }} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }),},}}
                        inputProps={{ readOnly: true, style: { height, padding: '0 14px',},}}
                    onChange={this.onChange} />

                    <TextField label="CPF" margin="normal" name="cpf" value={this.state.cpf} 
                        style={{ height, width: '30%'}} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }),},}}
                        inputProps={{ readOnly: true, style: { height, padding: '0 14px',}, minlength: 11, maxlength: 11}}
                    onChange={this.onChange} />

                    <TextField label="RG"  margin="normal" name="rg" value={this.state.rg} 
                        style={{ height, marginLeft: 10, width: '30%'  }} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }),},}}
                        inputProps={{ readOnly: true, style: { height, padding: '0 14px',},maxlength: 12}}
                    onChange={this.onChange} />

                    <TextField label="Rua" fullWidth margin="normal" name="rua" value={this.state.rua}
                        style={{ height, width: '75%'}} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ readOnly: true, style: { height, padding: '0 14px', },}}
                        onChange={this.onChange} />

                    <TextField label="Numero" margin="normal" name="numero" value={this.state.numero}
                        style={{ height, marginLeft: 10, width: '24%'}} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ readOnly: true, style: { height, padding: '0 14px', },}}
                        onChange={this.onChange} /> 
                    
                    <TextField label="Complemento" margin="normal" name="complemento" value={this.state.complemento}
                        style={{ height, width: '39%'}} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ readOnly: true, style: { height, padding: '0 14px', },}}
                        onChange={this.onChange} />

                    <TextField type="number" label="CEP" margin="normal" name="cep" value={this.state.cep}
                        style={{ height, marginLeft: 10, width: '19%' }} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ readOnly: true, style: { height, padding: '0 14px', }, min:0}}
                        onChange={this.onChange} />

                    <TextField label="Bairo" margin="normal" name="bairro" value={this.state.bairro}
                        style={{ height, marginLeft: 10, width: '40%' }} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ readOnly: true, style: { height, padding: '0 14px', },}}
                        onChange={this.onChange} />

                    <TextField label="Cidade" margin="normal" name="cidade" value={this.state.cidade}
                        style={{ height, width: '75%' }} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ readOnly: true, style: { height, padding: '0 14px', },}}
                        onChange={this.onChange} />

                    <Autocomplete
                        id="uf"
                        style={{ height, width: '24%', marginLeft: 10 }}
                        onChange={(event, value) => value ? (this.setState({ uf: value.value})) : (this.setState({ uf: null})) }
                        value={this.getSelectedItem()}
                        options={estados}
                        classes={{
                            option: classes.option,
                          }}
                        InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ readOnly: true, style: { height, padding: '0 14px', },}}
                        autoHighlight
                        disabled
                        disableClearable
                        margin="normal"
                        getOptionLabel={(option) => option.label}
                        renderOption={(option) => (
                            <React.Fragment>
                                <span>{estadoToFlag(option.value)}</span>
                                &emsp;{option.label}
                            </React.Fragment>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                id="uf"
                                name="uf"
                                style={{height}}
                                disabled
                                disableClearable
                                margin="normal"
                                value={this.state.uf}
                                label="Selecione o estado"
                                InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                    readOnly: true, style: { height, padding: '0 14px', },
                                }}
                            />
                        )}
                    />

                    <TextField type="number" label="Telefone" margin="normal" name="telefone" value={this.state.telefone}
                        style={{ height, width: '35%' }} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ readOnly: true, style: { height, padding: '0 14px', }, min: 0 }}
                        onChange={this.onChange} />

                    <br/><br/><br/><br/><br/><br/>
                    
                </form>

            </div>
        );
    }
}

const formContainer = {
    display: 'flex',
    flexFlow: 'wrap'
};

// eslint-disable-next-line no-unused-vars
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

const classes = {
    option: {
        fontSize: 15,
        '& > span': {
          marginRight: 10,
          fontSize: 18,
        }
    }
}

const estados = [
    {value: 'AC', label: 'Acre',},
    {value: 'AL', label: 'Alagoas',},
    {value: 'AP', label: 'Amapá',},
    {value: 'AM', label: 'Amazonas',},
    {value: 'BA', label: 'Bahia',},
    {value: 'CE', label: 'Ceará',},
    {value: 'DF', label: 'Distrito Federal',},
    {value: 'ES', label: 'Espírito Santo',},
    {value: 'GO', label: 'Goiás',},
    {value: 'MA', label: 'Maranhão',},
    {value: 'MT', label: 'Mato Grosso',},
    {value: 'MS', label: 'Mato Grosso do Sul',},
    {value: 'MG', label: 'Minas Gerais',},
    {value: 'PA', label: 'Pará',},
    {value: 'PB', label: 'Paraíba',},
    {value: 'PR', label: 'Paraná',},
    {value: 'PE', label: 'Pernambuco',},
    {value: 'PI', label: 'Piauí',},
    {value: 'RJ', label: 'Rio de Janeiro',},
    {value: 'RN', label: 'Rio Grande do Norte',},
    {value: 'RS', label: 'Rio Grande do Sul',},
    {value: 'RO', label: 'Rondônia',},
    {value: 'RR', label: 'Roraima',},
    {value: 'SC', label: 'Santa Catarina',},
    {value: 'SP', label: 'São Paulo',},
    {value: 'SE', label: 'Sergipe',},
    {value: 'TO', label: 'Tocantins',},    
  ];


export default withSnackbar(ViewClienteComponent);