using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using sistema_excel.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using sistema_excel.Models;
using Entidades.ProcedimientosAlmacenados;
using Microsoft.Extensions.Configuration;

namespace sistema_excel.Controllers
{
    public class ProcesosController : Controller
    {
        private readonly IConfiguration _Configuration;

        public ProcesosController(IConfiguration configuration)
        {
            _Configuration = configuration;
        }

        public IActionResult Index()
        {
            var modelo = new ConTransactionsDModelView();

            return View();
        }

        [HttpPost]
        public async Task<ActionResult> ImportarExcel([FromForm(Name = "file_excel")] IFormFile _formFile)
        {
            try
            {
                var strConexion = _Configuration.GetConnectionString("DefaultConnection");
                var modelo = new ConTransactionsDModelView();
                var lista = new List<ConTransactionsD>();

                using (var stream = new MemoryStream())
                {
                    await _formFile.CopyToAsync(stream);
                    using (var package = new ExcelPackage(stream))
                    {
                        ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                        var rowCount = worksheet.Dimension.Rows;
                        for (int row = 2; row < rowCount; row++)
                        {
                            lista.Add(new ConTransactionsD
                            {
                                company_code = Comun.NullToVacio(worksheet.Cells[row, 2].Value),
                                years = Comun.NullToVacio(worksheet.Cells[row, 3].Value),
                                periodo = Comun.NullToVacio(worksheet.Cells[row, 4].Value),
                                posting_date = Comun.NullToFecha(DateTime.FromOADate(Convert.ToDouble(worksheet.Cells[row, 5].Value))),
                                doc_number = Comun.NullToVacio(worksheet.Cells[row, 6].Value),
                                gl_account = Comun.NullToVacio(worksheet.Cells[row, 7].Value),
                                gl_description = Comun.NullToVacio(worksheet.Cells[row, 8].Value),
                                group_gl_account = Comun.NullToVacio(worksheet.Cells[row, 9].Value),
                                group_gl_description = Comun.NullToVacio(worksheet.Cells[row, 10].Value),
                                analytic_account = Comun.NullToVacio(worksheet.Cells[row, 11].Value),
                                analytic_account_description = Comun.NullToVacio(worksheet.Cells[row, 12].Value),
                                group_analytic_account = Comun.NullToVacio(worksheet.Cells[row, 13].Value),
                                group_analytic_account_description = Comun.NullToVacio(worksheet.Cells[row, 14].Value),
                                tranding_partner = Comun.NullToVacio(worksheet.Cells[row, 15].Value),
                                debit_amount = Comun.NulltoDouble(worksheet.Cells[row, 16].Value),
                                credit_amount = Comun.NulltoDouble(worksheet.Cells[row, 17].Value),
                                balance = Comun.NulltoDouble(worksheet.Cells[row, 18].Value),
                                concept = Comun.NullToVacio(worksheet.Cells[row, 19].Value),
                                usage_level = Comun.NullToVacio(worksheet.Cells[row, 20].Value),
                            });
                        }
                    }
                }

                modelo.ListaConTransactionsD = lista;

                //Insertando Registros de manera masiva
                ProcedimientosAlmacenados.InsertarConTransactionsD(strConexion, modelo);

                //Retornando datos guardados
                return View("~/Views/MatrizFinanciera/Importar.cshtml", modelo);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
