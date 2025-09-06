import org.json.JSONObject;

public class ManejadorCliente {
    public static void onMessage(JSONObject obj, JSONObject config) {
        if (obj.isNull("component")) {
            obj.put("error", "No existe el componente");
            return;
        }
        if(obj.has("estado")){
            if(obj.getString("estado").equals("error")){
                //System.out.println(data.getString("error"));
            }
        }

        switch(obj.getString("component")){
            case "usuario":
                new Usuario(obj);
                break;

        }

    }

}
