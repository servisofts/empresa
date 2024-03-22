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
            case EmpresaMoneda.tableName: new EmpresaMoneda(obj, session); break;
            case EmpresaMonedaDetalle.tableName: new EmpresaMonedaDetalle(obj, session); break;
            case EmpresaUsuario.tableName: new EmpresaUsuario(obj, session); break;
            case TipoPago.tableName: new TipoPago(obj, session); break;
            case PuntoVentaTipoPago.tableName: new PuntoVentaTipoPago(obj, session); break;
        }
    }
}