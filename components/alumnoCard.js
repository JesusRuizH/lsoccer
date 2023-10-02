import Link from "next/link"

export function AlumnoCard({alu}) {
  return (
    <Link legacyBehavior href={`/alumno/${alu.FK_usuario}`} alu={alu.FK_usuario}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        <h3><p id="layoutTxt">Registro: </p>{alu.FK_usuario}</h3>
        <h3><p id="layoutTxt">Categoria del alumno: </p>{alu.FK_categoria}</h3>
        <h3><p id="layoutTxt">Posicion del jugador: </p>{alu.posicion_jugador}</h3>
        <h3><p id="layoutTxt">Pago mensual: </p>{alu.pago_mensual}</h3>
        <h3><p id="layoutTxt">Pago de la liga: </p>{alu.pago_liga}</h3>
        <h3><p id="layoutTxt">Jersey del alumno: </p>{alu.jersey}</h3>
        <h3><p id="layoutTxt">Folio de pago del alumno: </p>{alu.KEY_cuenta_pago}</h3>

        </div>
    </a>
  </Link>
  )
}
