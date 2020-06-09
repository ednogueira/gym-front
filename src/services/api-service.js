import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/';

/* let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
}; */

class ApiService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getRecepcionistaBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getGerenteBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  fetchClientes() {
    return axios.get(API_URL + 'clientes/modificados', {headers : authHeader() });
  }

  fetchClienteById(clienteId) {
    return axios.get(API_URL + 'clientes/' + clienteId, {headers : authHeader() });
  }

  fetchClienteByCpf(cpf) {
    return axios.get(API_URL + 'clientes/?cpf=' + cpf, {headers : authHeader() });
  }

  deleteCliente(clienteId){
    return axios.delete(API_URL + 'clientes/' + clienteId, {headers : authHeader() });
  }

  addCliente(cliente){
    return axios.post(""+API_URL + 'clientes/criar/' + cliente, {headers : {'content-type': 'application/x-www-form-urlencoded'} })
  }

  editCliente(cliente){
    return axios.put(API_URL + 'clientes/' + cliente, {headers : authHeader() });
  }


}

export default new ApiService();
