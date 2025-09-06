package Component;

import java.util.UUID;
import org.json.JSONArray;
import org.json.JSONObject;
import Servisofts.SPGConect;
import Servisofts.SUtil;

import java.sql.SQLException;
import Server.SSSAbstract.SSSessionAbstract;

public class EmpresaUsuarioLog {

    public final static String tableName = "empresa_usuario_log";

    public EmpresaUsuarioLog(JSONObject obj, SSSessionAbstract session) {
        switch (obj.getString("type")) {
            case "getAll":
                getAll(obj, session);
                break;
            case "getByKey":
                getByKey(obj, session);
                break;
            case "getByKeys":
                getByKeys(obj, session);
                break;
            case "registro":
                registro(obj, session);
                break;
            case "editar":
                editar(obj, session);
                break;
            case "ordenar_paginas":
                ordenar_paginas(obj, session);
                break;
        }
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {

            String consulta = "";
            if (obj.has("key_empresa")) {
                consulta = "select get_all('" + tableName + "', 'key_empresa', '"
                        + obj.getString("key_empresa") + "') as json";
            }
            if (obj.has("key_usuario")) {
                consulta =
                        "select empresas_get_all('" + obj.getString("key_usuario") + "') as json";
            }

            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void ordenar_paginas(JSONObject obj, SSSessionAbstract session) {
        try {

            String urls = obj.getJSONArray("data").toString();
            String consulta = "select ordenar_paginas_visitas('" + obj.getString("key_empresa")
                    + "', '" + obj.getString("key_usuario") + "', '" + urls + "') as json";

            JSONArray data = SPGConect.ejecutarConsultaArray(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =
                    "select get_by_key('" + tableName + "','" + obj.getString("key") + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getByKeys(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_all('" + tableName + "','key_empresa','"
                    + obj.getString("key_empresa") + "', 'key_usuario', '"
                    + obj.getString("key_usuario") + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static JSONObject getByKeys(String key_empresa, String key_usuario) {
        try {
            String consulta = "select get_all('" + tableName + "','key_empresa','" + key_empresa
                    + "', 'key_usuario', '" + key_usuario + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            if (JSONObject.getNames(data) != null) {
                return data.getJSONObject(JSONObject.getNames(data)[0]);
            }
            return null;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = new JSONObject();

            JSONObject empresaUsuario = EmpresaUsuario.getByKeys(obj.getString("key_empresa"),
                    obj.getString("key_usuario"));

            data.put("key", UUID.randomUUID().toString());
            data.put("fecha_on", SUtil.now());
            data.put("estado", 1);
            data.put("key_empresa_usuario", empresaUsuario.getString("key"));
            data.put("data", obj.optJSONObject("data"));

            SPGConect.insertArray(tableName, new JSONArray().put(data));
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            SPGConect.editObject(tableName, data);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }
}
