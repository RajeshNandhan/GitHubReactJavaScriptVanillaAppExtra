import axios from 'axios';
import { Environments } from '../environment/environment'

export default axios.create({
    baseURL: Environments.apiAdditionalServiceEndPoint
});