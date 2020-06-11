import React, { Component } from 'react'
import ApiService from "../../services/api-service";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withSnackbar } from 'notistack';

function estadoToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
      ? isoCode
          .toUpperCase()
          .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      : isoCode;
  }

class EditClienteComponent extends Component {

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
        this.saveCliente = this.saveCliente.bind(this);
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



    saveCliente = (e) => {
        e.preventDefault();
        const endereco = { cep: this.state.cep, rua: this.state.rua, numero: this.state.numero, complemento: this.state.complemento, 
            bairro: this.state.bairro, cidade: this.state.cidade, uf: this.state.uf,}
        const cliente = { id: this.state.id, nome: this.state.nome, sobrenome: this.state.sobrenome, cpf: this.state.cpf, rg: this.state.rg,  
            telefone: this.state.telefone, tipoPlano: this.state.tipoPlano, endereco: endereco, validadePlano: this.state.validadePlano};
        console.log(cliente);
        ApiService.editCliente(cliente)
            .then(res => {
                this.setState({ message: 'Cliente editado com sucesso.' });
                this.props.enqueueSnackbar('Cliente editado com sucesso.', {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                })
                this.props.history.push('/clientes');
            })
            .catch(
                () => this.props.enqueueSnackbar('Não foi possível adicionar o cliente.', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                }
            ));
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

        return (
            <div>
                <Typography variant="h4" style={style}>Editar Cliente</Typography>
                <form style={formContainer}>

                    <TextField label="Nome" fullWidth margin="normal" name="nome" required autoFocus="true" value={this.state.nome} 
                        style={{ height }} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }),},}}
                        inputProps={{ style: { height, padding: '0 14px',},}}
                    onChange={this.onChange} />

                    <TextField label="Sobrenome" fullWidth margin="normal" name="sobrenome" required value={this.state.sobrenome} 
                        style={{ height }} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }),},}}
                        inputProps={{ style: { height, padding: '0 14px',},}}
                    onChange={this.onChange} />

                    <TextField label="CPF" margin="normal" name="cpf" required value={this.state.cpf} 
                        style={{ height, width: '30%'}} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }),},}}
                        inputProps={{ style: { height, padding: '0 14px',}, minlength: 11, maxlength: 11}}
                    onChange={this.onChange} />

                    <TextField label="RG"  margin="normal" name="rg" required value={this.state.rg} 
                        style={{ height, marginLeft: 10, width: '30%'  }} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }),},}}
                        inputProps={{ style: { height, padding: '0 14px',},maxlength: 12}}
                    onChange={this.onChange} />

                    <TextField label="Rua" fullWidth margin="normal" name="rua" required value={this.state.rua}
                        style={{ height, width: '75%'}} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ style: { height, padding: '0 14px', },}}
                        onChange={this.onChange} />

                    <TextField label="Numero" margin="normal" name="numero" required value={this.state.numero}
                        style={{ height, marginLeft: 10, width: '24%'}} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ style: { height, padding: '0 14px', },}}
                        onChange={this.onChange} /> 
                    
                    <TextField label="Complemento" margin="normal" name="complemento" value={this.state.complemento}
                        style={{ height, width: '39%'}} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ style: { height, padding: '0 14px', },}}
                        onChange={this.onChange} />

                    <TextField type="number" label="CEP" margin="normal" name="cep" required value={this.state.cep}
                        style={{ height, marginLeft: 10, width: '19%' }} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ style: { height, padding: '0 14px', }, min:0}}
                        onChange={this.onChange} />

                    <TextField label="Bairo" margin="normal" name="bairro" required value={this.state.bairro}
                        style={{ height, marginLeft: 10, width: '40%' }} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ style: { height, padding: '0 14px', },}}
                        onChange={this.onChange} />

                    <TextField label="Cidade" margin="normal" name="cidade" required value={this.state.cidade}
                        style={{ height, width: '75%' }} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ style: { height, padding: '0 14px', },}}
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
                        inputProps={{ style: { height, padding: '0 14px', },}}
                        autoHighlight
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
                                margin="normal"
                                value={this.state.uf}
                                required
                                label="Selecione o estado"
                                InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                    style: { height, padding: '0 14px', },
                                }}
                            />
                        )}
                    />

                    <TextField type="number" label="Telefone" margin="normal" name="telefone" required value={this.state.telefone}
                        style={{ height, width: '35%' }} InputLabelProps={{ style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ style: { height, padding: '0 14px', }, min: 0 }}
                        onChange={this.onChange} />

                    <br/><br/><br/><br/><br/><br/>
                    
                </form>
                <Button variant="contained" color="primary" onClick={this.saveCliente}>Salvar</Button>
            </div>
        );
    }
}

const formContainer = {
    display: 'flex',
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


export default withSnackbar(EditClienteComponent);