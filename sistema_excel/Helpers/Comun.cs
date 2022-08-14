using System;

namespace sistema_excel.Helpers
{
    public static class Comun
    {
        public static DateTime FechaSinHora(DateTime valor) => new DateTime(valor.Year, valor.Month, valor.Day, 0, 0, 0);

        public static DateTime NullToFecha(object valor) => (valor == null) ? new DateTime(1900, 01, 01, 0, 0, 0) : (DateTime)valor;

        public static int NullToINT(this object valor) => (valor == null) ? 0 : Convert.ToInt32(valor);

        public static long NulltoINT64(this object valor) => (valor == null) ? 0 : Convert.ToInt64(valor);

        public static decimal NulltoDecimal(this object valor) => (valor == null) ? 0 : Convert.ToDecimal(valor);

        public static double NulltoDouble(this object valor) => (valor == null) ? 0 : Convert.ToDouble(valor);
        public static double NulltoDoubleDate(this object valor) => (valor == null) ? 12 : Convert.ToDouble(valor);

        public static string NullToVacio(this object valor) => (valor == null) ? "" : Convert.ToString(valor);
        public static string NullToVacioInt(this object valor) => (valor == null) ? "0" : ((Convert.ToString(valor).Trim() == "") ? "0" : Convert.ToString(valor));

        public static char NullToChar(this object valor) => (valor == null) ? char.MinValue : (char)valor;

        public static int DBNullToINT(this object valor) => (valor == System.DBNull.Value) ? 0 : Convert.ToInt32(valor);

        public static string DBNullToVacio(this object valor) => (valor == System.DBNull.Value) ? "" : (string)valor;

    }
}
