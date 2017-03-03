using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevManager.SqlServer.Deployments.ExtentionMethods
{
    public static class ExtMethods
    {
        public static string ToAlterScript(this string script, string objectType)
        {
            var _script = script;
            var from = "CREATE " + objectType;
            var to = "ALTER " + objectType;
            _script = _script.Replace(from, to);
            return _script;
        }

        public static string ToCreateScript(this string script, string objectType)
        {
            var _script = script;
            var from = "ALTER " + objectType;
            var to = "CREATE " + objectType;
            _script = _script.Replace(from, to);
            return _script;
        }
    }
}
