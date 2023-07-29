import { mysql as prepare } from 'yesql';
import { sql as sqlQueryFindUsersSql } from '../queries/user/find-users';
import {
  SqlQueryFindUsersInput,
  SqlQueryFindUsersOutput,
} from './types';

// typedefs common to each query function
export type DatabaseExecuteCommand = (args: { sql: string; values: any[] }) => Promise<any[]>;
export type LogMethod = (message: string, metadata: any) => void;

// utility used by each query function
export const executeQueryWithBestPractices = async ({
  dbExecute,
  logDebug,
  name,
  sql,
  input,
}: {
  dbExecute: DatabaseExecuteCommand;
  logDebug: LogMethod;
  name: string;
  sql: string;
  input: object | null;
}) => {
  // 1. define the query with yesql
  const { sql: preparedSql, values: preparedValues } = prepare(sql)(input || {});

  // 2. log that we're running the request
  logDebug(`${name}.input`, { input });

  // 3. execute the query
  const [output] = await dbExecute({ sql: preparedSql, values: preparedValues });

  // 4. log that we've executed the request
  logDebug(`${name}.output`, { output });

  // 5. return the output
  return output;
};

// client method for query 'find_users'
export const sqlQueryFindUsers = async ({
  dbExecute,
  logDebug,
  input,
}: {
  dbExecute: DatabaseExecuteCommand;
  logDebug: LogMethod;
  input: SqlQueryFindUsersInput;
}): Promise<SqlQueryFindUsersOutput[]> =>
  executeQueryWithBestPractices({
    dbExecute,
    logDebug,
    name: 'sqlQueryFindUsers',
    sql: sqlQueryFindUsersSql,
    input,
  });
