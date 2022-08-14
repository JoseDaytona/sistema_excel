using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sistema_excel.Models
{
    public class ConTransactionsDModelView
    {
        public List<ConTransactionsD> ListaConTransactionsD { get; set; }
        public List<int> ListaYears { get; set; }
        public string company_code { get; set; }
        public ConTransactionsDModelView()
        {
            ListaConTransactionsD = new List<ConTransactionsD>();
            ListaYears = new List<int>();
        }
    }

    public class ConTransactionsD
    {
        public string company_code { get; set; }
        public string years { get; set; }
        public string periodo { get; set; }
        public DateTime posting_date { get; set; }
        public string doc_number { get; set; }
        public string gl_account { get; set; }
        public string gl_description { get; set; }
        public string group_gl_account { get; set; }
        public string group_d { get; set; }
        public string group_d_name { get; set; }
        public string group_gl_description { get; set; }
        public string analytic_account { get; set; }
        public string analytic_account_description { get; set; }
        public string group_analytic_account { get; set; }
        public string group_analytic_account_description { get; set; }
        public string tranding_partner { get; set; }
        public double debit_amount { get; set; }
        public double credit_amount { get; set; }
        public double balance { get; set; }
        public string concept { get; set; }
        public string usage_level { get; set; }
        public decimal D10 { get; set; }
        public decimal D20 { get; set; }
        public decimal D25 { get; set; }
        public decimal D30 { get; set; }
        public decimal D40 { get; set; }
        public decimal D50 { get; set; }
        public decimal D60 { get; set; }
        public decimal D70 { get; set; }
        public decimal D80 { get; set; }
        public decimal D90 { get; set; }
    }
}
