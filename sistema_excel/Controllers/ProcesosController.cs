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
using Nancy.Json;

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
                                company_code = Comun.NullToVacioInt(worksheet.Cells[row, 2].Value),
                                years = Comun.NullToVacioInt(worksheet.Cells[row, 3].Value),
                                periodo = Comun.NullToVacioInt(worksheet.Cells[row, 4].Value),
                                posting_date = Comun.NullToFecha(DateTime.FromOADate(Comun.NulltoDoubleDate(worksheet.Cells[row, 5].Value))),
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

        [HttpPost]
        public IActionResult ExportExcel(string ListaConTransactionsD)
        {
            var lista = new JavaScriptSerializer().Deserialize<List<ConTransactionsD>>(ListaConTransactionsD); //replace this with your deserialization code
            FileStream inputStream = new FileStream("Reportes/FORMATO P&.xlsx", FileMode.Open, FileAccess.Read);
            ExcelPackage Ep = new ExcelPackage(inputStream);
            ExcelWorksheet Sheet = Ep.Workbook.Worksheets[0];
            //Sheet.Cells["A1"].Value = "Name";
            //Sheet.Cells["B1"].Value = "Department";
            //Sheet.Cells["C1"].Value = "Address";
            //Sheet.Cells["D1"].Value = "City";
            //Sheet.Cells["E1"].Value = "Country";
            var rowCount = Sheet.Dimension.Rows;
            for (int row = 6; row <= 309; row++)
            {
                var group_d = int.Parse(Comun.NullToVacioInt(Sheet.Cells[string.Format("A{0}", row)].Value).Trim());

                if (group_d > 0)
                {
                    var fila = lista.Find(x => int.Parse(x.group_d.Trim()) == group_d);
                    if (fila != null)
                    {
                        Sheet.Cells[string.Format("C{0}", row)].Value = fila.D10;
                        Sheet.Cells[string.Format("D{0}", row)].Value = fila.D20;
                        Sheet.Cells[string.Format("E{0}", row)].Value = fila.D25;
                        Sheet.Cells[string.Format("F{0}", row)].Value = fila.D30;
                        Sheet.Cells[string.Format("G{0}", row)].Value = fila.D40;
                        Sheet.Cells[string.Format("H{0}", row)].Value = fila.D50;
                        Sheet.Cells[string.Format("I{0}", row)].Value = fila.D60;
                        Sheet.Cells[string.Format("J{0}", row)].Value = fila.D70;
                        Sheet.Cells[string.Format("K{0}", row)].Value = fila.D80;
                        Sheet.Cells[string.Format("L{0}", row)].Value = fila.D90;
                    }
                }
            }

            MemoryStream stream = new MemoryStream();
            Ep.SaveAs(stream);
            stream.Position = 0;
            FileStreamResult fileStreamResult = new FileStreamResult(stream, "application/excel");
            fileStreamResult.FileDownloadName = "FORMATO P&.xlsx";
            return fileStreamResult;
        }
    }
}
