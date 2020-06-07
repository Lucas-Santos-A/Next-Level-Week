import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';
import {errors} from 'celebrate';

const app = express();

app.use(cors())
app.use(express.json());

app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));  

app.use(errors());

app.listen(3333);

//Rota: Endereço completo da requisição
//Recurso: Qual entidade estamos acessando do sistema

//Request Param: Parâmetros que vem na própria rota que identificam um recurso (Parâmetro obrigatório) 
//Query param: Parâmetros opcionais e não precisa ser unico (users?search=uc&search=au), filtragem e paginação
//Request Body: Parâmetros para criação/atualização de informações

