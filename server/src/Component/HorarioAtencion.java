package Component;

import java.util.Date;
import java.util.UUID;
import org.json.JSONArray;
import org.json.JSONObject;
import Servisofts.SPGConect;
import java.text.DateFormat;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import Servisofts.Server.SSSAbstract.SSSessionAbstract;

public class HorarioAtencion {

    public final static String tableName = "horario_atencion";

    public HorarioAtencion(JSONObject obj, SSSessionAbstract session) {
        switch (obj.getString("type")) {
            case "getAll":
                getAll(obj, session);
                break;
            case "_get_turno_horarios_atencion":
                _get_turno_horarios_atencion(obj, session);
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


            case "_registroTurnosHorariosAtencion":
                _registroTurnosHorariosAtencion(obj, session);
                break;

            case "_editarTurnosHorariosAtencion":
                _editarTurnosHorariosAtencion(obj, session);
                break;
            case "_getByKeyTurnosHorariosAtencion":
                _getByKeyTurnosHorariosAtencion(obj, session);
                break;
        }
    }



    public void _get_turno_horarios_atencion(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select _get_turno_horarios_atencion( '"
                    + obj.getString("key_empresa") + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_all('" + tableName + "') as json";
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

    public void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());
            JSONObject data = obj.getJSONObject("data");
            data.put("key", UUID.randomUUID().toString());
            data.put("fecha_on", fecha_on);
            data.put("estado", 1);
            SPGConect.insertArray(tableName, new JSONArray().put(data));
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (SQLException e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void _registroTurnosHorariosAtencion(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            String key = data.getString("key");
            String key_usuario = data.getString("key_usuario");
            String key_empresa = data.getString("key_empresa");
            String nombre = data.getString("nombre");
            Integer atiende_feriado = data.getInt("atiende_feriado");
            JSONArray horarios = data.getJSONArray("horarios");
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());
            JSONObject datasss = new JSONObject();
            datasss.put("key", key);
            datasss.put("key_usuario", key_usuario);
            datasss.put("fecha_on", fecha_on);
            datasss.put("estado", 1);
            datasss.put("nombre", nombre); // si tu columna es nombre_turno
            datasss.put("atiende_feriado", atiende_feriado);
            datasss.put("key_empresa", key_empresa);
            SPGConect.insertArray("turno", new JSONArray().put(datasss));


            for (int i = 0; i < horarios.length(); i++) {
                JSONObject h = horarios.getJSONObject(i);
                JSONObject datahorario = new JSONObject();
                datahorario.put("key", h.getString("key"));
                datahorario.put("key_usuario", key_usuario);
                datahorario.put("fecha_on", fecha_on);
                datahorario.put("estado", 1);
                datahorario.put("dia", h.getInt("dia")); // <- usar
                datahorario.put("hora_inicio", h.getString("hora_inicio"));
                datahorario.put("hora_fin", h.getString("hora_fin"));
                datahorario.put("key_turno", key);
                SPGConect.insertArray("horario_atencion", new JSONArray().put(datahorario));
            }

            obj.put("data", data);
            obj.put("estado", "exito");

        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public void _getByKeyTurnosHorariosAtencion(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta =
                    "select _get_turno_bykey( '" + obj.getString("key_turno") + "') as json";
            System.out.println("miradad " + consulta);
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
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

    public void _editarTurnosHorariosAtencion(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            String key = data.getString("key");
            String key_usuario = data.getString("key_usuario");
            String key_empresa = data.getString("key_empresa");
            String nombre = data.getString("nombre");
            int atiende_feriado = data.getInt("atiende_feriado");
            int estado = data.getInt("estado");
            JSONArray horarios = data.optJSONArray("horarios");
            if (horarios == null)
                horarios = new JSONArray();

            String fecha_on =
                    new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS").format(new Date());

            // 1. Actualizar turno
            JSONObject dataTurno = new JSONObject();
            dataTurno.put("key", key);
            dataTurno.put("key_usuario", key_usuario);
            dataTurno.put("fecha_on", fecha_on);
            dataTurno.put("estado", estado);
            dataTurno.put("nombre", nombre);
            dataTurno.put("atiende_feriado", atiende_feriado);
            dataTurno.put("key_empresa", key_empresa);
            SPGConect.editObject("turno", dataTurno);

            // 2. Procesar horarios (todos tienen key)
            for (int i = 0; i < horarios.length(); i++) {
                JSONObject h = horarios.getJSONObject(i);

                JSONObject horario = new JSONObject();
                horario.put("key", h.getString("key")); // Siempre tiene key
                horario.put("key_usuario", key_usuario);
                horario.put("fecha_on", fecha_on);
                horario.put("estado", h.getInt("estado"));
                horario.put("dia", h.getInt("dia"));
                horario.put("hora_inicio", h.getString("hora_inicio"));
                horario.put("hora_fin", h.getString("hora_fin"));
                horario.put("key_turno", key);

                try {
                    SPGConect.insertArray("horario_atencion", new JSONArray().put(horario));
                } catch (Exception ex) {
                    // Si no existe, lo insertamos
                    SPGConect.editObject("horario_atencion", horario);
                }
            }

            obj.put("data", dataTurno);
            obj.put("estado", "exito");

        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.toString());
            e.printStackTrace();
        }
    }
}
