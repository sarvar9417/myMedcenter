import React from 'react';
import { Link } from 'react-router-dom';
import Select from "react-select";


export const AddDoctor = () => {
    return (
        <>
            <div className="container">
                <div className="col-lg-6 offset-lg-3 linkk" style={{marginTop:"150px"}}>     
                    <h4 style={{textAlign:"center",padding:"15px 0"}}>Doctorning ma'lumotlarini kiritish</h4>
                    <div className="row">
                        <div className="col-md-6 input_box" data-aos="fade-right">
                            <input
                                name="lastname"
                                type="text"
                                className="form-control inp"
                                placeholder=""
                            />
                            <label className="labels">Familiya</label>
                        </div>
                        <div className="col-md-6 input_box" data-aos="fade-right">
                            <input
                                name="lastname"
                                type="text"
                                className="form-control inp"
                                placeholder=""
                            />
                            <label className="labels">Ism</label>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6 input_box" data-aos="fade-right">
                            <input
                                name="lastname"
                                type="text"
                                className="form-control inp"
                                placeholder=""
                            />
                            <label className="labels">Otasining ismi</label>
                        </div>
                        <div className="col-md-6 input_box" data-aos="fade-right">
                            <input
                                name="lastname"
                                type="date"
                                className="form-control inp"
                                placeholder=""
                            />
                            <label className="labels">Tug'ilgan kuni</label>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6 input_box" data-aos="fade-right">
                        <div className="wrapper">
                <input
                  className="input"
                  id="erkak"
                  name="gender"
                  type="radio"
                  defaultValue="man"
                />
                <label
                  className={"label"}
                  htmlFor="erkak"
                >
                  Erkak
                </label>
                <input
                  className="input"
                  type="radio"
                  id="ayol"
                  name="gender"
                  defaultValue="woman"
                />
                <label
                  className={
                     "label clabel"
                  }
                  htmlFor="ayol"
                >
                  Ayol
                </label>
              </div>
                        </div>
                        <div className="col-md-6 input_box" data-aos="fade-right">
                            <input
                                name="lastname"
                                type="number"
                                className="form-control inp"
                                placeholder=""
                            />
                            <label className="labels">Telefon nomer</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Select 
                                className="mt-3"
                                closeMenuOnSelect={false}
                                isMulti
                                options={[
                                { value: "Lor", label: "Lor" },
                                { value: "Kardiolog", label: "Kardilog" },
                                { value: "Terapevt", label: "Terapevt" },
                                ]}
                            />
                        </div>
                    </div>
                    <div className="mt-5 text-center" data-aos="fade-up">
                        <button  className="btn btn-primary profile-button">
                        Saqlash
                        </button>
                    </div>
                </div>
            </div>
            <hr />
            <div className="container" style={{padding:"20px 0"}}>
                <div className="row" style={{justifyContent:"center"}}>
                    <div class="col-md-3" style={{padding:"15px",margin:"15px",boxShadow:"2px 2px 13px rgb(0 0 0 / 10%)"}}>
                        <div class="doc-img" style={{position: "relative",overflow: "hidden", zIndex:"1"}}>
                            <Link>
                                <img alt="Card Image" style={{borderRadius:"5px",width:"100%"}} src="https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg" class="card-img-top" />
                            </Link>
                        </div>
                        <div className="doc-body pt-3" >
                            <h3 style={{fontSize:"20px",fontWeight:"500"}}>Nosirov Islombek</h3>
                            <p  style={{color:"#757575",fontSize:"14px",fontWeight:"500"}}>Uzbekiston Navoiy MedCenter Kardiolog </p>
                            <p  style={{color:"#757575",fontSize:"14px",fontWeight:"500"}}> Navoiy, Uzbekiston </p>
                            <p  style={{color:"#757575",fontSize:"14px",fontWeight:"500"}}> 17 avgust 2003 </p>
                            <p  style={{color:"#757575",fontSize:"14px",fontWeight:"500"}}> $100 - $400 </p>
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                        <button  className="btn profile-button" style={{padding:"5px 15px",border:"2px solid #0d6efd",color:"#0d6efd"}}>
                            View Profile
                            </button>
                            <button  className="btn btn-primary profile-button" style={{padding:"5px 15px"}}>
                            Edit
                            </button>
                        </div>
                    </div>
                    <div class="col-md-3" style={{padding:"15px",margin:"15px",boxShadow:"2px 2px 13px rgb(0 0 0 / 10%)"}}>
                        <div class="doc-img" style={{position: "relative",overflow: "hidden", zIndex:"1"}}>
                            <Link>
                                <img alt="Card Image" style={{borderRadius:"5px",width:"100%"}} src="https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg" class="card-img-top" />
                            </Link>
                        </div>
                        <div className="doc-body pt-3" >
                            <h3 style={{fontSize:"20px",fontWeight:"500"}}>Nosirov Islombek</h3>
                            <p  style={{color:"#757575",fontSize:"14px",fontWeight:"500"}}>Uzbekiston Navoiy MedCenter Kardiolog </p>
                            <p  style={{color:"#757575",fontSize:"14px",fontWeight:"500"}}> Navoiy, Uzbekiston </p>
                            <p  style={{color:"#757575",fontSize:"14px",fontWeight:"500"}}> 17 avgust 2003 </p>
                            <p  style={{color:"#757575",fontSize:"14px",fontWeight:"500"}}> $100 - $400 </p>
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                        <button  className="btn profile-button" style={{padding:"5px 15px",border:"2px solid #0d6efd",color:"#0d6efd"}}>
                            View Profile
                            </button>
                            <button  className="btn btn-primary profile-button" style={{padding:"5px 15px"}}>
                            Edit
                            </button>
                        </div>
                    </div>
                    <div class="col-md-3" style={{padding:"15px",margin:"15px",boxShadow:"2px 2px 13px rgb(0 0 0 / 10%)"}}>
                        <div class="doc-img" style={{position: "relative",overflow: "hidden", zIndex:"1"}}>
                            <Link>
                                <img alt="Card Image" style={{borderRadius:"5px",width:"100%"}} src="https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg" class="card-img-top" />
                            </Link>
                        </div>
                        <div className="doc-body pt-3" >
                            <h3 style={{fontSize:"20px",fontWeight:"500"}}>Nosirov Islombek</h3>
                            <p  style={{color:"#757575",fontSize:"14px",fontWeight:"500"}}>Uzbekiston Navoiy MedCenter Kardiolog </p>
                            <p  style={{color:"#757575",fontSize:"14px",fontWeight:"500"}}> Navoiy, Uzbekiston </p>
                            <p  style={{color:"#757575",fontSize:"14px",fontWeight:"500"}}> 17 avgust 2003 </p>
                            <p  style={{color:"#757575",fontSize:"14px",fontWeight:"500"}}> $100 - $400 </p>
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                        <button  className="btn profile-button" style={{padding:"5px 15px",border:"2px solid #0d6efd",color:"#0d6efd"}}>
                            View Profile
                            </button>
                            <button  className="btn btn-primary profile-button" style={{padding:"5px 15px"}}>
                            Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}
