using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Helpers;
using Entidades.ProcedimientosAlmacenados;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using sistema_excel.Models;

namespace sistema_excel.Controllers
{
    public class ConsultaController : Controller
    {
        private readonly IConfiguration _Configuration;

        public ConsultaController(IConfiguration configuration)
        {
            _Configuration = configuration;
        }

        [HttpGet]
        public ActionResult ImportarExcel()
        {
            try
            {
                var modelo = new ConTransactionsDModelView();

                return View("~/Views/MatrizFinanciera/Importar.cshtml", modelo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        public ActionResult ExportarExcel()
        {
            try
            {
                var modelo = new ConTransactionsDModelView();
                var strConexion = _Configuration.GetConnectionString("DefaultConnection");

                var listado = ProcedimientosAlmacenados.ConsultarYears(strConexion);

                modelo.ListaYears = listado;

                return View("~/Views/MatrizFinanciera/Exportar.cshtml", modelo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ActionResult ConsultarPeriodByYear(int year)
        {
            try
            {
                var strConexion = _Configuration.GetConnectionString("DefaultConnection");
                var listado = ProcedimientosAlmacenados.ConsultarPeriodByYear(strConexion, year);
                var json = Json(new { listado });
                return json;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ActionResult ConsultarConTransactionsD(int year, int period)
        {
            try
            {
                var strConexion = _Configuration.GetConnectionString("DefaultConnection");
                var listado = ProcedimientosAlmacenados.ConsultarConTransactionsD(strConexion, year, period);
                var json = Json(new { listado });
                return json;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
