package Component;

import java.util.Date;
import java.util.UUID;
import org.json.JSONArray;
import org.json.JSONObject;
import Servisofts.SPGConect;
import java.text.DateFormat;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import Server.SSSAbstract.SSSessionAbstract;

public class Vivienda {

    public final static String tableName = "vivienda";

    public Vivienda(JSONObject obj, SSSessionAbstract session) {
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
            String consulta =  "select get_all('"+tableName+"', 'key_condominio', '"+obj.getString("key_condominio")+"') as json";
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

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());
            JSONObject data = obj.getJSONObject("data");
            data.put("key",UUID.randomUUID().toString());
            data.put("fecha_on",fecha_on);
            data.put("estado",1);
            SPGConect.insertArray(tableName, new JSONArray().put(data));
            SPGConect.historico(obj.getString("key_usuario"), tableName+"_registro", data);
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
            SPGConect.historico(obj.getString("key_usuario"), tableName+"_editar", data);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            obj.put("error", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }
}