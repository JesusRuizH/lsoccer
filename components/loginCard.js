import Link from "next/link"

export function LoginCard({log}) {
  return (
    <Link legacyBehavior href={`/login/${log.PK_login}`} key={log.PK_login}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        <h3><p id="layoutTxt">Login: </p>{log.usuario} </h3>
        <h3><p id="layoutTxt">Password: </p>{log.pw}</h3>
        <h3><p id="layoutTxt">Correo: </p>{log.correo} </h3>
        <h3><p id="layoutTxt">Estado: </p>{log.estado} </h3>
        </div>
    </a>
  </Link>
  )
}
