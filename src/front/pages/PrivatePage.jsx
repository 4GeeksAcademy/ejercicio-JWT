import { UserInfo } from "../hooks/PrivateRoute.jsx/UserInfo"

const PrivatePage =()=> {
    UserInfo()

    return (<>
    <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>Esta es una ruta privada.</strong>  FUNCIONANDO <code>.ZONA VIP</code>, RUTA PRIVADA
      </div>
    </div>
  </div>
  </div>
    </>)
}


export default PrivatePage