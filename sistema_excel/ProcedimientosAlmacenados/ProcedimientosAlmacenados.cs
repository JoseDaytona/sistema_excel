using sistema_excel.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Entidades.ProcedimientosAlmacenados
{
    public static partial class ProcedimientosAlmacenados
    {
        private static IConfiguration _configuration;

        public static void InsertarConTransactionsD(string strConexion, ConTransactionsDModelView modelo)
        {
            using (var conn = new SqlConnection(strConexion))
            {
                try
                {
                    var TablaConTransactionsD = new DataTable("ud_con_transactions_d");
                    TablaConTransactionsD.Columns.Add("con_company_code", typeof(int));
                    TablaConTransactionsD.Columns.Add("con_year", typeof(int));
                    TablaConTransactionsD.Columns.Add("con_period", typeof(short));
                    TablaConTransactionsD.Columns.Add("con_posting_date", typeof(DateTime));
                    TablaConTransactionsD.Columns.Add("con_doc_number", typeof(string));
                    TablaConTransactionsD.Columns.Add("con_gl_account", typeof(string));
                    TablaConTransactionsD.Columns.Add("con_gl_description", typeof(string));
                    TablaConTransactionsD.Columns.Add("con_group_gl_account", typeof(string));
                    TablaConTransactionsD.Columns.Add("con_group_gl_description", typeof(string));
                    TablaConTransactionsD.Columns.Add("con_analytic_account", typeof(string));
                    TablaConTransactionsD.Columns.Add("con_analytic_account_description", typeof(string));
                    TablaConTransactionsD.Columns.Add("con_group_analytic_account", typeof(string));
                    TablaConTransactionsD.Columns.Add("con_group_analytic_account_description", typeof(string));
                    TablaConTransactionsD.Columns.Add("con_tranding_partner", typeof(string));
                    TablaConTransactionsD.Columns.Add("con_debit_amount", typeof(double));
                    TablaConTransactionsD.Columns.Add("con_credit_amount", typeof(double));
                    TablaConTransactionsD.Columns.Add("con_balance", typeof(double));
                    TablaConTransactionsD.Columns.Add("con_concept", typeof(string));
                    TablaConTransactionsD.Columns.Add("con_usage_level", typeof(string));

                    foreach (var item in modelo.ListaConTransactionsD)
                    {
                        var row = TablaConTransactionsD.NewRow();
                        row["con_company_code"] = item.company_code;
                        row["con_year"] = item.years;
                        row["con_period"] = item.periodo;
                        row["con_posting_date"] = item.posting_date;
                        row["con_doc_number"] = item.doc_number;
                        row["con_gl_account"] = item.gl_account;
                        row["con_gl_description"] = item.gl_description;
                        row["con_group_gl_account"] = item.group_gl_account;
                        row["con_group_gl_description"] = item.group_gl_description;
                        row["con_analytic_account"] = item.analytic_account;
                        row["con_analytic_account_description"] = item.analytic_account_description;
                        row["con_group_analytic_account"] = item.group_analytic_account;
                        row["con_group_analytic_account_description"] = item.group_analytic_account_description;
                        row["con_tranding_partner"] = item.tranding_partner;
                        row["con_debit_amount"] = item.debit_amount;
                        row["con_credit_amount"] = item.credit_amount;
                        row["con_balance"] = item.balance;
                        row["con_concept"] = item.concept;
                        row["con_usage_level"] = item.usage_level;
                        TablaConTransactionsD.Rows.Add(row);
                    }
                    var command = conn.CreateCommand();
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = "sp_insert_con_transactions_d";
                    command.Parameters.AddWithValue("@listado", TablaConTransactionsD);
                    conn.Open();
                    command.ExecuteNonQuery();
                    conn.Close();
                }
                catch (Exception ex)
                {
                    conn.Dispose();
                    throw ex;
                }
            }
        }

        public static List<int> ConsultarPeriodByYear(string strConexion, int year)
        {
            using (var conn = new SqlConnection(strConexion))
            {
                try
                {
                    var lista_period = new List<int>();
                    var command = conn.CreateCommand();
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = "sp_consulta_period_by_year";
                    command.Parameters.AddWithValue("@year", year);
                    conn.Open();
                    var reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        lista_period.Add(int.Parse(reader["periodo"].ToString()));
                    }
                    reader.Close();
                    conn.Close();
                    return lista_period;
                }
                catch (Exception ex)
                {
                    conn.Dispose();
                    throw ex;
                }
            }
        }

        public static List<int> ConsultarYears(string strConexion)
        {
            using (var conn = new SqlConnection(strConexion))
            {
                try
                {
                    var lista_year = new List<int>();
                    var command = conn.CreateCommand();
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = "sp_consulta_years";
                    conn.Open();
                    var reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        lista_year.Add(int.Parse(reader["years"].ToString()));
                    }
                    reader.Close();
                    conn.Close();
                    return lista_year;
                }
                catch (Exception ex)
                {
                    conn.Dispose();
                    throw ex;
                }
            }
        }

        public static List<ConTransactionsD> ConsultarConTransactionsD(string strConexion, int year, int period)
        {
            using (var conn = new SqlConnection(strConexion))
            {
                try
                {
                    var listaTransactionsD = new List<ConTransactionsD>();
                    var command = conn.CreateCommand();
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = "sp_consultar_con_transactions_d";
                    command.Parameters.AddWithValue("@year", year);
                    command.Parameters.AddWithValue("@period", period);
                    conn.Open();
                    var reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        listaTransactionsD.Add(
                            new ConTransactionsD { 
                                company_code = reader["company_code"].ToString(),
                                years = reader["years"].ToString(),
                                periodo = reader["periodo"].ToString(),
                                posting_date = Convert.ToDateTime(reader["posting_date"].ToString()),
                                doc_number = reader["doc_number"].ToString(),
                                gl_account = reader["gl_account"].ToString(),
                                gl_description = reader["gl_description"].ToString(),
                                group_gl_account = reader["group_gl_account"].ToString(),
                                group_gl_description = reader["group_gl_description"].ToString(),
                                analytic_account = reader["analytic_account"].ToString(),
                                analytic_account_description = reader["analytic_account_description"].ToString(),
                                group_analytic_account = reader["group_analytic_account"].ToString(),
                                group_analytic_account_description = reader["group_analytic_account_description"].ToString(),
                                tranding_partner = reader["tranding_partner"].ToString(),
                                debit_amount = Convert.ToDouble(reader["debit_amount"].ToString()),
                                credit_amount = Convert.ToDouble(reader["credit_amount"].ToString()),
                                balance = Convert.ToDouble(reader["balance"].ToString()),
                                concept = reader["concept"].ToString(),
                                usage_level = reader["usage_level"].ToString()
                            });
                    }
                    reader.Close();
                    conn.Close();
                    return listaTransactionsD;
                }
                catch (Exception ex)
                {
                    conn.Dispose();
                    throw ex;
                }
            }
        }

    }
}
