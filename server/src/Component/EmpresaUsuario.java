package Component;

import java.util.Date;
import java.util.UUID;
import org.json.JSONArray;
import org.json.JSONObject;
import Servisofts.SPGConect;
import Servisofts.SUtil;

import java.text.DateFormat;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import Server.SSSAbstract.SSSessionAbstract;

public class EmpresaUsuario {

    public final static String tableName = "empresa_usuario";

    public EmpresaUsuario(JSONObject obj, SSSessionAbstract session) {
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
        }
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {

            String consulta =  "";
            if(obj.has("key_empresa")){
                consulta = "select get_all('"+tableName+"', 'key_empresa', '"+obj.getString("key_empresa")+"') as json";
            }
            if(obj.has("key_usuario")){
                consulta = "select empresas_get_all('"+obj.getString("key_usuario")+"') as json";
            }
            
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getByKey(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =  "select get_by_key('"+tableName+"','"+obj.getString("key")+"') as json";
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
            String consulta =  "select get_all('"+tableName+"','key_empresa','"+obj.getString("key_empresa")+"', 'key_usuario', '"+obj.getString("key_usuario")+"') as json";
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
            String consulta =  "select get_all('"+tableName+"','key_empresa','"+key_empresa+"', 'key_usuario', '"+key_usuario+"') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            data = data.getJSONObject(JSONObject.getNames(data)[0]);
            return data;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");

            JSONObject empresaUsuario = EmpresaUsuario.getByKeys(data.getString("key_empresa"), data.getString("key_usuario"));

            if(empresaUsuario!=null){
                throw new Exception("Ya existe en la empresa");
            }

            data.put("key",UUID.randomUUID().toString());
            data.put("fecha_on",SUtil.now());
            data.put("estado",1);
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