import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PaymentIcon from '@material-ui/icons/Payment';
import FlightIcon from '@material-ui/icons/Flight';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import {withRouter} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
});

//export default function DadosTabs() {
const DadosTabs = props => {  
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState(0);
  const { history} = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const viewCliente = (id) => {
    setActiveTab(0);
    window.localStorage.setItem("clienteId", id);
    history.push('/view-cliente');
  }

  const viewPagamentos = (id) => {
    setActiveTab(1);
    window.localStorage.setItem("clienteId", id);
    history.push('/pagamentos');
  }


  return (
    <Paper square className={classes.root}>
      <Tabs initialSelectedIndex={0}
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<PersonPinIcon />} label="Dados" onClick={() => viewCliente(window.localStorage.getItem("clienteId"))} />
        <Tab icon={<PaymentIcon />} label="pagamentos" onClick={() => viewPagamentos(window.localStorage.getItem("clienteId"))}/>
        <Tab icon={<FlightIcon />} label="férias" />
      </Tabs>
    </Paper>
  );
}
export default withRouter(DadosTabs);