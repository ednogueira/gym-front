import React, { Component } from 'react'
import ApiService from "../../services/api-service";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withSnackbar } from 'notistack';

class AddFeriasComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataInicio: '',
            dataTermino: '',
        }
        this.saveFerias = this.saveFerias.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }



    saveFerias = (e) => {
        e.preventDefault();
        const idCliente = window.localStorage.getItem("clienteId");
        const ferias = { dataInicio: this.state.dataInicio, dataTermino: this.state.dataTermino};
        if (this.state.dataTermino <= this.state.dataInicio){
            return this.props.enqueueSnackbar('Não foi possível agendar férias. Data de término maior que inicial.', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            });
        }

        ApiService.addFerias(idCliente, ferias)
            .then(res => {
                this.setState({ message: 'Férias agendadas com sucesso.' });
                this.props.enqueueSnackbar('Férias agendadas com sucesso.', {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                })
                this.props.history.push('/ferias');
            })
            .catch((error) => {
                this.props.enqueueSnackbar(error.response.data, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                }
                )
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        var today = new Date().toISOString().slice(0,10);
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow = tomorrow.toISOString().slice(0,10);
        return (

            <form style={formContainer}>
                <Typography variant="h4" style={style}>Agendar Férias</Typography>
                <br></br><br></br><br></br><br></br>

                <div style={{ display: "flex" }}>
                    <TextField type="date" margin="normal" name="dataInicio" label="Data de Início" value={this.state.dataInicio} fullWidth
                        onChange={this.onChange}
                        style={{ height, marginLeft: "25%", width: "20%" }} InputLabelProps={{ shrink: true, style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ style: { height, padding: '0 10px', }, min: today }} />   

                    <TextField type="date" margin="normal" name="dataTermino" label="Data de Término" value={this.state.dataTermino} fullWidth
                        onChange={this.onChange}
                        style={{ height, marginLeft: 30, marginRight: 40, width: "20%" }} InputLabelProps={{ shrink: true, style: { height, ...(!focused && { top: `${labelOffset}px` }), }, }}
                        inputProps={{ style: { height, padding: '0 10px', }, min: tomorrow }} />
                    <div>
                    <br /><br />
                    <Button variant="contained" color="primary" onClick={this.saveFerias}>Salvar</Button>
                    </div>
                </div>
                
                
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


export default withSnackbar(AddFeriasComponent);