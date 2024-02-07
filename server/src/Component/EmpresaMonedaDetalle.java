package Component;

import java.util.Date;
import java.util.UUID;
import org.json.JSONArray;
import org.json.JSONObject;
import Servisofts.SPGConect;
import Servisofts.SUtil;

import java.sql.SQLException;
import Server.SSSAbstract.SSSessionAbstract;

public class EmpresaMonedaDetalle {

    public final static String tableName = "empresa_moneda_detalle";

    public EmpresaMonedaDetalle(JSONObject obj, SSSessionAbstract session) {
        switch (obj.getString("type")) {
            case "getAll":
                getAll(obj, session);
            break;
            case "getByKey":
                getByKey(obj, session);
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
                consulta = "select get_moneda_detalle('"+obj.getString("key_empresa")+"') as json";
            }
            
            if(obj.has("key_empresa_moneda")){
                consulta =  "select get_all('"+tableName+"', 'key_empresa_moneda', '"+obj.getString("key_empresa_moneda")+"') as json";
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

    public JSONObject getByKey(String key) {
        try {
            String consulta =  "select get_by_key('"+tableName+"','"+key+"') as json";
            return SPGConect.ejecutarConsultaObject(consulta);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            data.put("key",UUID.randomUUID().toString());
            data.put("fecha_on",SUtil.now());
            data.put("estado",1);
            SPGConect.insertArray(tableName, new JSONArray().put(data));

            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
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