import org.json.JSONObject;
import Component.*;
import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SConsole;

public class Manejador {
    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        if(session != null){
            SConsole.log(session.getIdSession(), "\t|\t", obj.getString("component"), obj.getString("type"));
        }
        if (obj.isNull("component")) {
            return;
        }
        switch (obj.getString("component")) {
            case Empresa.tableName: new Empresa(obj, session); break;
            case Sucursal.tableName: new Sucursal(obj, session); break;
            case PuntoVenta.tableName: new PuntoVenta(obj, session); break;
        }
    }
}