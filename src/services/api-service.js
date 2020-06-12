import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/';

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

  /* SERVIÇOS DISPONÍVEIS PARA CONSULTA E GESTÃO DO MODELO: CLIENTE */

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
    return axios.post(API_URL + 'clientes/criar/', cliente, {headers : authHeader()})
  }

  editCliente(cliente){
    return axios.put(API_URL + 'clientes/', cliente, {headers : authHeader() });
  }

  /* SERVIÇOS DISPONÍVEIS PARA CONSULTA E GESTÃO DO MODELO: PAGAMENTO */

  fetchPagamentos(clienteId) {
    return axios.get(API_URL + 'pagamentos/' +clienteId, {headers : authHeader() });
  }

  fetchPagamentoById(pagamentoId) {
    return axios.get(API_URL + 'pagamentos?idPagamento=' + pagamentoId, {headers : authHeader() });
  }

  fetchPagamentoByDate(dataFinal, dataInicial, clienteId) {
    return axios.get(API_URL + 'pagamentos/buscar?dataFinal=' + dataFinal + '&dataInicial=' + dataInicial + '&idCliente=' + clienteId, {headers : authHeader() });
  }

  deletePagamento(pagamentoId){
    return axios.delete(API_URL + 'pagamentos/delete/' + pagamentoId, {headers : authHeader() });
  }

  addPagamento(clienteId, plano, pagamento){
    return axios.post(API_URL + 'pagamentos?idCliente=' + clienteId + '&plano=' + plano, pagamento, {headers : authHeader()})
  }

  editPagamento(idPagamento, idCliente, plano, pagamento){
    return axios.put(API_URL + 'pagamentos/' + idPagamento + '?idCliente=' + idCliente + '&plano=' + plano, pagamento, {headers : authHeader() });
  }

    /* SERVIÇOS DISPONÍVEIS PARA CONSULTA E GESTÃO DO MODELO: FÉRIAS */
    fetchFerias(clienteId) {
      return axios.get(API_URL + 'ferias/' +clienteId, {headers : authHeader() });
    }
  
    fetchFeriasById(feriasId) {
      return axios.get(API_URL + 'ferias?idFerias=' + feriasId, {headers : authHeader() });
    }
  
    fetchFeriasByDate(dataFinal, dataInicial, clienteId) {
      return axios.get(API_URL + 'ferias/buscar/?dataFinal=' + dataFinal + '&dataInicial=' + dataInicial + '&idCliente=' + clienteId, {headers : authHeader() });
    }
  
    deleteFerias(feriasId){
      return axios.delete(API_URL + 'ferias/delete/' + feriasId, {headers : authHeader() });
    }
  
    addFerias(clienteId, ferias){
      return axios.post(API_URL + 'ferias?idCliente=' + clienteId, ferias, {headers : authHeader()})
    }
  
}

export default new ApiService();
