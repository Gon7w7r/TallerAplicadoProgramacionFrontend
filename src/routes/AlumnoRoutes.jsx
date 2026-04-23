import { Routes, Route, Navigate }  from "react-router-dom";
import AlumnoRamoScreen             from "../screens/alumno/AlumnoRamoScreen";
import AlumnoSeccionScreen          from "../screens/alumno/AlumnoSeccionScreen";
import AlumnoModifyScreen           from "../screens/alumno/AlumnoModifyScreen";
import AlumnoModifyRamoScreen       from "../screens/alumno/AlumnoModifyRamoScreen";
import AlumnoModifySeccionScreen    from "../screens/alumno/AlumnoModifySeccionScreen";
import AlumnoModifiedSeccionScreen  from "../screens/alumno/AlumnoModifiedSeccionScreen";

export default function AlumnoRoutes() {
  return (
    <Routes>
      <Route path="ramos"            element={<AlumnoRamoScreen />} />
      <Route path="secciones"        element={<AlumnoSeccionScreen />} />
      <Route path="horario"          element={<AlumnoModifyScreen />} />
      <Route path="modificar-ramos"  element={<AlumnoModifyRamoScreen />} />
      <Route path="modificar-secciones" element={<AlumnoModifySeccionScreen />} />
      <Route path="modificar-confirmado" element={<AlumnoModifiedSeccionScreen />} />
      <Route path="*" element={<Navigate to="ramos" replace />} />
    </Routes>
  );
}