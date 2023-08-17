import React,{useState,useEffect} from "react"
import {Button} from "react-bootstrap";
import GetDataQuery from "@/pages/api/fetchQuery";
import {auth} from "@/pages/api/fireBase";
import NavBar from "./Component/nav"
import DataTable from "react-data-table-component"
import style from "../styles/allOrder&&Products.module.css"
import {useRouter} from "next/router";
import {onAuthStateChanged} from "firebase/auth";

const AllOrder =()=>{
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        var user = localStorage.getItem('admin')

    }
    //--------------------------------------------------------------------------- (To ensure that the user has access to the page).
    const router = useRouter()
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                return true
            }else {
                console.log('no user')
                return router.push('/404')
            }
        } )
    },[])
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    //---------------------------------------------------------------------------------(to get data Order use query firebase ).
    const [dataOrderSend,setdataOrderSend]= useState([])
    useEffect(()=>{
        GetDataQuery(`${user}/Input and output data/Output`,setdataOrderSend,100)
    },[])
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    //---------------------------------------------------------------------------------------(to send data to DataTable function).
    const columnRemoved = [
        {
            name:'Items',
            selector : row => {
                const itemArray = [...row.items]
                return  itemArray.map((e)=>{
                    return(
                        <p className={row.delet?'opacity-50':false}>-{e}</p>
                    )
                })
            },
            style : {
                backgroundColor : '#00bcd4',
                color : "black",
            }
        },
        {
            name:'Quantity',
            selector : row => {
                const qtnArray = [...row.qtn]
                return  qtnArray.map((e)=>{
                    return(
                        <p className={row.delet?'opacity-50':false}>{e}</p>
                    )
                })
            },
            style : {
                backgroundColor : '#9E9E9E',
                color : "#fff",
                display:'flex',
                justifyContent: 'center'


            }
        },
        {
            name:'Sender',
            selector : row => row.sender,
            style : {
                backgroundColor : 'darkkhaki',
                color : "black",
                display:'flex',
                justifyContent: 'center'
            }
        },
        {
            name:'client',
            selector : row => row.client,
            style : {
                backgroundColor : '#8bc34a',
                color : "black",
                display:'flex',
                justifyContent: 'center'
            }
        },
        {
            name:'date',
            selector : row => row.date,
            style : {
                backgroundColor : '#607d8b',
                color : "#fff",
                display:'flex',
                justifyContent: 'center'
            }
        },
        {
            name:'Order Number',
            sortable:true,
            selector : row => row.id,
            style : {
                backgroundColor : '#212529',
                color : "#fff",
                display:'flex',
                justifyContent: 'center'
            }
        },

    ]
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //-------------------------------------------------------------------------------------------------------(to Style DataTable).
    const customeStyles = {
        headRow : {
            style : {
                backgroundColor : '#212529',
                color : "#fff",
                display:'flex',
                justifyContent: 'center'
            }
        },
        row:{
            style : {
                backgroundColor : 'black',
                color : "#fff"
            }
        },
        cells : {
            style : {
                backgroundColor : '#fff',
                color : "black",
                fontSize:'15px',
                fontWeight:'600',
                padding:'10px'

            }
        },
        pagination:{
            style : {
                backgroundColor : 'gray',
                color : "black",
                fontSize:'15px',
            }
        },
    }
    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //-----------------------------------------------------------------------------(to handle search input with client name items).
    const[inputSearch,setInputSearch] = useState('')
   const hundleSearch =()=> {
        const newData = dataOrderSend.filter(e => e.client.toLowerCase().includes(inputSearch.toLowerCase()))
       setdataOrderSend(newData)
   }

    //--------------------------------------------------------------------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return(
        <div className={style.contAllOrder}>

                <NavBar/>
            <div className='w-100'>
                <form className={style.formSearch}>
                    <div>
                        <input type='text' onChange={e=>setInputSearch(e.target.value)} placeholder='Search ...'/>
                        <Button variant="dark" onClick={hundleSearch}>Search</Button>
                    </div>
                </form>
              <DataTable
              columns={columnRemoved}
              data={dataOrderSend}
              pagination
              customStyles={customeStyles}
              >
              </DataTable>
            </div>

        </div>
    )
}
export default AllOrder