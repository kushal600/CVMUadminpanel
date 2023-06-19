import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { browserHistory } from "react-router-dom";
import Form from "./form";

const VerifyStudent = () =>{
    const [name,setName] = useState([]);
    const [sem,setSem] = useState([]);
    const [enroll,setEnroll] = useState([]);
    const[id,setId] = useState([]);
    const [kushal, setKushal] = useState([]);
    const [flag,setFlag] = useState(false);
    
    // let kushal;
    let obj;
    let temporary=[];


    const handleGetStudent =  () =>{
        console.log("student data");
        const adminToken = localStorage.getItem("admintoken");

        axios
      .get(
        "http://elbforcvmu-2038773933.ap-south-1.elb.amazonaws.com/api/v1/admin/student",
        
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      )
      .then((res) => {
        const data = res;
        if(data.data.res == "success"){
            setFlag(true);
        }
        let arrName=[];
        let arrSem=[];
        let arrEnroll=[];
        let arrId=[]; 
        console.log(data.data.data);
        // const k = "fkjffn";
        obj = data.data.data.unregistered;
        

            setKushal(obj);
        console.log("final objetct", kushal);
        // kushal = obj;
        // const temp = JSON.stringify(obj);
        console.log("response", obj);
        
        obj.forEach((object, index)=>{
            console.log(object._id);
            arrName[index] = object.name;
            arrSem[index] = object.semester;
            arrEnroll[index] = object.enrolment;
            arrId[index] = object._id;
        })
        setEnroll(arrEnroll);
        setId(arrId);
        setName(arrName);
        setSem(arrSem);
        // console.log("enrollment: ", enroll, " name: ", name," Id: ", id," sem: ", sem);
        obj.map((ele)=>{
            console.log(ele.name);
        })
      })
      .catch((err) => {
        console.log(err);
        // issetError(true);
        // setError(err.response.data.msg);
        // throw err.response.data.msg;
      });
    };
    // useEffect(()=>{
    //     setKushal(obj);
    // },[]);
    const handleChange = (e) =>{
        const {name, checked} = e.target;
        console.log(name, checked );
        if(name === "allSelect" && checked === true){
            temporary = [];
            kushal.map((ele)=>{
                temporary.push(ele._id);
            })
        }
        else if(name === "allSelect" && checked === false){
            temporary = [];
        }
        
        
        // else{
        //     let tempUser = kushal.map(ele => ele._id === name ? {...ele , isChecked: checked}:ele);
            
   
        //     setKushal(tempUser);
        // }
        // let test = kushal;
        // console.log("testing",test);
        //kaam nu che
        kushal.map(ele => {
             if (ele._id === name && checked === true){
                // tempUser = {...ele, isChecked:checked};
                temporary.push(name);
                
            } 
            // setKushal(tempUser);
            else if (ele._id === name && checked === false){
                // tempUser = ele;
                temporary.pop(name);
            }

            
        })
        
        
        console.log("result: ",temporary);
    };
        return(
        <>
        <div>
            <button onClick={handleGetStudent}>Get Student List</button>
        </div>
        <div>
             
                <h1>Kushal</h1>
                {flag  && <div>
                        <input type="checkbox" name="allSelect" onChange={handleChange} 
                        // checked={kushal.filter((ele)=>ele?.isChecked !== true).length < 1}
                        />
                        <label>Select ALL</label>
                    </div>}
                {flag && 
                
                kushal.map(ele => (
                    <>
                    
                    <div>
                        <input type="checkbox" name={ele._id} onChange={handleChange} 
                        // checked={ele?.isChecked || false} 
                        />
                        <label>{ele.name}</label>
                    </div>
                    </>
                ))}
            
        </div>
        </>
    );
}
export default VerifyStudent;