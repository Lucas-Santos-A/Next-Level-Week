import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
});
export default connection;

//__dirname retorna o caminho da onde este arquivo esta sendo executado.
//Migrations = Histórico do banco de dados
